# bug4_number.py — คลินิกบั๊ก: เปิดได้ แต่กดปุ่มตอนช่องว่าง แล้วดูข้อความสีแดงใน Terminal
import sys
from PySide6.QtWidgets import (QApplication, QWidget, QLabel, QLineEdit,
                               QPushButton, QVBoxLayout)


class Doubler(QWidget):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("บั๊กที่ 4: คูณสอง")
        self.number_input = QLineEdit()
        self.number_input.setPlaceholderText("พิมพ์ตัวเลข")
        self.button = QPushButton("คูณ 2")
        self.result_label = QLabel("ผลลัพธ์: -")
        layout = QVBoxLayout(self)
        layout.addWidget(self.number_input)
        layout.addWidget(self.button)
        layout.addWidget(self.result_label)
        self.button.clicked.connect(self.double)

    def double(self):
        x = float(self.number_input.text())
        self.result_label.setText(f"ผลลัพธ์: {x * 2}")


if __name__ == "__main__":
    app = QApplication(sys.argv)
    w = Doubler()
    w.show()
    sys.exit(app.exec())
