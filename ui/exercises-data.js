/* แบบฝึกหัด ชุดฝึกรู้จัก UI (สาธารณะ ห้ามมีเฉลย — เฉลยอยู่ใน _private/answers-ui.json)
   ชนิด pick: เลือกคำตอบ · mock = ภาพจำลองจาก assets/js/uimocks.js
   ตอนที่ตัวเลือกไม่เหมือนกันทุกข้อ ตอนพิมพ์จะแสดงตัวเลือกใต้โจทย์ให้เอง */
(function () {
    const IN = ['Switch', 'Slider', 'Checkbox', 'Radio Group', 'Select', 'Rating', 'Toggle Button', 'Autocomplete', 'Text Field', 'Button Group'];
    const DF = ['Badge', 'Chip', 'Avatar', 'Tooltip', 'Alert', 'Snackbar', 'Progress', 'Skeleton', 'Divider', 'Dialog'];
    const NS = ['Tabs', 'Breadcrumbs', 'Stepper', 'Pagination', 'Drawer', 'App Bar', 'Accordion', 'Card', 'Menu', 'Paper'];
    const GRP = ['รับข้อมูล (Inputs)', 'แสดงข้อมูล (Data display)', 'แจ้งผล (Feedback)', 'พื้นผิว (Surface)', 'นำทาง (Navigation)', 'จัดวาง (Layout)'];
    const pic = (id, mock) => ({ id, type: 'pick', q: '', mock, options: null });

    const p1 = [pic('e1-1', 'slider'), pic('e1-2', 'radio'), pic('e1-3', 'switch'), pic('e1-4', 'autocomplete'),
        pic('e1-5', 'checkbox'), pic('e1-6', 'rating'), pic('e1-7', 'select'), pic('e1-8', 'togglebutton')];
    const p2 = [pic('e1-9', 'snackbar'), pic('e1-10', 'chip'), pic('e1-11', 'progress'), pic('e1-12', 'badge'),
        pic('e1-13', 'tooltip'), pic('e1-14', 'skeleton'), pic('e1-15', 'avatar'), pic('e1-16', 'alert')];
    const p3 = [pic('e1-17', 'stepper'), pic('e1-18', 'card'), pic('e1-19', 'tabs'), pic('e1-20', 'drawer'),
        pic('e1-21', 'pagination'), pic('e1-22', 'accordion'), pic('e1-23', 'appbar'), pic('e1-24', 'breadcrumbs')];
    p1.forEach(it => { it.options = IN; });
    p2.forEach(it => { it.options = DF; });
    p3.forEach(it => { it.options = NS; });

    const grp = (id, q) => ({ id, type: 'pick', q, options: GRP });
    const ux = (id, q, options) => ({ id, type: 'pick', q, options });

    window.EXERCISES = {
        chapter: 'ชุดฝึกรู้จัก UI (ชิ้นส่วนหน้าจอ)',
        sets: [
            { id: 's1', title: 'ชุดที่ 1 ดูภาพแล้วบอกชื่อ', parts: [
                { title: 'ตอนที่ 1 ชิ้นส่วนรับข้อมูล — ภาพนี้คืออะไร', items: p1 },
                { title: 'ตอนที่ 2 ชิ้นส่วนแสดงข้อมูลและแจ้งผล — ภาพนี้คืออะไร', items: p2 },
                { title: 'ตอนที่ 3 ชิ้นส่วนนำทางและพื้นผิว — ภาพนี้คืออะไร', items: p3 }
            ]},
            { id: 's2', title: 'ชุดที่ 2 จัดเข้ากลุ่มให้ถูก', parts: [
                { title: 'ชิ้นส่วนนี้อยู่กลุ่มไหน (แบ่งกลุ่มแบบเว็บ MUI)', items: [
                    grp('e2-1', '<b>Text Field</b> — ช่องให้พิมพ์ข้อความ'),
                    grp('e2-2', '<b>Table</b> — ตารางแถวและคอลัมน์'),
                    grp('e2-3', '<b>Dialog</b> — กล่องเด้งกลางจอให้กดยืนยัน'),
                    grp('e2-4', '<b>Grid</b> — แบ่งหน้าจอเป็นช่องตาราง 12 คอลัมน์'),
                    grp('e2-5', '<b>Menu</b> — รายการคำสั่งที่เด้งออกมาเมื่อกดปุ่ม'),
                    grp('e2-6', '<b>Paper</b> — แผ่นพื้นสีขาวมีเงา ใช้รองเนื้อหา'),
                    grp('e2-7', '<b>Speed Dial</b> — ปุ่มกลมที่กดแล้วกางปุ่มย่อยออกมา'),
                    grp('e2-8', '<b>Stack</b> — เรียงชิ้นส่วนต่อกันเป็นแถวหรือคอลัมน์')
                ]}
            ]},
            { id: 's3', title: 'ชุดที่ 3 เลือกให้เหมาะกับงาน', parts: [
                { title: 'ถ้าเราเป็นคนออกแบบแอป ควรใช้ชิ้นส่วนไหนดีที่สุด', items: [
                    ux('e3-1', 'แอปบ้านอัจฉริยะ อยากมีปุ่ม <b>เปิด-ปิดพัดลม</b> กดทีเดียว เห็นสถานะทันทีว่าเปิดอยู่หรือปิด', ['Slider', 'Switch', 'Text Field', 'Rating']),
                    ux('e3-2', 'ให้ผู้ใช้ <b>ปรับความสว่างหลอด LED 0–100%</b> โดยลากเลื่อนไปมาได้', ['Checkbox', 'Select', 'Slider', 'Badge']),
                    ux('e3-3', 'เลือก <b>พอร์ต COM 1 ตัว</b> จากรายการที่อาจมีถึง 10 พอร์ต และอยากประหยัดพื้นที่บนจอ', ['Radio Group', 'Checkbox', 'Chip', 'Select']),
                    ux('e3-4', 'เลือก <b>โหมดทำงาน 1 แบบ จาก 3 แบบ</b> (อัตโนมัติ / ตั้งเวลา / ปิด) อยากให้เห็นทุกตัวเลือกพร้อมกัน', ['Radio Group', 'Select', 'Switch', 'Text Field']),
                    ux('e3-5', 'เลือก <b>เซนเซอร์ที่จะบันทึกค่า</b> เลือกได้หลายตัวพร้อมกัน (อุณหภูมิ ความชื้น แสง)', ['Radio Group', 'Checkbox', 'Slider', 'Tabs']),
                    ux('e3-6', 'บอกผู้ใช้สั้น ๆ ว่า <b>“บันทึกแล้ว”</b> โดยไม่ขวางงาน แล้วให้หายไปเองใน 3 วินาที', ['Dialog', 'Accordion', 'Snackbar', 'Drawer']),
                    ux('e3-7', 'ก่อน <b>ลบไฟล์ข้อมูลทั้งหมด</b> ต้องให้ผู้ใช้กด “ลบ” หรือ “ยกเลิก” ก่อนจะทำอย่างอื่นต่อได้', ['Snackbar', 'Tooltip', 'Chip', 'Dialog']),
                    ux('e3-8', 'กำลัง <b>อัปโหลดโค้ดลงบอร์ด</b> อยากให้ผู้ใช้เห็นว่าไปถึงกี่เปอร์เซ็นต์แล้ว', ['Progress', 'Skeleton', 'Rating', 'Stepper']),
                    ux('e3-9', 'ฟอร์มสมัครสมาชิกแบ่งเป็น <b>3 ขั้น</b> (ข้อมูลส่วนตัว → ที่อยู่ → ยืนยัน) อยากบอกว่าตอนนี้อยู่ขั้นไหน', ['Tabs', 'Stepper', 'Pagination', 'Breadcrumbs']),
                    ux('e3-10', 'แสดง <b>จำนวนข้อความที่ยังไม่ได้อ่าน</b> เป็นตัวเลขเล็ก ๆ บนไอคอนกล่องจดหมาย', ['Chip', 'Avatar', 'Badge', 'Alert'])
                ]}
            ]}
        ]
    };
})();
