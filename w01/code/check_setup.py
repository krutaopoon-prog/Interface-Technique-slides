# check_setup.py — ตรวจว่าเครื่องพร้อมเรียนวิชาเทคนิคการอินเตอร์เฟซหรือยัง
# วิธีใช้: เปิดไฟล์นี้ใน VS Code แล้วกด ▶ (Run Python File)
import sys

print("Python เวอร์ชัน:", sys.version.split()[0])
print("ไฟล์ python ที่ใช้อยู่:", sys.executable)

try:
    import PySide6
    from PySide6.QtWidgets import QApplication, QLabel
except ImportError:
    print("❌ ยังไม่มี PySide6 → เปิด venv แล้วพิมพ์: pip install PySide6-Essentials")
    sys.exit(1)

print("PySide6 เวอร์ชัน:", PySide6.__version__)

app = QApplication(sys.argv)
label = QLabel("✅ เครื่องพร้อมแล้ว!\nปิดหน้าต่างนี้ได้เลย")
label.setWindowTitle("ตรวจเครื่อง")
label.setStyleSheet("font-size: 28px; padding: 30px;")
label.show()
print("✅ ถ้าเห็นหน้าต่างเด้งขึ้นมา แปลว่าพร้อมเรียนแล้ว")
sys.exit(app.exec())
