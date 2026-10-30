# bug2_pyqt5.py — คลินิกบั๊ก: รันแล้วพัง ลองหาสาเหตุ (AI ชอบทำพลาดแบบนี้)
import sys
from PyQt5.QtWidgets import QApplication, QWidget

app = QApplication(sys.argv)
window = QWidget()
window.setWindowTitle("บั๊กที่ 2")
window.resize(400, 300)
window.show()
sys.exit(app.exec())
