"""Erzeugt aus assets/img/start.jpg die kleineren Startfoto-Dateien für die Startseite.

Neues Startfoto: Datei assets/img/start.jpg austauschen (am besten 2000 × 1500 px,
Querformat 4:3), dann im Projektordner ausführen:

    python3 tools/startfoto.py

Braucht Pillow:  pip3 install pillow
"""
from pathlib import Path
from PIL import Image

img = Path(__file__).resolve().parent.parent / "assets" / "img"
quelle = Image.open(img / "start.jpg").convert("RGB")

for w in (800, 1200, 1600, 2000):
    h = round(quelle.height * w / quelle.width)
    k = quelle if w == quelle.width else quelle.resize((w, h), Image.LANCZOS)
    k.save(img / f"start-{w}.avif", quality=52, speed=4)
    k.save(img / f"start-{w}.webp", quality=74, method=6)
    if w == 1600:
        k.save(img / "start-1600.jpg", quality=76, optimize=True, progressive=True)

# Hochformat-Ausschnitt (2:3, mittig) für Handys
b = round(quelle.height * 2 / 3)
x0 = (quelle.width - b) // 2
hoch = quelle.crop((x0, 0, x0 + b, quelle.height))
for w in (600, 1000):
    h = round(hoch.height * w / hoch.width)
    k = hoch if w == hoch.width else hoch.resize((w, h), Image.LANCZOS)
    k.save(img / f"start-hoch-{w}.avif", quality=52, speed=4)
    k.save(img / f"start-hoch-{w}.webp", quality=74, method=6)
print("fertig")
