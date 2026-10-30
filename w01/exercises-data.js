/* แบบฝึกหัด สัปดาห์ที่ 1 (สาธารณะ ห้ามมีเฉลย — เฉลยอยู่ใน _private/answers-w01.json)
   ชนิด pick: เลือกคำตอบ (it.code = กล่องโค้ดประกอบโจทย์) · ชนิด num: ตอบเป็นตัวเลข */
(function () {
    const GC = ['GUI', 'CLI'];
    const PART = ['ดึงเครื่องมือมาใช้', 'สร้างตัวแอป', 'สร้างหน้าต่าง', 'แสดงหน้าต่าง', 'เริ่ม event loop'];
    const W = ['QLabel', 'QLineEdit', 'QPushButton', 'QVBoxLayout', 'QHBoxLayout', 'QMainWindow'];
    const STEP = ['ขั้น 1 สเปก', 'ขั้น 2 สั่ง AI', 'ขั้น 3 อ่านโค้ด', 'ขั้น 4 รัน', 'ขั้น 5 ทดสอบ', 'ขั้น 6 แก้', 'ขั้น 7 ปรับ'];
    const TF = ['ถูก', 'ผิด'];
    const ERR = ['ยังไม่เปิด venv / เลือก Python ผิดตัว', 'AI ใช้ไลบรารีผิด (PyQt5)', 'สะกดชื่อคำสั่งผิด', 'แปลงข้อความที่ไม่ใช่ตัวเลขด้วย float()', 'หารด้วยศูนย์'];

    window.EXERCISES = {
        chapter: 'สัปดาห์ที่ 1 GUI ตัวแรกกับผู้ช่วย AI',
        sets: [
            { id: 's1', title: 'ชุดที่ 1 GUI และโครงโปรแกรม', parts: [
                { title: 'ตอนที่ 1 แบบไหนคือ GUI แบบไหนคือ CLI', items: [
                    { id: 'e1-1', type: 'pick', q: 'หน้าจอสัมผัสของตู้เติมเงินมือถือ', options: GC },
                    { id: 'e1-2', type: 'pick', q: 'พิมพ์ <code>pip install PySide6-Essentials</code> ใน Terminal', options: GC },
                    { id: 'e1-3', type: 'pick', q: 'หน้าต่างเครื่องคิดเลขกฎของโอห์มที่มีช่องกรอกและปุ่ม', options: GC },
                    { id: 'e1-4', type: 'pick', q: 'พิมพ์ <code>python --version</code> แล้วอ่านผลที่ขึ้นเป็นข้อความ', options: GC },
                    { id: 'e1-5', type: 'pick', q: 'Serial Plotter ที่แสดงกราฟค่าเซนเซอร์', options: GC }
                ]},
                { title: 'ตอนที่ 2 บรรทัดนี้ทำหน้าที่อะไร', items: [
                    { id: 'e1-6', type: 'pick', q: '<code>app = QApplication(sys.argv)</code>', options: PART },
                    { id: 'e1-7', type: 'pick', q: '<code>window = QWidget()</code>', options: PART },
                    { id: 'e1-8', type: 'pick', q: '<code>window.show()</code>', options: PART },
                    { id: 'e1-9', type: 'pick', q: '<code>sys.exit(app.exec())</code>', options: PART },
                    { id: 'e1-10', type: 'pick', q: '<code>from PySide6.QtWidgets import QApplication, QWidget</code>', options: PART }
                ]}
            ]},
            { id: 's2', title: 'ชุดที่ 2 widget และการอ่านโค้ด', parts: [
                { title: 'ตอนที่ 1 อยากได้สิ่งนี้ ต้องใช้อะไร', items: [
                    { id: 'e2-1', type: 'pick', q: 'ช่องให้ผู้ใช้พิมพ์ชื่อ 1 บรรทัด', options: W },
                    { id: 'e2-2', type: 'pick', q: 'ข้อความ “I = 12.00 mA” ที่ผู้ใช้แก้ไม่ได้', options: W },
                    { id: 'e2-3', type: 'pick', q: 'ปุ่ม “คำนวณกระแส”', options: W },
                    { id: 'e2-4', type: 'pick', q: 'จัด widget เรียงจากบนลงล่าง', options: W },
                    { id: 'e2-5', type: 'pick', q: 'จัดปุ่ม 3 ปุ่มเรียงจากซ้ายไปขวา', options: W },
                    { id: 'e2-6', type: 'pick', q: 'หน้าต่างหลักที่มีเมนูและแถบสถานะ', options: W }
                ]},
                { title: 'ตอนที่ 2 อ่านโค้ดแล้วตอบ', items: [
                    { id: 'e2-7', type: 'pick', q: 'ผู้ใช้พิมพ์ว่า สมชาย แล้วกดปุ่ม ป้าย result_label จะแสดงว่าอะไร',
                      code: 'name = self.name_input.text()\nself.result_label.setText(f"สวัสดี {name}")',
                      options: ['สวัสดี {name}', 'สวัสดี สมชาย', 'สมชาย', 'ไม่แสดงอะไร'] },
                    { id: 'e2-8', type: 'pick', q: 'ผู้ใช้พิมพ์ 12 ในช่อง v_input ค่า x เป็นข้อมูลชนิดใด',
                      code: 'x = self.v_input.text()\nprint(type(x))',
                      options: ["<class 'str'> (ข้อความ)", "<class 'int'> (จำนวนเต็ม)", "<class 'float'> (ทศนิยม)", "<class 'QLineEdit'>"] },
                    { id: 'e2-9', type: 'pick', q: 'บรรทัดนี้ผิดตรงไหน',
                      code: 'self.calc_button.clicked.connect(self.calculate())',
                      options: ['ไม่ผิด ใช้ได้ปกติ', 'ต้องเขียน self.calculate โดยไม่มีวงเล็บ', 'ต้องใช้ pressed แทน clicked', 'ต้องใส่ app.exec() ในวงเล็บ'] },
                    { id: 'e2-10', type: 'pick', q: 'คลาสนี้สืบทอดจาก QMainWindow รันแล้วไม่เห็นข้อความ hello ต้องแก้อย่างไร',
                      code: 'layout = QVBoxLayout()\nlayout.addWidget(QLabel("hello"))\nself.setLayout(layout)',
                      options: ['ใส่ layout ใน QWidget แล้วเรียก self.setCentralWidget(widget)', 'เปลี่ยนเป็น QHBoxLayout', 'เพิ่ม import sys', 'เรียก app.exec() สองครั้ง'] }
                ]}
            ]},
            { id: 's3', title: 'ชุดที่ 3 ทำงานกับ AI', parts: [
                { title: 'ตอนที่ 1 สิ่งที่ทำนี้อยู่ขั้นไหนของวงจร 7 ขั้น', items: [
                    { id: 'e3-1', type: 'pick', q: 'เขียนว่าหน้าจอมีอะไร รับอะไร แสดงอะไร กรณีพิเศษคืออะไร', options: STEP },
                    { id: 'e3-2', type: 'pick', q: 'พิมพ์บอก AI ว่าให้ใช้ PySide6 สร้างหน้าต่างอะไร', options: STEP },
                    { id: 'e3-3', type: 'pick', q: 'ชี้ว่าบรรทัดไหนสร้างแอป บรรทัดไหนต่อปุ่มกับฟังก์ชัน', options: STEP },
                    { id: 'e3-4', type: 'pick', q: 'ลองกรอกช่องว่าง ตัวอักษร และ R = 0 ดูว่าโปรแกรมพังไหม', options: STEP },
                    { id: 'e3-5', type: 'pick', q: 'คัดลอก Traceback ทั้งหมดพร้อมโค้ดไปถาม AI ว่าเกิดจากอะไร', options: STEP },
                    { id: 'e3-6', type: 'pick', q: 'สั่ง AI เพิ่ม status bar อย่างเดียว แล้วเซฟเป็นไฟล์ v2', options: STEP }
                ]},
                { title: 'ตอนที่ 2 ถูกหรือผิด', items: [
                    { id: 'e3-7', type: 'pick', q: 'ถ้า AI ตอบอย่างมั่นใจ แปลว่าโค้ดถูกแน่นอน', options: TF },
                    { id: 'e3-8', type: 'pick', q: 'ควรระบุใน prompt ว่า “ใช้ PySide6 เท่านั้น”', options: TF },
                    { id: 'e3-9', type: 'pick', q: 'ใส่รหัสผ่านบัญชีของเราใน prompt ได้ ถ้าช่วยให้ AI เข้าใจงาน', options: TF },
                    { id: 'e3-10', type: 'pick', q: 'ก่อนให้ AI แก้โค้ด ควรเซฟรุ่นเดิมเก็บไว้ (v1, v2)', options: TF },
                    { id: 'e3-11', type: 'pick', q: 'สั่ง AI ปรับหลายเรื่องพร้อมกันในครั้งเดียว จะหาบั๊กได้ง่ายกว่า', options: TF },
                    { id: 'e3-12', type: 'pick', q: 'โค้ดที่ AI เขียน ถ้าเรานำไปส่งงาน เราต้องอธิบายได้ว่าทำงานอย่างไร', options: TF }
                ]}
            ]},
            { id: 's4', title: 'ชุดที่ 4 อ่าน error และทดสอบ', parts: [
                { title: 'ตอนที่ 1 error นี้เกิดจากอะไร (ดูบรรทัดล่างสุดของ Traceback)', items: [
                    { id: 'e4-1', type: 'pick', q: "<code>ModuleNotFoundError: No module named 'PySide6'</code> (ติดตั้งไว้แล้ว)", options: ERR },
                    { id: 'e4-2', type: 'pick', q: "<code>ModuleNotFoundError: No module named 'PyQt5'</code>", options: ERR },
                    { id: 'e4-3', type: 'pick', q: "<code>AttributeError: 'PySide6.QtWidgets.QWidget' object has no attribute 'setWindowTittle'</code>", options: ERR },
                    { id: 'e4-4', type: 'pick', q: "<code>ValueError: could not convert string to float: 'abc'</code>", options: ERR },
                    { id: 'e4-5', type: 'pick', q: '<code>ZeroDivisionError: division by zero</code>', options: ERR }
                ]},
                { title: 'ตอนที่ 2 เครื่องคิดเลขกฎของโอห์มที่ถูกต้อง ควรแสดง I กี่ mA (ทศนิยม 2 ตำแหน่ง)', items: [
                    { id: 'e4-6', type: 'num', q: 'V = 12 V · R = 1000 Ω', unit: 'mA', dp: 2 },
                    { id: 'e4-7', type: 'num', q: 'V = 5 V · R = 220 Ω', unit: 'mA', dp: 2 },
                    { id: 'e4-8', type: 'num', q: 'V = 9 V · R = 470 Ω', unit: 'mA', dp: 2 },
                    { id: 'e4-9', type: 'num', q: 'V = 3.3 V · R = 330 Ω', unit: 'mA', dp: 2 },
                    { id: 'e4-10', type: 'num', q: 'V = 24 V · R = 4.7 kΩ', unit: 'mA', dp: 2 }
                ]}
            ]}
        ]
    };
})();
