/* แบบทดสอบก่อน/หลังเรียน สัปดาห์ที่ 1 (สาธารณะ ห้ามมีเฉลย — เฉลยอยู่ใน _private/answers-w01.json)
   obj = จุดประสงค์ข้อที่วัด: 1 สถาปัตยกรรม GUI · 2 ติดตั้งเครื่องมือ · 3 widget และสั่ง AI · 4 ทดสอบและแก้ error · 5 ใช้ AI อย่างรับผิดชอบ */
window.QUIZ = {
    chapter: 'สัปดาห์ที่ 1 GUI ตัวแรกกับผู้ช่วย AI',
    questions: [
        { id: 'q1', topic: 'GUI', obj: 1, q: 'GUI ย่อมาจากอะไร', choices: ['Graphical User Interface', 'General Utility Interface', 'Graphic Unit Input', 'Global User Internet'] },
        { id: 'q2', topic: 'GUI', obj: 1, q: 'ข้อใดเป็นการสั่งงานแบบ CLI', choices: ['กดปุ่มบนตู้ ATM แบบจอสัมผัส', 'พิมพ์คำสั่ง <code>ipconfig</code> ใน PowerShell แล้วอ่านผล', 'แตะส่งสติกเกอร์ในแอป LINE', 'คลิกส่งงานในหน้าเว็บ Google Classroom'] },
        { id: 'q3', topic: 'สถาปัตยกรรม', obj: 1, q: 'ในโปรแกรม PySide6 หนึ่งโปรแกรม ควรมี <code>QApplication</code> กี่ตัว', choices: ['ไม่ต้องมีเลย', '1 ตัวต่อปุ่ม 1 ปุ่ม', '1 ตัวต่อทั้งโปรแกรม', '1 ตัวต่อหน้าต่าง 1 หน้าต่าง'] },
        { id: 'q4', topic: 'สถาปัตยกรรม', obj: 1, q: '<code>app.exec()</code> มีหน้าที่อะไร', choices: ['สร้างหน้าต่างใหม่', 'ปิดโปรแกรมทันที', 'ติดตั้งไลบรารี PySide6', 'เริ่ม event loop เพื่อรอและจัดการเหตุการณ์จากผู้ใช้'] },
        { id: 'q5', topic: 'สถาปัตยกรรม', obj: 1, q: 'ถ้าลบบรรทัด <code>window.show()</code> ออก แต่ยังมี <code>sys.exit(app.exec())</code> จะเกิดอะไร', choices: ['ไม่มีหน้าต่างขึ้น แต่โปรแกรมยังทำงานค้างอยู่', 'ขึ้น SyntaxError ทันที', 'หน้าต่างขึ้นตามปกติ', 'หน้าต่างขึ้นแล้วปิดเองทันที'] },
        { id: 'q6', topic: 'ติดตั้ง', obj: 2, q: 'คำสั่งใดใช้ติดตั้ง PySide6 ชุด Essentials ใน venv', choices: ['python install PySide6', 'pip install PySide6-Essentials', 'py install PySide6', 'import PySide6-Essentials'] },
        { id: 'q7', topic: 'ติดตั้ง', obj: 2, q: 'venv คืออะไร', choices: ['โปรแกรมเขียนโค้ดของ Microsoft', 'ไวรัสคอมพิวเตอร์ชนิดหนึ่ง', 'สภาพแวดล้อมแยกของโปรเจกต์ เก็บไลบรารีไม่ให้ปนกับงานอื่น', 'ผู้ช่วย AI ใน VS Code'] },
        { id: 'q8', topic: 'ติดตั้ง', obj: 2, q: 'ติดตั้ง PySide6 แล้ว แต่รันโปรแกรมแล้วขึ้น <code>ModuleNotFoundError: No module named \'PySide6\'</code> สาเหตุที่เป็นไปได้มากที่สุดคือข้อใด', choices: ['คอมพิวเตอร์เสีย', 'พิมพ์ชื่อหน้าต่างผิด', 'ลืมเขียน app.exec()', 'VS Code เลือกใช้ Python ที่ไม่ใช่ตัวใน .venv'] },
        { id: 'q9', topic: 'widget', obj: 3, q: 'widget ใดใช้ให้ผู้ใช้พิมพ์ข้อความ 1 บรรทัด', choices: ['QLineEdit', 'QLabel', 'QPushButton', 'QVBoxLayout'] },
        { id: 'q10', topic: 'widget', obj: 3, q: 'คำสั่งใดใช้อ่านข้อความที่ผู้ใช้พิมพ์ในช่อง <code>name_input</code>', choices: ['name_input.setText()', 'name_input.text()', 'name_input.show()', 'name_input.exec()'] },
        { id: 'q11', topic: 'widget', obj: 3, q: '<code>self.greet_button.clicked.connect(self.greet)</code> หมายความว่าอะไร', choices: ['ลบปุ่ม greet_button ออก', 'เรียกฟังก์ชัน greet ทันทีตอนเปิดโปรแกรม', 'เมื่อกดปุ่ม ให้เรียกฟังก์ชัน greet', 'เปลี่ยนข้อความบนปุ่มเป็น greet'] },
        { id: 'q12', topic: 'layout', obj: 3, q: '<code>QVBoxLayout</code> จัดเรียง widget อย่างไร', choices: ['จากซ้ายไปขวา', 'เป็นตารางแถวและคอลัมน์', 'ซ้อนทับกันที่มุมซ้ายบน', 'จากบนลงล่าง'] },
        { id: 'q13', topic: 'QMainWindow', obj: 3, q: 'ใน <code>QMainWindow</code> ต้องวาง widget หลักของเราด้วยคำสั่งใด', choices: ['setCentralWidget()', 'setLayout() ที่หน้าต่างหลักโดยตรง', 'addToolBar()', 'statusBar()'] },
        { id: 'q14', topic: 'prompt', obj: 3, q: 'prompt ข้อใดดีที่สุด สำหรับสั่ง AI ทำโปรแกรมทักทาย', choices: ['เขียนโปรแกรม GUI ให้หน่อย', 'ใช้ PySide6 สร้าง QMainWindow มี QLineEdit รับชื่อ ปุ่ม “ทักทาย” แสดง “สวัสดี (ชื่อ)” ถ้าช่องว่างให้เตือน และอธิบายโค้ด', 'ทำโปรแกรมเจ๋ง ๆ ให้หน่อย', 'เขียนโค้ด Python สักอัน'] },
        { id: 'q15', topic: 'Traceback', obj: 4, q: 'อ่าน Traceback ควรเริ่มดูบรรทัดใดก่อน', choices: ['บรรทัดแรก Traceback (most recent call last)', 'บรรทัดที่มีชื่อโฟลเดอร์ยาว ๆ', 'บรรทัดล่างสุด ที่บอกชนิด error และสาเหตุ', 'ไม่ต้องอ่าน คัดลอกไปให้ AI ทันที'] },
        { id: 'q16', topic: 'Traceback', obj: 4, q: '<code>ValueError: could not convert string to float: \'\'</code> เกิดจากอะไร', choices: ['ลืม import sys', 'ตั้งชื่อหน้าต่างยาวเกินไป', 'ยังไม่ได้ติดตั้ง VS Code', 'แปลงข้อความว่างเป็นตัวเลขด้วย float()'] },
        { id: 'q17', topic: 'ทดสอบ', obj: 4, q: 'เครื่องคิดเลขกฎของโอห์ม ใส่ V = 12 V และ R = 1000 Ω ควรแสดงกระแสเท่าใด', choices: ['12.00 mA', '0.012 mA', '12000 mA', '1.20 mA'] },
        { id: 'q18', topic: 'ทดสอบ', obj: 4, q: 'กรณีทดสอบใดช่วยหาบั๊ก “หารด้วยศูนย์” ในเครื่องคิดเลขกฎของโอห์ม', choices: ['V = 12, R = 1000', 'V = 12, R = 0', 'V = 5, R = 220', 'V = 3.3, R = 330'] },
        { id: 'q19', topic: 'ใช้ AI', obj: 5, q: 'ข้อใดเป็นการใช้ AI อย่างรับผิดชอบ', choices: ['ใส่รหัสผ่าน Wi-Fi ของวิทยาลัยลงใน prompt', 'ส่งโค้ดที่ AI เขียนทันทีโดยไม่รันทดสอบ', 'ทดสอบโค้ดที่ AI เขียนเอง และอธิบายได้ว่าแต่ละส่วนทำอะไร', 'ให้เพื่อนช่วยอธิบายโค้ดแทนตอนครูถาม'] },
        { id: 'q20', topic: 'ใช้ AI', obj: 5, q: 'สั่งให้ใช้ PySide6 แต่ AI ตอบโค้ดที่ <code>import</code> จาก PyQt5 ควรทำอย่างไร', choices: ['แอบติดตั้ง PyQt5 เพิ่มโดยไม่บอกใคร', 'เลิกใช้ AI ไปเลย', 'ลบบรรทัด import ทิ้งทั้งหมด', 'สั่งย้ำว่าใช้ PySide6 เท่านั้น หรือแก้ import เป็น PySide6 แล้วทดสอบใหม่'] }
    ]
};
