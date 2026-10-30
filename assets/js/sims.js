/* ===========================================
   Sims — กิจกรรมและตัวจำลองในสไลด์ วิชาเทคนิคการอินเตอร์เฟซ (คลิกได้ ไม่ทำให้สไลด์เลื่อน)
   - <div data-timer="300"></div>                       ตัวจับเวลานับถอยหลัง (วินาที)
   - <div class="vote" data-answer="1"> <button class="opt">…</button> … <button class="reveal">เฉลย</button> <div class="why">…</div></div>
   - <div data-picker="40"></div>                       สุ่มเลขที่นักเรียน
   - <div data-video="YouTubeID" data-title="…" data-credit="…" data-len="1:25"></div>
   - <div data-sim="loop"></div>       event loop: กดปุ่มในหน้าต่างจำลอง → event เข้าคิว → ฟังก์ชันทำงาน · ปุ่ม "ลืม exec()"
   - <div data-sim="layout"></div>     กระบะวาง widget: เพิ่ม/ลบ · สลับแนวตั้ง/แนวนอน · ย่อขยาย · โชว์โค้ด PySide6
   - <div data-sim="anatomy"></div>    แผนภาพ QMainWindow: แตะส่วนต่าง ๆ ดูชื่อและคำสั่ง
   - <div data-sim="tb" data-tb="bug3"></div>   อ่าน Traceback: แตะบรรทัดที่บอกสาเหตุ แล้วแตะบรรทัดที่บอกตำแหน่ง
   - <div data-sim="ohm"></div>        โปรแกรมกฎของโอห์มจำลอง รุ่น v1 (ยังไม่ดักข้อผิดพลาด) / v2 (แก้แล้ว) + ตารางทดสอบ
   =========================================== */
(function (g) {
    'use strict';
    const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

    /* คลิกหรือกดแป้นในกิจกรรมต้องไม่ทำให้สไลด์เลื่อน */
    function guard(el) {
        el.addEventListener('keydown', e => e.stopPropagation());
        el.addEventListener('click', e => { if (e.target.closest('button, input, select, label, [data-tap]')) e.stopPropagation(); });
    }
    const blur = b => b && b.blur && b.blur();

    /* ---------- ตัวจับเวลา ---------- */
    function timer(el) {
        const total = +el.dataset.timer || 300;
        let left = total, t = null;
        el.classList.add('timer');
        el.innerHTML = `<div class="tm-face" aria-live="polite"></div>
            <div class="tm-btns"><button type="button" data-a="go">▶ เริ่ม</button><button type="button" data-a="m">−1 นาที</button><button type="button" data-a="p">+1 นาที</button><button type="button" data-a="r">↺</button></div>`;
        const face = el.querySelector('.tm-face'), go = el.querySelector('[data-a=go]');
        const draw = () => {
            face.textContent = `${Math.floor(left / 60)}:${String(left % 60).padStart(2, '0')}`;
            el.classList.toggle('low', left > 0 && left <= 30);
            el.classList.toggle('done', left === 0);
        };
        const halt = () => { clearInterval(t); t = null; go.textContent = '▶ เริ่ม'; };
        el.addEventListener('click', e => {
            const b = e.target.closest('button'); if (!b) return;
            const a = b.dataset.a;
            if (a === 'go') {
                if (t) halt();
                else {
                    if (!left) left = total;
                    go.textContent = '⏸ หยุด';
                    t = setInterval(() => { left = Math.max(0, left - 1); draw(); if (!left) halt(); }, 1000);
                }
            } else if (a === 'm') left = Math.max(0, left - 60);
            else if (a === 'p') left += 60;
            else if (a === 'r') { halt(); left = total; }
            draw(); blur(b);
        });
        draw();
    }

    /* ---------- โหวต ก ข ค ง ---------- */
    function vote(el) {
        el.addEventListener('click', e => {
            const o = e.target.closest('.opt'), r = e.target.closest('.reveal');
            if (o) { el.querySelectorAll('.opt').forEach(x => x.classList.toggle('picked', x === o)); blur(o); }
            if (r) {
                el.classList.toggle('revealed');
                const ans = +el.dataset.answer;
                el.querySelectorAll('.opt').forEach((x, i) => x.classList.toggle('right', i === ans));
                r.textContent = el.classList.contains('revealed') ? 'ซ่อนเฉลย' : 'เฉลย';
                blur(r);
            }
        });
    }

    /* ---------- สุ่มเลขที่ ---------- */
    function picker(el) {
        el.classList.add('picker');
        el.innerHTML = `<label>เลขที่ 1 ถึง <input type="number" min="2" max="60" value="${+el.dataset.picker || 40}"></label>
            <button type="button">🎲 สุ่มเลขที่</button><div class="pk-num">?</div>`;
        const out = el.querySelector('.pk-num');
        el.querySelector('button').addEventListener('click', e => {
            const max = Math.max(2, +el.querySelector('input').value || 40);
            let n = 0;
            const t = setInterval(() => {
                out.textContent = 1 + Math.floor(Math.random() * max);
                if (++n > 14) { clearInterval(t); out.classList.remove('spin'); }
            }, 70);
            out.classList.add('spin'); blur(e.currentTarget);
        });
    }

    /* ---------- หน้าต่างจำลองแบบ Windows (ใช้ร่วมกันหลายตัวจำลอง) ---------- */
    const winHTML = (title, body, cls) => `<div class="qw ${cls || ''}"><div class="qw-bar"><span class="qw-t">${esc(title)}</span>
        <span class="qw-btns"><i>—</i><i>☐</i><i>✕</i></span></div><div class="qw-body">${body}</div></div>`;

    /* ===================== event loop ===================== */
    function loop(el) {
        el.classList.add('sx', 'lp');
        el.innerHTML = `<div class="lp-row">
            <div class="lp-col">${winHTML('โปรแกรมของเรา', `<div class="lp-lbl">กดไปแล้ว <b class="lp-n">0</b> ครั้ง</div>
                <button type="button" class="qw-btn" data-a="click">กดฉัน</button>`)}
                <div class="lp-gone">💨 หน้าต่างเด้งขึ้นแล้วหายไปทันที!</div></div>
            <div class="lp-col lp-q"><div class="lp-h">📥 คิวเหตุการณ์ (event)</div><div class="lp-queue"></div></div>
            <div class="lp-col lp-w"><div class="lp-h">🧑‍💼 event loop</div><div class="lp-man">😴</div>
                <div class="lp-say">รอผู้ใช้อยู่…</div><div class="lp-fn"></div></div>
        </div>
        <div class="sx-ctl"><button type="button" data-a="key">⌨️ ส่ง event กดแป้น</button><button type="button" data-a="move">🖱️ ส่ง event ขยับเมาส์</button>
            <button type="button" data-a="noexec">🙈 ลืม app.exec()</button><button type="button" data-a="reset">↺ เริ่มใหม่</button></div>
        <p class="sx-cap">event loop เหมือน<b>พนักงานเฝ้าหน้าร้าน</b> ยืนรอลูกค้าตลอดเวลา มีใครมา (event) ก็หยิบมาจัดการทีละคน</p>`;
        const q = el.querySelector('.lp-queue'), man = el.querySelector('.lp-man'), say = el.querySelector('.lp-say'),
            fn = el.querySelector('.lp-fn'), n = el.querySelector('.lp-n'), qw = el.querySelector('.qw');
        let count = 0, busy = false, dead = false;
        const queue = [];
        function pump() {
            if (busy || dead) return;
            const ev = queue.shift();
            if (!ev) { man.textContent = '😴'; say.textContent = 'รอผู้ใช้อยู่…'; return; }
            busy = true;
            const chip = q.firstElementChild;
            if (chip) chip.classList.add('out');
            man.textContent = '🏃'; say.textContent = `ได้รับ ${ev.name}`;
            setTimeout(() => {
                if (chip) chip.remove();
                fn.innerHTML = `<code>${esc(ev.fn)}</code>`;
                fn.classList.add('on');
                if (ev.kind === 'click') { count++; n.textContent = count; }
                setTimeout(() => { fn.classList.remove('on'); busy = false; pump(); }, 700);
            }, 650);
        }
        function push(kind) {
            if (dead) return;
            const ev = kind === 'click' ? { kind, name: 'clicked (กดปุ่ม)', fn: 'นับเพิ่ม()' }
                : kind === 'key' ? { kind, name: 'keyPress (กดแป้น)', fn: 'keyPressEvent()' }
                    : { kind, name: 'mouseMove (ขยับเมาส์)', fn: 'mouseMoveEvent()' };
            queue.push(ev);
            const c = document.createElement('div');
            c.className = 'lp-chip k-' + kind; c.textContent = ev.name;
            q.appendChild(c);
            pump();
        }
        el.addEventListener('click', e => {
            const b = e.target.closest('button'); if (!b) return;
            const a = b.dataset.a;
            if (a === 'click' || a === 'key' || a === 'move') push(a);
            else if (a === 'noexec') {
                dead = true; queue.length = 0; q.innerHTML = '';
                qw.classList.add('flash'); man.textContent = '🚪'; say.textContent = 'ไม่มีพนักงาน โปรแกรมจบทันที';
                setTimeout(() => { qw.classList.add('gone'); el.querySelector('.lp-gone').classList.add('on'); }, 450);
            } else if (a === 'reset') {
                dead = false; busy = false; count = 0; n.textContent = '0'; queue.length = 0; q.innerHTML = '';
                qw.classList.remove('flash', 'gone'); el.querySelector('.lp-gone').classList.remove('on');
                man.textContent = '😴'; say.textContent = 'รอผู้ใช้อยู่…'; fn.textContent = '';
            }
            blur(b);
        });
    }

    /* ===================== กระบะวาง widget ===================== */
    function layout(el) {
        el.classList.add('sx', 'ly');
        const W = {
            label: { name: 'QLabel', make: i => `<span class="w-label">ข้อความ ${i}</span>`, code: (v, i) => `${v} = QLabel("ข้อความ ${i}")` },
            edit: { name: 'QLineEdit', make: () => `<span class="w-edit">พิมพ์ตรงนี้…</span>`, code: v => `${v} = QLineEdit()` },
            button: { name: 'QPushButton', make: i => `<span class="w-btn">ปุ่ม ${i}</span>`, code: (v, i) => `${v} = QPushButton("ปุ่ม ${i}")` }
        };
        let items = ['label', 'edit', 'button'], dir = 'V', width = 520;
        el.innerHTML = `<div class="ly-row">
            <div class="ly-left">${winHTML('กระบะวาง widget', '<div class="ly-box"></div>')}
                <label class="ly-w">↔ ความกว้างหน้าต่าง <input type="range" min="300" max="760" value="520"></label></div>
            <pre class="ly-code"></pre></div>
            <div class="sx-ctl"><button type="button" data-a="label">➕ QLabel</button><button type="button" data-a="edit">➕ QLineEdit</button>
            <button type="button" data-a="button">➕ QPushButton</button><button type="button" data-a="pop">➖ ลบตัวล่าสุด</button>
            <button type="button" data-a="V" class="on">⬇ QVBoxLayout</button><button type="button" data-a="H">➡ QHBoxLayout</button></div>`;
        const box = el.querySelector('.ly-box'), code = el.querySelector('.ly-code'), qw = el.querySelector('.qw');
        function draw() {
            qw.style.width = width + 'px';
            box.className = 'ly-box ' + dir;
            const cnt = { label: 0, edit: 0, button: 0 };
            const vars = [];
            box.innerHTML = items.map(k => { cnt[k]++; return W[k].make(cnt[k]); }).join('') || '<span class="ly-empty">(ยังไม่มี widget)</span>';
            const c2 = { label: 0, edit: 0, button: 0 };
            const lines = items.map(k => { c2[k]++; const v = { label: 'label', edit: 'edit', button: 'btn' }[k] + c2[k]; vars.push(v); return W[k].code(v, c2[k]); });
            const L = dir === 'V' ? 'QVBoxLayout' : 'QHBoxLayout';
            code.innerHTML = [...lines.map(esc), '', `layout = <b>${L}</b>()`, ...vars.map(v => `layout.addWidget(${v})`), 'window.setLayout(layout)']
                .map(l => l ? `<span>${l}</span>` : '<span> </span>').join('\n');
            el.querySelectorAll('[data-a=V],[data-a=H]').forEach(b => b.classList.toggle('on', b.dataset.a === dir));
        }
        el.addEventListener('click', e => {
            const b = e.target.closest('button'); if (!b) return;
            const a = b.dataset.a;
            if (W[a] && items.length < 7) items.push(a);
            else if (a === 'pop') items.pop();
            else if (a === 'V' || a === 'H') dir = a;
            draw(); blur(b);
        });
        el.querySelector('input').addEventListener('input', e => { width = +e.target.value; draw(); });
        draw();
    }

    /* ===================== แผนภาพ QMainWindow ===================== */
    function anatomy(el) {
        el.classList.add('sx', 'an');
        const P = {
            bar: ['แถบชื่อหน้าต่าง', 'Windows วาดให้ เราแค่ตั้งชื่อ', 'self.setWindowTitle("…")'],
            menu: ['แถบเมนู (menu bar)', 'เมนู ไฟล์ แก้ไข ช่วยเหลือ', 'self.menuBar()'],
            tool: ['แถบเครื่องมือ (toolbar)', 'ปุ่มลัดที่ใช้บ่อย', 'self.addToolBar("…")'],
            central: ['พื้นที่กลาง (central widget)', 'ใส่ widget หลักของเราตรงนี้ 1 ตัว (มักเป็น QWidget ที่มี layout)', 'self.setCentralWidget(central)'],
            status: ['แถบสถานะ (status bar)', 'บอกสถานะสั้น ๆ ด้านล่าง เช่น "พร้อมใช้งาน"', 'self.statusBar().showMessage("…")']
        };
        el.innerHTML = `<div class="an-row"><div class="an-win">
            <div class="an-part an-bar" data-tap="bar"><span>โปรแกรมทักทาย</span><span>— ☐ ✕</span></div>
            <div class="an-part an-menu" data-tap="menu">ไฟล์ &nbsp; แก้ไข &nbsp; ช่วยเหลือ</div>
            <div class="an-part an-tool" data-tap="tool">💾 📂 ✂️ 📋</div>
            <div class="an-part an-central" data-tap="central"><div>พิมพ์ชื่อของคุณ:</div><div class="w-edit">สมชาย</div><div class="w-btn">ทักทาย</div><div class="an-hello">สวัสดี สมชาย 👋</div></div>
            <div class="an-part an-status" data-tap="status">ทักทายเรียบร้อย</div></div>
            <div class="an-info"><div class="an-h">👆 แตะแต่ละส่วนของหน้าต่าง</div><div class="an-d"></div><code class="an-c"></code></div></div>`;
        const h = el.querySelector('.an-h'), d = el.querySelector('.an-d'), c = el.querySelector('.an-c');
        el.addEventListener('click', e => {
            const p = e.target.closest('[data-tap]'); if (!p) return;
            el.querySelectorAll('.an-part').forEach(x => x.classList.toggle('on', x === p));
            const [a, b, k] = P[p.dataset.tap];
            h.textContent = a; d.textContent = b; c.textContent = k;
        });
    }

    /* ===================== อ่าน Traceback ===================== */
    const TB = {
        bug1: { cmd: 'python lab1_window.py', lines: ['Traceback (most recent call last):',
            '  File "C:\\Users\\student\\gui-lab\\lab1_window.py", line 2, in <module>',
            '    from PySide6.QtWidgets import QApplication, QWidget, QLabel, QVBoxLayout',
            "ModuleNotFoundError: No module named 'PySide6'"], why: 3, where: 1,
            fix: 'หา PySide6 ไม่เจอ เพราะ<b>ไม่ได้เปิด venv</b> หรือเลือก Python ผิดตัว → เลือก interpreter ที่เป็น <code>.venv</code> แล้วรันใหม่' },
        bug2: { cmd: 'python bug2_pyqt5.py', lines: ['Traceback (most recent call last):',
            '  File "C:\\Users\\student\\gui-lab\\bug2_pyqt5.py", line 3, in <module>',
            '    from PyQt5.QtWidgets import QApplication, QWidget',
            "ModuleNotFoundError: No module named 'PyQt5'"], why: 3, where: 1,
            fix: 'AI เขียน <b>PyQt5</b> มาแทน <b>PySide6</b> (คนละไลบรารี) → แก้บรรทัด 3 เป็น <code>from PySide6.QtWidgets import …</code>' },
        bug3: { cmd: 'python bug3_typo.py', lines: ['Traceback (most recent call last):',
            '  File "C:\\Users\\student\\gui-lab\\bug3_typo.py", line 7, in <module>',
            '    window.setWindowTittle("บั๊กที่ 3")',
            '    ^^^^^^^^^^^^^^^^^^^^^^',
            "AttributeError: 'PySide6.QtWidgets.QWidget' object has no attribute 'setWindowTittle'. Did you mean '.setWindowTitle' instead of '.setWindowTittle'?"], why: 4, where: 1,
            fix: 'สะกดผิด <b>Tittle</b> (t เกิน 1 ตัว) Python ใจดีบอกให้ด้วยว่า <i>Did you mean \'.setWindowTitle\'</i>' },
        bug4: { cmd: 'python bug4_number.py   (แล้วกดปุ่มตอนช่องว่าง)', lines: ['Traceback (most recent call last):',
            '  File "C:\\Users\\student\\gui-lab\\bug4_number.py", line 22, in double',
            '    x = float(self.number_input.text())',
            "ValueError: could not convert string to float: ''"], why: 3, where: 1,
            fix: 'แปลงข้อความว่าง <code>\'\'</code> เป็นตัวเลขไม่ได้ → ต้อง<b>ดักกรณีช่องว่าง/ตัวอักษร</b>ก่อนแปลง (ใช้ <code>try … except ValueError</code>)' }
    };
    function tb(el) {
        const T = TB[el.dataset.tb] || TB.bug3;
        el.classList.add('sx', 'tb');
        el.innerHTML = `<div class="tb-term"><div class="tb-cmd">PS C:\\Users\\student\\gui-lab&gt; ${esc(T.cmd)}</div>
            ${T.lines.map((l, i) => `<div class="tb-l${i === T.why ? ' err' : ''}" data-tap="${i}">${esc(l) || ' '}</div>`).join('')}</div>
            <div class="tb-ask"></div><div class="sx-ctl"><button type="button" data-a="ans">💡 เฉลย</button><button type="button" data-a="reset">↺ เริ่มใหม่</button></div>`;
        const ask = el.querySelector('.tb-ask');
        let step = 0;
        const Q = ['① แตะบรรทัดที่บอกว่า <b>“พังเพราะอะไร”</b>', '② แตะบรรทัดที่บอกว่า <b>“พังที่ไฟล์ไหน บรรทัดที่เท่าไร”</b>'];
        const done = () => { ask.innerHTML = `✅ ${T.fix}`; ask.className = 'tb-ask ok'; step = 2; };
        const show = () => { ask.innerHTML = Q[step]; ask.className = 'tb-ask'; };
        el.addEventListener('click', e => {
            const b = e.target.closest('button');
            if (b) {
                if (b.dataset.a === 'ans') { el.querySelectorAll('.tb-l').forEach((x, i) => x.classList.toggle('hit', i === T.why || i === T.where)); done(); }
                else { step = 0; el.querySelectorAll('.tb-l').forEach(x => x.classList.remove('hit', 'miss')); show(); }
                blur(b); return;
            }
            const l = e.target.closest('.tb-l'); if (!l || step > 1) return;
            const i = +l.dataset.tap, want = step === 0 ? T.why : T.where;
            if (i === want) {
                l.classList.add('hit'); l.classList.remove('miss');
                if (step === 0) { step = 1; show(); ask.insertAdjacentHTML('afterbegin', '👍 ถูก! บรรทัดสุดท้ายบอกสาเหตุเสมอ<br>'); }
                else done();
            } else { l.classList.add('miss'); setTimeout(() => l.classList.remove('miss'), 600); }
        });
        show();
    }

    /* ===================== โปรแกรมกฎของโอห์มจำลอง ===================== */
    function ohm(el) {
        el.classList.add('sx', 'oh');
        el.innerHTML = `<div class="oh-row"><div class="oh-left">${winHTML('เครื่องคิดเลขกฎของโอห์ม', `
            <div class="oh-f"><span>แรงดัน V (โวลต์):</span><input type="text" class="oh-v" value="12" inputmode="decimal"></div>
            <div class="oh-f"><span>ความต้านทาน R (โอห์ม):</span><input type="text" class="oh-r" value="1000" inputmode="decimal"></div>
            <button type="button" class="qw-btn" data-a="calc">คำนวณกระแส</button>
            <div class="oh-out">I = ? mA</div><div class="oh-status">ใส่ค่า V และ R แล้วกดคำนวณ</div>`)}
            <div class="sx-ctl"><button type="button" data-a="v1" class="on">🤖 โค้ด AI รุ่น v1</button><button type="button" data-a="v2">🛠️ รุ่น v2 (แก้แล้ว)</button></div></div>
            <div class="oh-right"><div class="oh-term"></div><p class="oh-note">💡 โปรแกรมจริงจะ<b>ไม่ปิด</b> แต่ไม่คำนวณ ค่าเก่าค้างอยู่ และตัวแดงขึ้นใน Terminal (Python รุ่นเก่าเขียนว่า <i>float division by zero</i>)</p>
            <table class="oh-tab"><thead><tr><th>V</th><th>R</th><th>ผลที่ได้</th><th></th></tr></thead><tbody></tbody></table></div></div>`;
        const vIn = el.querySelector('.oh-v'), rIn = el.querySelector('.oh-r'), out = el.querySelector('.oh-out'),
            st = el.querySelector('.oh-status'), term = el.querySelector('.oh-term'), tbody = el.querySelector('tbody'), qw = el.querySelector('.qw');
        let ver = 'v1';
        const fmt = x => (Math.round(x * 100) / 100).toFixed(2);
        const isNum = s => /^\s*[+-]?(\d+\.?\d*|\.\d+)([eE][+-]?\d+)?\s*$/.test(s);
        function row(v, r, res, ok) {
            const tr = document.createElement('tr');
            tr.innerHTML = `<td>${esc(v) || '(ว่าง)'}</td><td>${esc(r) || '(ว่าง)'}</td><td>${esc(res)}</td><td>${ok ? '✅' : '💥'}</td>`;
            tbody.prepend(tr);
            while (tbody.children.length > 5) tbody.lastChild.remove();
        }
        function crash(lines) {
            term.innerHTML = lines.map((l, i) => `<div class="${i === lines.length - 1 ? 'tr-err' : ''}">${esc(l)}</div>`).join('');
            term.classList.add('on'); qw.classList.add('shake'); setTimeout(() => qw.classList.remove('shake'), 500);
        }
        function calc() {
            const v = vIn.value, r = rIn.value;
            term.classList.remove('on');
            if (ver === 'v1') {
                if (!isNum(v) || !isNum(r)) {
                    const bad = !isNum(v) ? v : r;
                    crash(['Traceback (most recent call last):', '  File "ohm_calc.py", line 32, in calculate', '    v = float(self.v_input.text())',
                        `ValueError: could not convert string to float: '${bad}'`]);
                    row(v, r, 'พัง! (ValueError)', false); return;
                }
                if (+r === 0) {
                    crash(['Traceback (most recent call last):', '  File "ohm_calc.py", line 34, in calculate', '    i_ma = v / r * 1000',
                        '           ~~^~~',
                        'ZeroDivisionError: division by zero']);
                    row(v, r, 'พัง! (หารด้วยศูนย์)', false); return;
                }
                out.textContent = `I = ${fmt(+v / +r * 1000)} mA`; st.textContent = 'คำนวณเรียบร้อย';
                row(v, r, out.textContent, true); return;
            }
            if (!isNum(v) || !isNum(r)) { out.textContent = 'I = ? mA'; st.textContent = '⚠️ กรุณาใส่ตัวเลขให้ครบทั้งสองช่อง'; row(v, r, 'เตือนใน status bar', true); return; }
            if (+r <= 0) { out.textContent = 'I = ? mA'; st.textContent = '⚠️ R ต้องมากกว่า 0'; row(v, r, 'เตือนใน status bar', true); return; }
            out.textContent = `I = ${fmt(+v / +r * 1000)} mA`; st.textContent = 'คำนวณเรียบร้อย';
            row(v, r, out.textContent, true);
        }
        el.addEventListener('click', e => {
            const b = e.target.closest('button'); if (!b) return;
            const a = b.dataset.a;
            if (a === 'calc') calc();
            else if (a === 'v1' || a === 'v2') {
                ver = a; tbody.innerHTML = ''; term.classList.remove('on'); out.textContent = 'I = ? mA'; st.textContent = 'ใส่ค่า V และ R แล้วกดคำนวณ';
                el.querySelectorAll('[data-a=v1],[data-a=v2]').forEach(x => x.classList.toggle('on', x.dataset.a === ver));
            }
            blur(b);
        });
        [vIn, rIn].forEach(i => i.addEventListener('keydown', e => { if (e.key === 'Enter') calc(); }));
    }

    /* ---------- วิดีโอ YouTube: แสดงภาพปกก่อน กดแล้วจึงโหลด ----------
       เล่นในกรอบได้เมื่อเปิดผ่าน http(s) เช่น GitHub Pages ถ้าเปิดไฟล์ในเครื่องให้ใช้ลิงก์ "เปิดใน YouTube" */
    function video(el) {
        const id = el.dataset.video, s = +el.dataset.start || 0, e = +el.dataset.end || 0;
        const title = el.dataset.title || 'วิดีโอ', credit = el.dataset.credit || '', len = el.dataset.len || '';
        const watch = `https://www.youtube.com/watch?v=${id}${s ? '&t=' + s + 's' : ''}`;
        el.classList.add('vid');
        el.innerHTML = `<div class="vd-frame"></div>
            <div class="vd-cap"><span class="vd-c">${esc(credit)}${len ? ' · ' + esc(len) + ' นาที' : ''}</span>
            <a href="${watch}" target="_blank" rel="noopener">เปิดใน YouTube ↗</a></div>`;
        const frame = el.querySelector('.vd-frame');
        const poster = () => {
            frame.innerHTML = `<button type="button" class="vd-poster" aria-label="เล่นวิดีโอ: ${esc(title)}">
                <img src="https://i.ytimg.com/vi/${id}/hqdefault.jpg" alt="" loading="lazy">
                <span class="vd-play" aria-hidden="true">▶</span><span class="vd-t">🎬 ${esc(title)}</span></button>`;
        };
        poster();
        frame.addEventListener('click', ev => {
            if (!ev.target.closest('.vd-poster')) return;
            const q = new URLSearchParams({ autoplay: 1, rel: 0, modestbranding: 1, playsinline: 1 });
            if (s) q.set('start', s);
            if (e) q.set('end', e);
            frame.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${id}?${q}" title="${esc(title)}"
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen
                referrerpolicy="strict-origin-when-cross-origin"></iframe>`;
        });
        const slide = el.closest('.slide');
        if (slide) new MutationObserver(() => {
            if (!slide.classList.contains('active') && frame.querySelector('iframe')) poster();
        }).observe(slide, { attributes: true, attributeFilter: ['class'] });
    }

    const SIMS = { loop, layout, anatomy, tb, ohm };
    function init(root) {
        root = root || document;
        root.querySelectorAll('[data-timer]').forEach(el => { timer(el); guard(el); });
        root.querySelectorAll('.vote').forEach(el => { vote(el); guard(el); });
        root.querySelectorAll('[data-picker]').forEach(el => { picker(el); guard(el); });
        root.querySelectorAll('[data-sim]').forEach(el => { const f = SIMS[el.dataset.sim]; if (f) { f(el); guard(el); } });
        root.querySelectorAll('[data-video]').forEach(el => { video(el); guard(el); });
    }

    g.Sims = { init };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => init(document));
    else init(document);
})(window);
