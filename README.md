# Maison Atelier — Boutique de vêtements

Site vitrine d'une boutique de vêtements, inspiré des codes des grandes maisons (Dior, Louis Vuitton, Nike, Adidas). Les clients choisissent leurs articles, remplissent un panier et envoient leur commande sur WhatsApp. Il n'y a pas de paiement en ligne.

## Voir le site

Ouvrir `index.html` dans un navigateur. Aucune installation n'est nécessaire. Une connexion Internet est requise pour les polices, les photos (Unsplash) et les animations (GSAP).

## Fichiers

| Fichier | Rôle |
|---|---|
| `index.html` | Structure de la page |
| `style.css` | Design (couleurs, typographie, mise en page) |
| `app.js` | Catalogue, panier, favoris, recherche, commande WhatsApp |
| `animations.js` | Animations GSAP (le site fonctionne aussi sans) |
| `references/NOTES.md` | Analyse des sites de grandes marques utilisés comme inspiration |

## À personnaliser (en haut de `app.js`)

- `WHATSAPP_NUMBER` : votre numéro au format international, sans `+` ni espaces. Le numéro actuel est factice.
- `SHOP_NAME` : le nom de la boutique.
- `PRODUCTS` : la liste des articles (nom, catégorie, prix, couleurs).

## Crédits

- Photographies : [Unsplash](https://unsplash.com) (licence Unsplash).
- Animations : [GSAP](https://gsap.com) 3.13 (ScrollTrigger, SplitText).
- Polices : Cormorant et Montserrat (Google Fonts).
