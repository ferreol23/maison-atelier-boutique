# Références grandes marques (captures du 23/10/2026)

Captures prises pour s'inspirer des codes de mise en page, pas pour copier : aucun logo, aucune image ni aucun texte de ces marques ne doit être repris sur le site.

## Dior (dior-accueil-split.jpg, dior-mode-hero.jpg, dior-mode-campagne.jpg)
- Accueil en écran partagé 50/50 plein cadre, logo serif centré par-dessus. Au survol, une moitié s'éclaire et l'autre s'assombrit.
- En-tête transparent sur l'image (logo et icônes en blanc), qui devient opaque au défilement.
- Sections de campagne en plein écran empilées. Chacune porte une petite surtitre (« Croisière 2027 Femme »), un titre serif et un lien souligné « Découvrir la collection », centrés en bas de l'image.
- Entre deux images : un grand espace blanc avec une phrase centrée et un lien souligné.

## Louis Vuitton (louis-vuitton-hero.jpg)
- Vidéo plein écran, logo en capitales fines centré, « Menu » et recherche à gauche, icônes à droite.
- Surtitre « NOUVELLE COLLECTION », titre court, puis deux liens soulignés côte à côte (Femme / Homme).
- Phrase d'introduction centrée en grand sous le hero.

## Nike (nike-hero.jpg, nike-cartes-duo.jpg)
- Barre de navigation blanche très simple : logo à gauche, catégories centrées, recherche, favoris et panier à droite.
- Hero plein cadre : surtitre en capitales (« TRAVAILLE TOUT »), une phrase, deux boutons en pilule blancs (« Acheter », « En savoir plus »).
- Duo de grandes cartes côte à côte, avec texte en bas à gauche sur l'image (surtitre, titre, bouton pilule blanc).

## Adidas (adidas-hero-triptyque.jpg, adidas-carrousel-produits.jpg)
- Bandeau noir d'info en haut, puis un bandeau gris clair avec un message et une flèche.
- Hero en triptyque : trois panneaux d'image côte à côte, étiquette noire en capitales et bouton « Acheter → ».
- Titres de section en capitales grasses et condensées, avec un lien « Acheter » souligné à droite.
- Carrousel horizontal de produits à défilement libre (prix au-dessus du nom, cœur en haut à droite).

## Animations GSAP prévues (à valider avec ui-ux-pro-max, domaine `gsap`)
- Hero : titre révélé ligne par ligne (SplitText) et image en léger zoom arrière.
- En-tête : transparent puis opaque au défilement (ScrollTrigger).
- Images de campagne : parallaxe douce.
- « Nouveautés » : carrousel horizontal épinglé au défilement.
- Grille produits : apparition échelonnée.
- Tout désactivé si l'utilisateur a choisi « réduire les animations ».
