import sys
from PySide6.QtWidgets import QApplication, QWidget, QLabel, QVBoxLayout
from PySide6.QtCore import Qt

# ① สร้างแอป (มีได้ตัวเดียว)
app = QApplication(sys.argv)

window = QWidget()                        # ② สร้างหน้าต่างเปล่า
window.setWindowTitle("หน้าต่างแรกของฉัน")
window.resize(400, 300)                   #    กว้าง 400 สูง 300 พิกเซล

label = QLabel("สวัสดี GUI 👋")           # ③ ป้ายข้อความ (widget)
label.setAlignment(Qt.AlignCenter)        #    จัดกึ่งกลาง
label.setStyleSheet("font-size: 32px;")

layout = QVBoxLayout()                    #    ชั้นวางของแนวตั้ง
layout.addWidget(label)
window.setLayout(layout)

window.show()                             # ④ แสดงหน้าต่าง
sys.exit(app.exec())                      # ⑤ เริ่ม event loop รอผู้ใช้กด
