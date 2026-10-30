# bug3_typo.py — คลินิกบั๊ก: รันแล้วพัง ลองหาสาเหตุ
import sys
from PySide6.QtWidgets import QApplication, QWidget

app = QApplication(sys.argv)
window = QWidget()
window.setWindowTittle("บั๊กที่ 3")
window.resize(400, 300)
window.show()
sys.exit(app.exec())
