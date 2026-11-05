/* ===========================================
   UIMocks — ภาพจำลองชิ้นส่วน UI (วาดด้วย HTML/CSS เอง ไม่ใช้ภาพหน้าจอ)
   ใช้: <span class="mock" data-mock="switch"></span> แล้วเรียก UIMocks.render(กล่อง)
   ห้ามมีชื่อคอมโพเนนต์อยู่ในภาพ เพราะใช้เป็นโจทย์ "ดูภาพแล้วบอกชื่อ"
   =========================================== */
(function () {
    const CSS = `
.mock { display: block; width: 264px; max-width: 100%; margin: 4px 0 6px; font: 14px/1.35 'Sarabun', 'Prompt', sans-serif; color: #263238;
    -webkit-print-color-adjust: exact; print-color-adjust: exact; }
.mk { background: #fff; border: 1px solid #d5dbe0; border-radius: 10px; padding: 12px; position: relative; overflow: hidden; }
.mk .row { display: flex; align-items: center; gap: 10px; margin: 4px 0; }
.mk .sp { flex: 1; }
.mk .muted { color: #78909c; font-size: 12.5px; }
.mk .pri { color: #1976d2; }
.mk .screen { border: 1.5px solid #b0bec5; border-radius: 8px; height: 150px; position: relative; overflow: hidden; background: #fafbfc; }
.mk .ln { height: 8px; border-radius: 4px; background: #e3e8ec; margin: 9px 10px; }
/* switch */
.mk .sw { width: 38px; height: 16px; border-radius: 8px; background: #b0bec5; position: relative; flex: none; }
.mk .sw::after { content: ''; position: absolute; top: -3px; left: -2px; width: 22px; height: 22px; border-radius: 50%; background: #f5f5f5; box-shadow: 0 1px 3px rgba(0,0,0,.4); }
.mk .sw.on { background: #90caf9; }
.mk .sw.on::after { left: 18px; background: #1976d2; }
/* slider */
.mk .sl { height: 4px; background: #bbdefb; border-radius: 2px; position: relative; margin: 26px 8px 10px; }
.mk .sl i { position: absolute; left: 0; top: 0; bottom: 0; width: 60%; background: #1976d2; border-radius: 2px; }
.mk .sl b { position: absolute; left: 60%; top: -7px; width: 18px; height: 18px; margin-left: -9px; border-radius: 50%; background: #1976d2; }
.mk .sl em { position: absolute; left: 60%; top: -30px; transform: translateX(-50%); background: #1976d2; color: #fff; font-style: normal; font-size: 12px; padding: 1px 6px; border-radius: 4px; }
/* checkbox / radio */
.mk .cb { width: 18px; height: 18px; border: 2px solid #607d8b; border-radius: 3px; flex: none; display: grid; place-items: center; font-size: 13px; color: #fff; font-weight: 700; }
.mk .cb.on { background: #1976d2; border-color: #1976d2; }
.mk .rd { width: 18px; height: 18px; border: 2px solid #607d8b; border-radius: 50%; flex: none; position: relative; }
.mk .rd.on { border-color: #1976d2; }
.mk .rd.on::after { content: ''; position: absolute; inset: 3px; border-radius: 50%; background: #1976d2; }
/* text field / select */
.mk .tf { border: 1.5px solid #90a4ae; border-radius: 6px; padding: 9px 10px 7px; position: relative; display: flex; align-items: center; gap: 6px; margin-top: 8px; }
.mk .tf.focus { border: 2px solid #1976d2; }
.mk .tf > label { position: absolute; top: -9px; left: 8px; background: #fff; padding: 0 4px; font-size: 11.5px; color: #607d8b; }
.mk .tf.focus > label { color: #1976d2; }
.mk .pop { border-radius: 6px; box-shadow: 0 3px 10px rgba(0,0,0,.22); background: #fff; margin-top: 3px; padding: 4px 0; }
.mk .pop div { padding: 5px 12px; }
.mk .pop .sel { background: #e3f2fd; }
/* buttons */
.mk .bt { display: inline-block; padding: 6px 14px; border-radius: 5px; font-family: 'Prompt', sans-serif; font-size: 13px; font-weight: 500; letter-spacing: .3px; }
.mk .bt.c { background: #1976d2; color: #fff; box-shadow: 0 2px 3px rgba(0,0,0,.25); }
.mk .bt.o { border: 1px solid #1976d2; color: #1976d2; }
.mk .bt.t { color: #1976d2; }
.mk .grp { display: inline-flex; border-radius: 5px; overflow: hidden; box-shadow: 0 2px 3px rgba(0,0,0,.25); }
.mk .grp span { background: #1976d2; color: #fff; padding: 7px 14px; font-family: 'Prompt', sans-serif; font-size: 13px; border-right: 1px solid #1565c0; }
.mk .grp span:last-child { border-right: none; }
.mk .tg { display: inline-flex; border: 1px solid #cfd8dc; border-radius: 6px; overflow: hidden; }
.mk .tg span { width: 40px; height: 36px; display: grid; place-items: center; font: 700 17px 'Times New Roman', serif; color: #607d8b; border-right: 1px solid #cfd8dc; }
.mk .tg span:last-child { border-right: none; }
.mk .tg span.on { background: #dfe7ec; color: #1a237e; }
.mk .fab { position: absolute; right: 12px; bottom: 12px; width: 46px; height: 46px; border-radius: 50%; background: #1976d2; color: #fff; display: grid; place-items: center; font-size: 28px; line-height: 1; box-shadow: 0 3px 8px rgba(0,0,0,.35); }
/* rating */
.mk .stars { font-size: 28px; letter-spacing: 2px; color: #ffb400; }
.mk .stars s { color: #cfd8dc; text-decoration: none; }
/* avatar / badge / chip */
.mk .av { width: 42px; height: 42px; border-radius: 50%; display: grid; place-items: center; color: #fff; font: 500 18px 'Prompt', sans-serif; flex: none; }
.mk .bdg { position: relative; font-size: 30px; line-height: 1; display: inline-block; margin: 8px 18px 4px 6px; }
.mk .bdg b { position: absolute; top: -6px; right: -12px; min-width: 20px; height: 20px; padding: 0 5px; border-radius: 10px; background: #d32f2f; color: #fff; font: 700 12px/20px 'Prompt', sans-serif; text-align: center; }
.mk .chip { display: inline-flex; align-items: center; gap: 6px; border-radius: 16px; padding: 4px 6px 4px 12px; background: #e0e0e0; font-size: 13.5px; margin: 3px 2px; }
.mk .chip i { font-style: normal; width: 16px; height: 16px; border-radius: 50%; background: #9e9e9e; color: #fff; display: grid; place-items: center; font-size: 10px; }
.mk .chip.blue { background: #1976d2; color: #fff; }
.mk .chip.blue i { background: #90caf9; color: #0d47a1; }
.mk .chip.out { background: #fff; border: 1px solid #9e9e9e; padding-right: 12px; }
/* tooltip */
.mk .tip { display: inline-block; background: rgba(66,66,66,.92); color: #fff; font-size: 12px; padding: 3px 8px; border-radius: 4px; position: relative; }
.mk .tip::after { content: ''; position: absolute; left: 50%; bottom: -5px; margin-left: -5px; border: 5px solid transparent; border-bottom: none; border-top-color: rgba(66,66,66,.92); }
.mk .ibtn { width: 40px; height: 40px; border-radius: 50%; background: #eceff1; display: grid; place-items: center; font-size: 20px; position: relative; }
.mk .cur { position: absolute; right: -8px; bottom: -10px; font-size: 18px; }
/* alert */
.mk .al { display: flex; gap: 8px; align-items: flex-start; border-radius: 6px; padding: 8px 10px; margin: 6px 0; font-size: 13.5px; }
.mk .al.err { background: #fdeded; color: #5f2120; }
.mk .al.ok { background: #edf7ed; color: #1e4620; }
.mk .al.inf { background: #e5f6fd; color: #014361; }
.mk .al span:first-child { font-weight: 700; }
/* snackbar */
.mk .snack { position: absolute; left: 10px; right: 10px; bottom: 10px; background: #323232; color: #fff; border-radius: 5px; padding: 9px 12px; display: flex; font-size: 13px; box-shadow: 0 3px 6px rgba(0,0,0,.3); }
.mk .snack b { margin-left: auto; color: #90caf9; font-weight: 500; }
/* progress */
.mk .lp { height: 6px; background: #bbdefb; border-radius: 3px; overflow: hidden; margin: 6px 0; }
.mk .lp i { display: block; width: 45%; height: 100%; background: #1976d2; }
.mk .cp { width: 34px; height: 34px; border-radius: 50%; border: 4px solid #bbdefb; border-top-color: #1976d2; border-right-color: #1976d2; flex: none; }
/* skeleton */
.mk .sk { background: linear-gradient(90deg, #e0e0e0 25%, #eeeeee 50%, #e0e0e0 75%); background-size: 200% 100%; animation: mkshim 1.6s linear infinite; border-radius: 4px; }
@keyframes mkshim { from { background-position: 200% 0; } to { background-position: -200% 0; } }
/* tabs */
.mk .tabs { display: flex; border-bottom: 1px solid #cfd8dc; }
.mk .tabs span { padding: 8px 12px; font: 500 13px 'Prompt', sans-serif; color: #78909c; }
.mk .tabs span.on { color: #1976d2; border-bottom: 2px solid #1976d2; margin-bottom: -1px; }
/* breadcrumbs */
.mk .bc { font-size: 14px; color: #607d8b; }
.mk .bc a { color: #1976d2; text-decoration: underline; }
.mk .bc i { font-style: normal; margin: 0 7px; color: #90a4ae; }
/* stepper */
.mk .stp { display: flex; align-items: flex-start; }
.mk .stp > div { display: flex; flex-direction: column; align-items: center; gap: 4px; width: 62px; font-size: 12px; text-align: center; }
.mk .stp b { width: 24px; height: 24px; border-radius: 50%; background: #bdbdbd; color: #fff; display: grid; place-items: center; font: 500 12px 'Prompt', sans-serif; }
.mk .stp b.on { background: #1976d2; }
.mk .stp hr { flex: 1; border: none; border-top: 1px solid #bdbdbd; margin: 12px -14px 0; }
/* pagination */
.mk .pg { display: flex; gap: 4px; align-items: center; justify-content: center; }
.mk .pg span { min-width: 26px; height: 26px; border-radius: 13px; display: grid; place-items: center; font-size: 13px; color: #455a64; }
.mk .pg span.on { background: #1976d2; color: #fff; }
/* app bar / drawer / bottom nav */
.mk .bar { background: #1976d2; color: #fff; height: 40px; display: flex; align-items: center; gap: 10px; padding: 0 10px; font: 500 14px 'Prompt', sans-serif; box-shadow: 0 2px 4px rgba(0,0,0,.25); }
.mk .bar .ham { font-size: 18px; }
.mk .dim { position: absolute; inset: 0; background: rgba(0,0,0,.45); }
.mk .drw { position: absolute; top: 0; bottom: 0; left: 0; width: 62%; background: #fff; box-shadow: 2px 0 8px rgba(0,0,0,.35); padding: 8px 0; }
.mk .drw div { padding: 6px 12px; font-size: 13px; display: flex; gap: 8px; }
.mk .drw div.on { background: #e3f2fd; color: #1976d2; }
.mk .bnav { position: absolute; left: 0; right: 0; bottom: 0; height: 46px; background: #fff; border-top: 1px solid #e0e0e0; display: flex; box-shadow: 0 -1px 4px rgba(0,0,0,.08); }
.mk .bnav div { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; font-size: 11px; color: #78909c; line-height: 1.1; }
.mk .bnav div span { font-size: 17px; filter: grayscale(1); opacity: .6; }
.mk .bnav div.on { color: #1976d2; }
.mk .bnav div.on span { filter: none; opacity: 1; }
/* accordion */
.mk .acc { border-radius: 6px; box-shadow: 0 1px 3px rgba(0,0,0,.25); overflow: hidden; }
.mk .acc > div { border-top: 1px solid #e0e0e0; }
.mk .acc > div:first-child { border-top: none; }
.mk .acc .h { display: flex; padding: 9px 12px; font-weight: 700; font-size: 13.5px; }
.mk .acc .h i { margin-left: auto; font-style: normal; color: #607d8b; }
.mk .acc .b { padding: 0 12px 10px; font-size: 13px; color: #546e7a; }
/* card */
.mk .crd { border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,.2); overflow: hidden; background: #fff; }
.mk .crd .img { height: 70px; background: linear-gradient(135deg, #4fc3f7, #1976d2); display: grid; place-items: center; font-size: 34px; }
.mk .crd .bd { padding: 8px 12px 4px; }
.mk .crd .bd b { font: 500 15px 'Prompt', sans-serif; }
.mk .crd .ft { padding: 2px 6px 8px; }
/* menu */
.mk .menu { position: absolute; top: 34px; right: 16px; width: 140px; background: #fff; border-radius: 6px; box-shadow: 0 4px 14px rgba(0,0,0,.28); padding: 4px 0; }
.mk .menu div { padding: 6px 12px; font-size: 13px; display: flex; gap: 8px; }
.mk .menu hr { border: none; border-top: 1px solid #e0e0e0; margin: 3px 0; }
/* list */
.mk .lst > div { display: flex; align-items: center; gap: 12px; padding: 7px 4px; border-bottom: 1px solid #eceff1; }
.mk .lst > div:last-child { border-bottom: none; }
.mk .lst .ic { width: 34px; height: 34px; border-radius: 50%; background: #e3f2fd; display: grid; place-items: center; font-size: 16px; flex: none; }
.mk .lst small { display: block; color: #78909c; font-size: 12px; }
/* transfer list */
.mk .tl { display: flex; align-items: center; gap: 6px; }
.mk .tl .box { flex: 1; border: 1px solid #cfd8dc; border-radius: 6px; padding: 4px 6px; font-size: 12.5px; }
.mk .tl .box .row { gap: 6px; margin: 3px 0; }
.mk .tl .box .cb { width: 14px; height: 14px; font-size: 10px; }
.mk .tl .mid { display: flex; flex-direction: column; gap: 4px; }
.mk .tl .mid span { border: 1px solid #90a4ae; border-radius: 4px; padding: 0 6px; font-size: 12px; color: #455a64; }
/* number field */
.mk .nf { display: inline-flex; align-items: stretch; border: 1.5px solid #90a4ae; border-radius: 6px; overflow: hidden; }
.mk .nf span { display: grid; place-items: center; width: 36px; font-size: 18px; color: #455a64; background: #f1f4f6; }
.mk .nf b { display: grid; place-items: center; width: 64px; font: 500 18px 'Prompt', sans-serif; border-left: 1px solid #cfd8dc; border-right: 1px solid #cfd8dc; padding: 6px 0; }
@media print { .mock { width: 58mm; font-size: 10.5pt; } .mk .sk { animation: none; } }
`;

    const tick = '✓';
    const M = {
        switch: `<div class="mk">
            <div class="row"><span>💨 พัดลมห้องนอน</span><span class="sp"></span><span class="sw on"></span></div>
            <div class="row"><span>💡 ไฟหน้าบ้าน</span><span class="sp"></span><span class="sw"></span></div>
            <div class="row"><span>🔔 แจ้งเตือน</span><span class="sp"></span><span class="sw on"></span></div></div>`,
        slider: `<div class="mk"><div>💡 ความสว่าง LED</div>
            <div class="sl"><i></i><b></b><em>60</em></div>
            <div class="row muted"><span>0</span><span class="sp"></span><span>100</span></div></div>`,
        checkbox: `<div class="mk"><div class="muted">บันทึกค่าจากเซนเซอร์</div>
            <div class="row"><span class="cb on">${tick}</span>อุณหภูมิ</div>
            <div class="row"><span class="cb on">${tick}</span>ความชื้น</div>
            <div class="row"><span class="cb"></span>แสง</div></div>`,
        radio: `<div class="mk"><div class="muted">โหมดการทำงาน</div>
            <div class="row"><span class="rd"></span>อัตโนมัติ</div>
            <div class="row"><span class="rd on"></span>ตั้งเวลา</div>
            <div class="row"><span class="rd"></span>ปิด</div></div>`,
        select: `<div class="mk"><div class="tf focus"><label>พอร์ต</label><span>COM3</span><span class="sp"></span><span class="pri">▴</span></div>
            <div class="pop"><div>COM1</div><div class="sel">COM3</div><div>COM4</div><div>COM7</div></div></div>`,
        rating: `<div class="mk"><div>ให้คะแนนร้านนี้หน่อย</div><div class="stars">★★★★<s>★</s></div><div class="muted">4 จาก 5</div></div>`,
        togglebutton: `<div class="mk"><div class="muted" style="margin-bottom:6px">รูปแบบตัวอักษร</div>
            <div class="tg"><span class="on">B</span><span class="on" style="font-style:italic">I</span><span style="text-decoration:underline">U</span></div>
            <div class="muted" style="margin-top:6px">กดค้าง = เปิด · กดอีกที = ปิด</div></div>`,
        autocomplete: `<div class="mk"><div class="tf focus"><label>จังหวัด</label><span>อุต</span><span style="border-left:1.5px solid #1976d2;height:16px"></span><span class="sp"></span><span class="muted">✕</span><span class="pri">▴</span></div>
            <div class="pop"><div class="sel"><b>อุต</b>รดิตถ์</div><div><b>อุ</b>ทัยธานี</div><div><b>อุ</b>บลราชธานี</div></div></div>`,
        badge: `<div class="mk"><div class="row" style="gap:26px">
            <span class="bdg">🔔<b>4</b></span><span class="bdg">✉️<b>12</b></span><span class="bdg">🛒<b>99+</b></span></div></div>`,
        chip: `<div class="mk"><div class="muted">ทักษะที่เลือก</div>
            <span class="chip blue">Python <i>✕</i></span><span class="chip">PySide6 <i>✕</i></span><span class="chip">Arduino <i>✕</i></span><span class="chip out">+ เพิ่ม</span></div>`,
        avatar: `<div class="mk"><div class="muted">สมาชิกกลุ่ม</div><div class="row">
            <span class="av" style="background:#7e57c2">ส</span><span class="av" style="background:#26a69a">ก</span><span class="av" style="background:#ef6c00">น</span><span class="av" style="background:#eceff1;font-size:24px">🧑</span></div></div>`,
        tooltip: `<div class="mk" style="text-align:center;padding-top:10px">
            <div class="tip">ลบไฟล์</div><div style="display:flex;justify-content:center;gap:14px;margin-top:6px">
            <span class="ibtn">✏️</span><span class="ibtn" style="background:#cfd8dc">🗑️<span class="cur">↖</span></span><span class="ibtn">📤</span></div></div>`,
        alert: `<div class="mk">
            <div class="al err"><span>⛔</span><span>เชื่อมต่อบอร์ด ESP32 ไม่สำเร็จ</span></div>
            <div class="al ok"><span>✔</span><span>อัปโหลดโค้ดเรียบร้อย</span></div>
            <div class="al inf"><span>ℹ</span><span>มีอัปเดตใหม่ให้ติดตั้ง</span></div></div>`,
        snackbar: `<div class="mk"><div class="screen"><div class="ln" style="width:50%"></div><div class="ln"></div><div class="ln" style="width:70%"></div>
            <div class="snack">บันทึกแล้ว <b>เลิกทำ</b></div></div></div>`,
        progress: `<div class="mk"><div class="row"><span>กำลังอัปโหลดโค้ดลงบอร์ด</span><span class="sp"></span><b>45%</b></div>
            <div class="lp"><i></i></div><div class="row" style="margin-top:10px"><span class="cp"></span><span class="muted">กำลังค้นหาอุปกรณ์…</span></div></div>`,
        skeleton: `<div class="mk"><div class="row"><span class="sk" style="width:42px;height:42px;border-radius:50%"></span>
            <div style="flex:1"><div class="sk" style="height:12px;width:70%"></div><div class="sk" style="height:10px;width:45%;margin-top:7px"></div></div></div>
            <div class="sk" style="height:70px;margin-top:10px;border-radius:6px"></div>
            <div class="sk" style="height:10px;margin-top:8px"></div><div class="sk" style="height:10px;width:80%;margin-top:6px"></div></div>`,
        tabs: `<div class="mk" style="padding:4px 10px 10px"><div class="tabs"><span>ทั่วไป</span><span class="on">การเชื่อมต่อ</span><span>เกี่ยวกับ</span></div>
            <div style="padding-top:10px"><div class="row"><span>พอร์ต</span><span class="sp"></span><span class="muted">COM3</span></div>
            <div class="row"><span>ความเร็ว</span><span class="sp"></span><span class="muted">115200</span></div></div></div>`,
        breadcrumbs: `<div class="mk"><div class="bc"><a>หน้าแรก</a><i>/</i><a>วิชาเทคนิคการอินเตอร์เฟซ</a><i>/</i><span>สัปดาห์ 1</span></div>
            <div class="ln" style="margin:14px 0 8px;width:80%"></div><div class="ln" style="margin:0;width:60%"></div></div>`,
        stepper: `<div class="mk"><div class="stp"><div><b class="on">${tick}</b>ข้อมูลส่วนตัว</div><hr><div><b class="on">2</b><span class="pri">ที่อยู่</span></div><hr><div><b>3</b>ยืนยัน</div></div></div>`,
        pagination: `<div class="mk"><div class="ln" style="margin:2px 0 6px"></div><div class="ln" style="margin:0 0 12px;width:85%"></div>
            <div class="pg"><span>‹</span><span>1</span><span>2</span><span class="on">3</span><span>4</span><span>5</span><span>…</span><span>25</span><span>›</span></div></div>`,
        drawer: `<div class="mk" style="padding:0"><div class="screen" style="border:none;border-radius:0">
            <div class="bar"><span class="ham">☰</span>แอปบ้านอัจฉริยะ</div><div class="ln"></div><div class="ln" style="width:70%"></div>
            <div class="dim"></div><div class="drw"><div class="on">🏠 หน้าแรก</div><div>📈 กราฟ</div><div>⚙️ ตั้งค่า</div><div>🚪 ออกจากระบบ</div></div></div></div>`,
        appbar: `<div class="mk" style="padding:0"><div class="screen" style="border:none;border-radius:0">
            <div class="bar"><span class="ham">☰</span>แอปวัดอุณหภูมิ<span class="sp"></span>🔍<span>👤</span></div>
            <div style="padding:10px;font:500 26px Prompt">28.5 °C</div><div class="ln" style="width:60%"></div><div class="ln" style="width:40%"></div></div></div>`,
        accordion: `<div class="mk"><div class="acc">
            <div><div class="h">ติดตั้ง PySide6 ยังไง?<i>▴</i></div><div class="b">เปิด Terminal แล้วพิมพ์คำสั่ง pip install…</div></div>
            <div><div class="h">ลืมรหัสผ่านทำยังไง?<i>▾</i></div></div>
            <div><div class="h">ใช้กับ Mac ได้ไหม?<i>▾</i></div></div></div></div>`,
        card: `<div class="mk" style="background:#f4f6f8"><div class="crd"><div class="img">🌡️</div>
            <div class="bd"><b>เซนเซอร์ DHT22</b><div class="muted">วัดอุณหภูมิและความชื้น ต่อกับบอร์ดได้ง่าย</div></div>
            <div class="ft"><span class="bt t">ดูเพิ่ม</span><span class="bt t">สั่งซื้อ</span></div></div></div>`,
        fab: `<div class="mk" style="padding:0"><div class="screen" style="border:none;border-radius:0;height:160px">
            <div class="ln" style="width:55%;margin-top:14px"></div><div class="ln"></div><div class="ln" style="width:75%"></div><div class="ln"></div><div class="ln" style="width:65%"></div>
            <div class="fab">+</div></div></div>`,
        buttongroup: `<div class="mk"><div class="muted" style="margin-bottom:8px">จัดการไฟล์ที่เลือก</div><div class="grp"><span>คัดลอก</span><span>ย้าย</span><span>ลบ</span></div></div>`,
        transferlist: `<div class="mk" style="padding:8px"><div class="tl">
            <div class="box"><div class="muted">ทั้งหมด</div><div class="row"><span class="cb on">${tick}</span>แสง</div><div class="row"><span class="cb"></span>เสียง</div><div class="row"><span class="cb"></span>ก๊าซ</div></div>
            <div class="mid"><span>≫</span><span>&gt;</span><span>&lt;</span><span>≪</span></div>
            <div class="box"><div class="muted">ที่เลือก</div><div class="row"><span class="cb"></span>อุณหภูมิ</div><div class="row"><span class="cb"></span>ความชื้น</div><div class="row">&nbsp;</div></div></div></div>`,
        numberfield: `<div class="mk"><div class="muted" style="margin-bottom:6px">จำนวนตัวต้านทาน (ชิ้น)</div><div class="nf"><span>−</span><b>5</b><span>+</span></div></div>`,
        bottomnav: `<div class="mk" style="padding:0"><div class="screen" style="border:none;border-radius:0;height:160px">
            <div class="ln" style="width:55%;margin-top:14px"></div><div class="ln"></div><div class="ln" style="width:75%"></div>
            <div class="bnav"><div class="on"><span>🏠</span>หน้าแรก</div><div><span>🔍</span>ค้นหา</div><div><span>🔔</span>แจ้งเตือน</div><div><span>👤</span>ฉัน</div></div></div></div>`,
        menu: `<div class="mk" style="padding:0"><div class="screen" style="border:none;border-radius:0;height:160px">
            <div class="row" style="padding:6px 10px;margin:0"><b>📄 รายงาน.docx</b><span class="sp"></span><span style="font-size:18px;background:#e0e0e0;border-radius:50%;width:26px;text-align:center">⋮</span></div>
            <div class="ln"></div><div class="ln" style="width:60%"></div>
            <div class="menu"><div>✏️ เปลี่ยนชื่อ</div><div>📋 ทำสำเนา</div><div>📤 แชร์</div><hr><div>🗑️ ลบ</div></div></div></div>`,
        list: `<div class="mk"><div class="lst">
            <div><span class="ic">📁</span><div>งานกลุ่ม<small>แก้ไขเมื่อวาน</small></div></div>
            <div><span class="ic">🖼️</span><div>รูปวงจร<small>3 พ.ย.</small></div></div>
            <div><span class="ic">📝</span><div>รายงานแล็บ<small>1 พ.ย.</small></div></div></div></div>`
    };

    function render(root) {
        (root || document).querySelectorAll('.mock[data-mock]').forEach(el => {
            if (el.dataset.done) return;
            const html = M[el.dataset.mock];
            el.innerHTML = html || `<span style="color:#c00">ไม่มีภาพ ${el.dataset.mock}</span>`;
            el.setAttribute('role', 'img');
            el.setAttribute('aria-label', 'ภาพตัวอย่างหน้าจอ');
            el.dataset.done = '1';
        });
    }

    const st = document.createElement('style');
    st.textContent = CSS;
    document.head.appendChild(st);
    window.UIMocks = { render, names: Object.keys(M) };
})();
