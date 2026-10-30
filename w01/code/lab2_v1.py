import sys
from PySide6.QtWidgets import (QApplication, QMainWindow,
    QWidget, QLabel, QLineEdit, QPushButton, QVBoxLayout)

class GreetingWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("โปรแกรมทักทาย")
        self.ask_label = QLabel("พิมพ์ชื่อของคุณ:")
        self.name_input = QLineEdit()
        self.greet_button = QPushButton("ทักทาย")
        self.result_label = QLabel("")

        layout = QVBoxLayout()
        layout.addWidget(self.ask_label)
        layout.addWidget(self.name_input)
        layout.addWidget(self.greet_button)
        layout.addWidget(self.result_label)
        central = QWidget()
        central.setLayout(layout)
        self.setCentralWidget(central)

        self.greet_button.clicked.connect(self.greet)

    def greet(self):
        name = self.name_input.text()
        self.result_label.setText(f"สวัสดี {name} 👋")

app = QApplication(sys.argv)
window = GreetingWindow()
window.show()
sys.exit(app.exec())
