/* แบบทดสอบก่อน/หลังเรียน ชุดฝึกรู้จัก UI (สาธารณะ ห้ามมีเฉลย — เฉลยอยู่ใน _private/answers-ui.json)
   obj = จุดประสงค์ที่วัด: 1 บอกชื่อชิ้นส่วน UI จากภาพ · 2 จัดกลุ่มประเภท · 3 เลือกใช้ให้เหมาะกับงาน */
(function () {
    const mock = m => `<span class="mock" data-mock="${m}"></span>`;
    const G = { in: 'รับข้อมูล (Inputs)', dd: 'แสดงข้อมูล (Data display)', fb: 'แจ้งผล (Feedback)', sf: 'พื้นผิว (Surface)', nv: 'นำทาง (Navigation)', ly: 'จัดวาง (Layout)' };
    window.QUIZ = {
        chapter: 'ชุดฝึกรู้จัก UI (ชิ้นส่วนหน้าจอ)',
        questions: [
            { id: 'q1', topic: 'ดูภาพ', obj: 1, q: 'ปุ่มกลมสีน้ำเงินที่ลอยอยู่มุมขวาล่างของจอ เรียกว่าอะไร' + mock('fab'), choices: ['Avatar', 'Floating Action Button', 'Badge', 'Chip'] },
            { id: 'q2', topic: 'ดูภาพ', obj: 1, q: 'ปุ่มหลายปุ่มที่ต่อติดกันเป็นแถวเดียวแบบนี้ เรียกว่าอะไร' + mock('buttongroup'), choices: ['Tabs', 'Pagination', 'Button Group', 'Breadcrumbs'] },
            { id: 'q3', topic: 'ดูภาพ', obj: 1, q: 'ชิ้นส่วนที่ย้ายรายการจากกล่องซ้ายไปกล่องขวาได้แบบนี้ เรียกว่าอะไร' + mock('transferlist'), choices: ['Table', 'Drawer', 'Accordion', 'Transfer List'] },
            { id: 'q4', topic: 'ดูภาพ', obj: 1, q: 'ช่องใส่ตัวเลขที่มีปุ่ม − และ + ให้กดเพิ่มลด เรียกว่าอะไร' + mock('numberfield'), choices: ['Number Field', 'Rating', 'Slider', 'Pagination'] },
            { id: 'q5', topic: 'ดูภาพ', obj: 1, q: 'แถบไอคอนด้านล่างสุดของจอมือถือแบบนี้ เรียกว่าอะไร' + mock('bottomnav'), choices: ['App Bar', 'Bottom Navigation', 'Tabs', 'Breadcrumbs'] },
            { id: 'q6', topic: 'ดูภาพ', obj: 1, q: 'กดปุ่ม ⋮ แล้วมีรายการคำสั่งเด้งออกมา ส่วนที่เด้งออกมาเรียกว่าอะไร' + mock('menu'), choices: ['Select', 'Snackbar', 'Menu', 'Tooltip'] },
            { id: 'q7', topic: 'ดูภาพ', obj: 1, q: 'รายการเรียงลงมาทีละแถว มีไอคอนและข้อความ 2 บรรทัด แบบนี้เรียกว่าอะไร' + mock('list'), choices: ['Table', 'Card', 'Stepper', 'List'] },
            { id: 'q8', topic: 'จัดกลุ่ม', obj: 2, q: 'ข้อใด <b>ทุกตัว</b> อยู่ในกลุ่มรับข้อมูล (Inputs)', choices: ['Switch, Slider, Rating', 'Badge, Chip, Avatar', 'Tabs, Stepper, Menu', 'Alert, Snackbar, Progress'] },
            { id: 'q9', topic: 'จัดกลุ่ม', obj: 2, q: '<b>Alert</b> (กล่องข้อความสีแดง/เขียว บอกว่าสำเร็จหรือผิดพลาด) อยู่กลุ่มไหน', choices: [G.dd, G.fb, G.nv, G.ly] },
            { id: 'q10', topic: 'จัดกลุ่ม', obj: 2, q: '<b>Breadcrumbs</b> (หน้าแรก / วิชา / สัปดาห์ 1) อยู่กลุ่มไหน', choices: [G.in, G.sf, G.nv, G.fb] },
            { id: 'q11', topic: 'จัดกลุ่ม', obj: 2, q: '<b>Card</b> (การ์ดมีรูป หัวเรื่อง และปุ่ม) อยู่กลุ่มไหน', choices: [G.ly, G.dd, G.nv, G.sf] },
            { id: 'q12', topic: 'จัดกลุ่ม', obj: 2, q: '<b>Stack</b> (เรียงชิ้นส่วนต่อกันเป็นแถวหรือคอลัมน์ เว้นระยะเท่ากัน) อยู่กลุ่มไหน', choices: [G.ly, G.in, G.sf, G.fb] },
            { id: 'q13', topic: 'เลือกใช้', obj: 3, q: 'ปุ่มไอคอน 🗑️ ไม่มีตัวหนังสือ อยากให้ <b>ชี้เมาส์แล้วขึ้นคำว่า “ลบไฟล์”</b> ควรใช้อะไร', choices: ['Dialog', 'Tooltip', 'Alert', 'Snackbar'] },
            { id: 'q14', topic: 'เลือกใช้', obj: 3, q: 'ช่องเลือกจังหวัด (มี 77 จังหวัด) อยากให้ <b>พิมพ์ “อุต” แล้วมีชื่อที่ตรงขึ้นมาให้เลือก</b> ควรใช้อะไร', choices: ['Radio Group', 'Checkbox', 'Autocomplete', 'Rating'] },
            { id: 'q15', topic: 'เลือกใช้', obj: 3, q: 'อยากให้ลูกค้า <b>ให้คะแนนความพอใจ 1–5 ดาว</b> ควรใช้อะไรเหมาะที่สุด', choices: ['Switch', 'Slider', 'Progress', 'Rating'] },
            { id: 'q16', topic: 'เลือกใช้', obj: 3, q: 'หน้าตั้งค่ามี 3 กลุ่ม (ทั่วไป / การเชื่อมต่อ / เกี่ยวกับ) อยากให้ <b>สลับดูทีละกลุ่มในหน้าต่างเดียว</b> ควรใช้อะไร', choices: ['Tabs', 'Stepper', 'Pagination', 'Snackbar'] },
            { id: 'q17', topic: 'เลือกใช้', obj: 3, q: 'ตารางค่าเซนเซอร์มี 500 แถว อยาก <b>แบ่งแสดงหน้าละ 20 แถว</b> แล้วกดเปลี่ยนหน้าได้ ควรใช้อะไร', choices: ['Stepper', 'Pagination', 'Tabs', 'Breadcrumbs'] },
            { id: 'q18', topic: 'เลือกใช้', obj: 3, q: 'บอร์ด ESP32 หลุดการเชื่อมต่อ อยาก <b>ขึ้นข้อความสีแดงค้างไว้บนหน้า</b> จนกว่าจะแก้ได้ โดยไม่ต้องให้ใครกดยืนยัน ควรใช้อะไร', choices: ['Tooltip', 'Badge', 'Alert', 'Snackbar'] },
            { id: 'q19', topic: 'เลือกใช้', obj: 3, q: 'ระหว่างรอโหลดข้อมูล อยาก <b>โชว์กล่องสีเทาเป็นโครงหน้าตาเนื้อหาไว้ก่อน</b> ให้รู้ว่ากำลังมา ควรใช้อะไร', choices: ['Backdrop', 'Divider', 'Paper', 'Skeleton'] },
            { id: 'q20', topic: 'เลือกใช้', obj: 3, q: 'หน้าคำถามที่พบบ่อย 10 ข้อ อยากให้ <b>กดที่คำถามแล้วคำตอบกางออก กดอีกทีพับเก็บ</b> ควรใช้อะไร', choices: ['Accordion', 'Card', 'Drawer', 'Tabs'] }
        ]
    };
})();
