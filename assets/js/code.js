/* ===========================================
   CodeHL — ไฮไลต์โค้ด Python (ค่าเริ่มต้น) / ภาษาซี ใน <pre class="code"> + ปุ่มคัดลอก
   - เขียนโค้ดตรง ๆ ใน <pre class="code"> (ต้องเขียน &lt; &gt; &amp; แทน < > &)
   - data-lang="c"      ใช้ไฮไลต์ภาษาซี (ไม่ใส่ = Python)
   - data-lang="term"   หน้าจอ Terminal (ไม่ไฮไลต์ แต่ระบายบรรทัด Traceback/Error เป็นสีแดง)
   - data-ln            แสดงเลขบรรทัด (data-ln="11" = เริ่มที่บรรทัด 11)
   - data-hl="2,4-6"    ไฮไลต์บรรทัด (สีเหลือง) · data-hl2 (สีฟ้า) · data-err (สีแดง)
   - data-frag="3-4|5"  แสดงบรรทัดทีละกลุ่มเมื่อกด → (กลุ่มคั่นด้วย |)
   - data-copy          มีปุ่ม 📋 คัดลอก (ใช้กับ <div class="prompt" data-copy> ได้ด้วย)
   หน้าเว็บที่สร้างเนื้อหาภายหลังให้เรียก CodeHL.render(element)
   =========================================== */
(function (g) {
    'use strict';
    const LANG = {
        py: {
            kw: 'import from as class def return if elif else for while in not and or is None True False try except finally with pass break continue lambda raise global yield self',
            ty: 'Qt QApplication QWidget QMainWindow QLabel QLineEdit QPushButton QVBoxLayout QHBoxLayout QGridLayout QFormLayout QCheckBox QComboBox QMessageBox QStatusBar QFont QTimer QTest',
            co: 'sys',
            re: /(#[^\n]*)|("""[\s\S]*?"""|[rbfRBF]?"(?:\\.|[^"\\\n])*"|[rbfRBF]?'(?:\\.|[^'\\\n])*')|(@\w+)|(\b\d+(?:\.\d+)?\b)|([A-Za-z_]\w*)(?=(\s*\()?)/g
        },
        c: {
            kw: 'if else for while do switch case default break continue return goto sizeof struct union typedef const static volatile',
            ty: 'void int char byte boolean bool float double long short unsigned signed word String uint8_t int8_t uint16_t int16_t uint32_t int32_t size_t',
            co: 'HIGH LOW INPUT OUTPUT INPUT_PULLUP true false LED_BUILTIN',
            re: /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|("(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*')|(#\s*(?:define|include|ifdef|ifndef|endif|if|else|pragma)\b)|(\b(?:0[bB][01]+|0[xX][0-9a-fA-F]+|\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)\b)|([A-Za-z_]\w*)(?=(\s*\()?)/g
        }
    };
    Object.values(LANG).forEach(L => ['kw', 'ty', 'co'].forEach(k => { L[k] = new Set(L[k].split(' ')); }));
    const esc = s => s.replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));

    /* แบ่งโค้ดเป็นชิ้น [คลาส, ข้อความ] */
    function tokens(src, lang) {
        const L = LANG[lang] || LANG.py, RE = L.re;
        const out = [];
        let last = 0, m;
        RE.lastIndex = 0;
        while ((m = RE.exec(src))) {
            if (m.index > last) out.push(['', src.slice(last, m.index)]);
            let cls = '';
            if (m[1]) cls = 'c';
            else if (m[2]) cls = 's';
            else if (m[3]) cls = 'p';
            else if (m[4]) cls = 'n';
            else if (m[5]) cls = L.kw.has(m[5]) ? 'k' : L.ty.has(m[5]) || /^Q[A-Z]\w+$/.test(m[5]) ? 't' : L.co.has(m[5]) ? 'n' : m[6] ? 'f' : '';
            out.push([cls, m[0]]);
            last = m.index + m[0].length;
        }
        if (last < src.length) out.push(['', src.slice(last)]);
        return out;
    }

    function dedent(src) {
        let lines = src.replace(/\r/g, '').replace(/\t/g, '    ').split('\n');
        while (lines.length && !lines[0].trim()) lines.shift();
        while (lines.length && !lines[lines.length - 1].trim()) lines.pop();
        const ind = Math.min(...lines.filter(l => l.trim()).map(l => l.match(/^ */)[0].length));
        return lines.map(l => l.slice(ind)).join('\n');
    }

    /* "2,4-6" -> Set {2,4,5,6} */
    function range(s) {
        const set = new Set();
        String(s || '').split(',').forEach(p => {
            const [a, b] = p.split('-').map(Number);
            if (!a) return;
            for (let i = a; i <= (b || a); i++) set.add(i);
        });
        return set;
    }

    /* ปุ่มคัดลอก: คัดลอกข้อความต้นฉบับ (ก่อนไฮไลต์) */
    function copyText(text) {
        if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
        const ta = document.createElement('textarea');
        ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
        document.body.appendChild(ta); ta.select();
        try { document.execCommand('copy'); } finally { ta.remove(); }
        return Promise.resolve();
    }
    function addCopy(el, text) {
        if (el.querySelector(':scope > .cp-btn')) return;
        const b = document.createElement('button');
        b.type = 'button'; b.className = 'cp-btn'; b.textContent = '📋 คัดลอก';
        b.addEventListener('click', e => {
            e.stopPropagation();
            copyText(text).then(() => { b.textContent = '✅ คัดลอกแล้ว'; setTimeout(() => { b.textContent = '📋 คัดลอก'; }, 1600); });
            b.blur();
        });
        b.addEventListener('keydown', e => e.stopPropagation());
        el.classList.add('has-cp');
        el.appendChild(b);
    }

    function renderOne(pre) {
        if (pre.dataset.done) return;
        pre.dataset.done = '1';
        const src = dedent(pre.textContent);
        const lang = pre.dataset.lang || 'py';
        const lines = [''];
        if (lang === 'term') {
            src.split('\n').forEach((l, i) => {
                if (i) lines.push('');
                const bad = /^(Traceback|\w*Error|\w+Exception)\b|Error:/.test(l);
                lines[lines.length - 1] = bad ? `<span class="tr-err">${esc(l)}</span>` : esc(l);
            });
        } else {
            // คอมเมนต์/สตริงหลายบรรทัดต้องปิด/เปิด span ใหม่ทุกบรรทัด
            tokens(src, lang).forEach(([cls, text]) => {
                text.split('\n').forEach((part, i) => {
                    if (i) lines.push('');
                    if (part) lines[lines.length - 1] += cls ? `<span class="${cls}">${esc(part)}</span>` : esc(part);
                });
            });
        }
        const start = +pre.dataset.ln || 1;
        if (pre.hasAttribute('data-ln')) pre.classList.add('ln');
        if (lang === 'term') pre.classList.add('term');
        const hl = range(pre.dataset.hl), hl2 = range(pre.dataset.hl2), err = range(pre.dataset.err);
        const groups = (pre.dataset.frag || '').split('|').map(range);
        const html = [];
        let open = -1;
        lines.forEach((l, i) => {
            const n = start + i;
            const gi = groups.findIndex(set => set.has(n));
            if (gi !== open) {
                if (open >= 0) html.push('</span>');
                if (gi >= 0) html.push('<span class="frag" style="display:block">');
                open = gi;
            }
            const c = ['l', hl.has(n) && 'hl', hl2.has(n) && 'hl2', err.has(n) && 'err'].filter(Boolean).join(' ');
            html.push(`<span class="${c}" data-n="${n}">${l || ' '}</span>`);
        });
        if (open >= 0) html.push('</span>');
        pre.innerHTML = html.join('');
        if (pre.hasAttribute('data-copy')) addCopy(pre, src);
    }

    function render(root) {
        root = root || document;
        root.querySelectorAll('pre.code').forEach(renderOne);
        root.querySelectorAll('.prompt[data-copy]').forEach(el => {
            if (el.dataset.done) return;
            el.dataset.done = '1';
            const body = el.querySelector('.pr-text') || el;
            addCopy(el, body.innerText.trim());
        });
    }

    g.CodeHL = { render, tokens };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => render(document));
    else render(document);
})(window);
