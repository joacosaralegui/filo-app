#!/usr/bin/env python3
"""Genera los PNG del ícono (libro golden sobre parchment) para la PWA.
Salida: public/icons/*.png  ·  Requiere Pillow."""
import os
from PIL import Image, ImageDraw

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.normpath(os.path.join(HERE, "..", "public", "icons"))
os.makedirs(OUT, exist_ok=True)

SS = 4  # supersampling
PARCH = (245, 244, 237, 255)
GOLD = (111, 112, 5, 255)   # --accent-ink
PAGE = (255, 253, 247, 255)

# geometría del libro en base 512
SPINE_T = (256, 152)
SPINE_B = (256, 372)
L_T, L_B = (78, 180), (78, 348)
R_T, R_B = (434, 180), (434, 348)
TEXT_Y = [206, 236, 266, 296]


def scaled(points, k, cx=256, cy=262):
    return [((x - cx) * k + cx, (y - cy) * k + cy) for (x, y) in points]


def draw_book(d, k):
    def P(pts):
        return [(x * SS, y * SS) for (x, y) in scaled(pts, k)]

    pageL = P([SPINE_T, L_T, L_B, SPINE_B])
    pageR = P([SPINE_T, R_T, R_B, SPINE_B])
    d.polygon(pageL, fill=PAGE)
    d.polygon(pageR, fill=PAGE)
    lw = int(15 * SS)
    d.line(pageL + [pageL[0]], fill=GOLD, width=lw, joint="curve")
    d.line(pageR + [pageR[0]], fill=GOLD, width=lw, joint="curve")
    d.line(P([SPINE_T, SPINE_B]), fill=GOLD, width=lw, joint="curve")
    tw = int(11 * SS)
    for i, y in enumerate(TEXT_Y):
        short = 12 if i == len(TEXT_Y) - 1 else 0
        d.line(P([(104 + short, y), (224, y)]), fill=GOLD, width=tw)
        d.line(P([(288, y), (408 - short, y)]), fill=GOLD, width=tw)


def make(size, mode):
    """mode: 'round' (esquinas redondeadas, transp), 'full' (cuadrado lleno),
    'mask' (lleno, libro más chico para el safe-zone de Android)."""
    W = size * SS
    img = Image.new("RGBA", (W, W), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    if mode == "round":
        d.rounded_rectangle([0, 0, W - 1, W - 1], radius=int(0.18 * W), fill=PARCH)
    else:
        d.rectangle([0, 0, W, W], fill=PARCH)
    draw_book(d, k=0.78 if mode == "mask" else 0.98)
    return img.resize((size, size), Image.LANCZOS)


make(192, "round").save(os.path.join(OUT, "icon-192.png"))
make(512, "round").save(os.path.join(OUT, "icon-512.png"))
make(512, "mask").save(os.path.join(OUT, "icon-maskable.png"))
make(180, "full").save(os.path.join(OUT, "apple-touch-icon.png"))
print("iconos generados en", OUT)
