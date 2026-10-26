"""Génère les photos produits manquantes avec FLUX sur Hugging Face (quota gratuit ZeroGPU).

Usage : python tools/generate.py [ids...]
- sans numéro, génère toutes les photos absentes de images/products/
- s'arrête proprement quand le quota du jour est épuisé ; relancer le lendemain
- la clé Hugging Face est lue dans ~/.cache/huggingface/token
"""
import os, sys, time
from pathlib import Path
from gradio_client import Client
from PIL import Image
from prompts import PRODUCTS, prompt_for

SPACE = os.environ.get("SPACE", "black-forest-labs/FLUX.1-Krea-dev")
out = Path(__file__).resolve().parent.parent / "images" / "products"
out.mkdir(parents=True, exist_ok=True)
ids = [int(a) for a in sys.argv[1:]] or sorted(PRODUCTS)
token = (Path.home() / ".cache/huggingface/token").read_text().strip()
client = Client(SPACE, token=token, verbose=False)

for pid in ids:
    dest = out / f"p{pid:02d}.webp"
    if dest.exists():
        continue
    args = dict(prompt=prompt_for(pid), seed=pid * 7, randomize_seed=False,
                width=768, height=960, api_name="/infer")
    if "schnell" in SPACE:
        args["num_inference_steps"] = 4
    else:
        args.update(guidance_scale=4.5, num_inference_steps=24)
    t = time.time()
    try:
        res, _ = client.predict(**args)
    except Exception as e:
        print(f"STOP at {pid}: {e}"); break
    src = res["path"] if isinstance(res, dict) else res
    Image.open(src).convert("RGB").save(dest, "WEBP", quality=82, method=6)
    print(f"ok {dest.name} {dest.stat().st_size // 1024} KB {time.time() - t:.0f}s", flush=True)

missing = [pid for pid in sorted(PRODUCTS) if not (out / f"p{pid:02d}.webp").exists()]
print(f"{len(PRODUCTS) - len(missing)}/{len(PRODUCTS)} photos ; manquantes : {missing or 'aucune'}")
