STYLE = ("centered, the entire item visible with generous margin around it, plain warm off-white seamless studio "
         "background, soft diffused daylight from the left, subtle natural shadow, realistic fabric and stitching detail, "
         "luxury fashion e-commerce catalogue photograph, 85mm lens f/8, sharp focus, no text, no logo, no person")
GHOST = "shown on an invisible ghost mannequin, front view"
FLAT = "neatly laid flat, top-down view"
PAIR = "a pair shown at a three-quarter side angle on the floor"

PRODUCTS = {
    1:  f"a camel beige wool-blend women's trench coat, double-breasted with belt tied at the waist, {GHOST}",
    2:  f"a black flowing viscose women's midi dress with long sleeves and soft drape, {GHOST}",
    3:  f"a natural ecru linen women's midi dress with thin straps and relaxed fit, {GHOST}",
    4:  f"an ivory silk women's blouse with a soft collar and covered buttons, subtle sheen, {GHOST}",
    5:  f"a cream cashmere women's crewneck sweater, fine knit texture, slightly oversized, {GHOST}",
    6:  f"dark charcoal-brown wool women's wide-leg trousers with front pleats, {GHOST}",
    7:  f"a mustard yellow pleated women's midi skirt with sharp knife pleats, {GHOST}",
    8:  f"a raw dark blue denim women's jacket with copper buttons and chest pockets, {GHOST}",
    9:  f"a plain off-white organic cotton women's t-shirt with a round neck, {GHOST}",
    10: f"black tailored women's shorts with front pleats and belt loops, {GHOST}",
    11: f"a light sand-beige men's oxford cotton shirt with button-down collar, {GHOST}",
    12: f"a honey camel men's classic gabardine trench coat with belt and epaulettes, {GHOST}",
    13: f"a charcoal grey men's wool crewneck sweater, ribbed cuffs and hem, {GHOST}",
    14: f"tobacco brown men's cotton chino trousers, slim straight cut, {FLAT}",
    15: f"a plain off-white organic cotton men's t-shirt, heavy jersey, {GHOST}",
    16: f"a brown herringbone wool men's tailored blazer with notch lapels, {GHOST}",
    17: f"a heather grey men's cotton hooded sweatshirt with kangaroo pocket and drawstrings, {GHOST}",
    18: f"indigo blue men's straight-leg selvedge jeans, {FLAT}",
    19: f"sand beige men's linen drawstring shorts, {FLAT}",
    20: f"a sunny yellow children's cotton t-shirt, small size, {FLAT}",
    21: f"a sky blue children's hooded sweatshirt, small size, {FLAT}",
    22: f"a pastel pink girls' cotton dress with ruffled sleeves and tiered skirt, small size, {FLAT}",
    23: f"olive green children's corduroy trousers with elastic waist, small size, {FLAT}",
    24: f"brown leather men's penny loafers, polished calfskin, {PAIR}",
    25: f"cream canvas low-top sneakers with white rubber soles and cotton laces, {PAIR}",
    26: f"black smooth leather Chelsea ankle boots with elastic side panels, {PAIR}",
    27: f"cognac brown leather derby shoes with leather soles, {PAIR}",
    28: f"a chocolate brown wool scarf with fringed ends, loosely folded, top-down view",
    29: f"a black wool baseball cap with a curved brim, three-quarter view, standing",
    30: f"a beige cotton canvas baseball cap with a curved brim, three-quarter view, standing",
    31: f"a soft grey ribbed merino wool beanie with a folded cuff, standing",
    32: f"a camel cashmere stole draped in soft folds, top-down view",
    33: f"a brown grained leather tote bag with two long handles, standing upright, front view",
    34: f"a black quilted leather clutch bag with a thin gold chain, standing upright, front view",
}

def prompt_for(pid):
    return "Product photo: " + PRODUCTS[pid] + ", " + STYLE
