# lab2_greeting.py — ตัวอย่างโค้ดที่ AI ตอบ (Lab 2 โปรแกรมทักทาย หลังปรับ 2 รอบ)
import sys
from PySide6.QtWidgets import (QApplication, QMainWindow, QWidget, QLabel,
                               QLineEdit, QPushButton, QVBoxLayout)
from PySide6.QtCore import Qt


class GreetingWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("โปรแกรมทักทาย")
        self.resize(420, 260)

        # widget ทั้งหมดในหน้าต่าง
        self.ask_label = QLabel("พิมพ์ชื่อของคุณ:")
        self.name_input = QLineEdit()
        self.name_input.setPlaceholderText("เช่น สมชาย")
        self.greet_button = QPushButton("ทักทาย")
        self.result_label = QLabel("")
        self.result_label.setAlignment(Qt.AlignCenter)
        self.result_label.setStyleSheet("font-size: 24px; color: #1a7f5a;")

        # จัดเรียงจากบนลงล่าง
        layout = QVBoxLayout()
        layout.addWidget(self.ask_label)
        layout.addWidget(self.name_input)
        layout.addWidget(self.greet_button)
        layout.addWidget(self.result_label)

        central = QWidget()
        central.setLayout(layout)
        self.setCentralWidget(central)

        # กดปุ่ม หรือกด Enter ในช่องชื่อ → เรียก greet()
        self.greet_button.clicked.connect(self.greet)
        self.name_input.returnPressed.connect(self.greet)

        self.statusBar().showMessage("พร้อมใช้งาน")      # ปรับรอบ 1: status bar

    def greet(self):
        name = self.name_input.text().strip()
        if name == "":                                     # ปรับรอบ 2: ดักช่องว่าง
            self.result_label.setText("")
            self.statusBar().showMessage("⚠️ กรุณาพิมพ์ชื่อก่อน")
            return
        self.result_label.setText(f"สวัสดี {name} 👋")
        self.statusBar().showMessage("ทักทายเรียบร้อย")


if __name__ == "__main__":
    app = QApplication(sys.argv)
    window = GreetingWindow()
    window.show()
    sys.exit(app.exec())
