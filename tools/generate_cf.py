"""Génère les photos produits manquantes avec FLUX.2 Klein sur Cloudflare Workers AI (offre gratuite).

Usage : python tools/generate_cf.py [ids...]
- sans numéro, génère toutes les photos absentes de images/products/
- l'Account ID et la clé sont lus dans ~/.cloudflare/workers-ai (voir save-cloudflare-key.ps1)
- variable MODEL pour changer de modèle (par défaut @cf/black-forest-labs/flux-2-klein-4b)
"""
import base64, io, os, sys, time
from pathlib import Path
import httpx
from PIL import Image
from prompts import PRODUCTS, prompt_for

MODEL = os.environ.get("MODEL", "@cf/black-forest-labs/flux-2-klein-4b")
out = Path(__file__).resolve().parent.parent / "images" / "products"
out.mkdir(parents=True, exist_ok=True)
ids = [int(a) for a in sys.argv[1:]] or sorted(PRODUCTS)
account, token = (Path.home() / ".cloudflare" / "workers-ai").read_text().split()
url = f"https://api.cloudflare.com/client/v4/accounts/{account}/ai/run/{MODEL}"
headers = {"Authorization": f"Bearer {token}"}

for pid in ids:
    dest = out / f"p{pid:02d}.webp"
    if dest.exists():
        continue
    fields = {"prompt": prompt_for(pid), "width": "768", "height": "960", "seed": str(pid * 7)}
    t = time.time()
    r = None
    for attempt in range(4):  # le service répond parfois trop lentement (408, 5xx) : on retente
        try:
            r = httpx.post(url, headers=headers, files={k: (None, v) for k, v in fields.items()}, timeout=300)
            if r.status_code not in (408, 429) and r.status_code < 500:
                break
        except httpx.TimeoutException:
            pass
        print(f"  pas de réponse pour {pid}, nouvel essai…", flush=True)
        time.sleep(10)
    if r is None:
        print(f"STOP at {pid}: pas de réponse après 4 essais"); break
    data = r.json() if r.headers.get("content-type", "").startswith("application/json") else {}
    if r.status_code != 200 or not data.get("success"):
        print(f"STOP at {pid}: HTTP {r.status_code} {data.get('errors') or r.text[:300]}"); break
    img = Image.open(io.BytesIO(base64.b64decode(data["result"]["image"])))
    img.convert("RGB").save(dest, "WEBP", quality=82, method=6)
    print(f"ok {dest.name} {img.size} {dest.stat().st_size // 1024} KB {time.time() - t:.0f}s", flush=True)

missing = [pid for pid in sorted(PRODUCTS) if not (out / f"p{pid:02d}.webp").exists()]
print(f"{len(PRODUCTS) - len(missing)}/{len(PRODUCTS)} photos ; manquantes : {missing or 'aucune'}")
