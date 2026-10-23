// =========================================================
// MAISON ATELIER — Animations GSAP 3.13 (ScrollTrigger + SplitText)
// Presets issus de ui-ux-pro-max (domaine « gsap ») :
// - titres courts seulement en SplitText, revert au nettoyage
// - 1 seule section épinglée (Nouveautés), uniquement sur grand écran
// - parallaxe douce (5–15 %) sur les images, jamais sur le texte
// - rien n'est masqué sans JavaScript ; tout est coupé si l'utilisateur
//   a choisi de réduire les animations (gsap.matchMedia)
// =========================================================
(function () {
  if (!window.gsap || !window.ScrollTrigger) return; // CDN indisponible : le site reste complet, sans animation

  const hasSplit = Boolean(window.SplitText);
  gsap.registerPlugin(ScrollTrigger);
  if (hasSplit) gsap.registerPlugin(SplitText);

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const fontsReady = document.fonts ? document.fonts.ready : Promise.resolve();

  const mm = gsap.matchMedia();

  mm.add({
    motion: "(prefers-reduced-motion: no-preference)",
    desktop: "(min-width: 901px)",
  }, (ctx) => {
    const { motion, desktop } = ctx.conditions;
    window.maAnim = {};
    if (!motion) return; // mouvement réduit : état final immédiat

    const splits = [];

    // ---------- 1. Hero : zoom arrière + titre révélé mot à mot ----------
    const heroTitle = $(".hero-title");
    gsap.set(heroTitle, { autoAlpha: 0 });

    const intro = gsap.timeline({ defaults: { ease: "expo.out" } });
    intro
      .from(".hero-media img", { scale: 1.18, duration: 2.6 }, 0)
      // opacity (et non autoAlpha) : en-tête et liens restent atteignables au clavier pendant l'intro
      .from("#masthead", { opacity: 0, duration: 1.2 }, 0.3)
      .from("[data-hero='eyebrow']", { opacity: 0, y: 16, duration: 1 }, 0.5)
      .from("[data-hero='links'] > *", { opacity: 0, y: 16, duration: 1, stagger: 0.1 }, 1.1)
      .from("[data-hero='cue']", { opacity: 0, duration: 1 }, 1.4);

    fontsReady.then(() => {
      gsap.set(heroTitle, { autoAlpha: 1 });
      if (!hasSplit) { gsap.from(heroTitle, { autoAlpha: 0, y: 30, duration: 1.2, ease: "expo.out" }); return; }
      const split = SplitText.create(heroTitle, { type: "lines,words", mask: "lines" });
      splits.push(split);
      gsap.from(split.words, { yPercent: 110, duration: 1.3, stagger: 0.08, ease: "expo.out", delay: 0.2 });
    });

    // Au défilement : l'image glisse (parallaxe), le texte s'efface
    gsap.to(".hero-media", {
      yPercent: 12, ease: "none",
      scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
    });
    gsap.to(".hero-content, .scroll-cue", {
      autoAlpha: 0, y: -40, ease: "none",
      scrollTrigger: { trigger: ".hero", start: "top top", end: "60% top", scrub: true },
    });

    // ---------- 2. Manifeste : les mots s'éclairent au défilement ----------
    fontsReady.then(() => {
      const text = $("[data-words]");
      if (!text) return;
      const targets = hasSplit ? (splits[splits.push(SplitText.create(text, { type: "words" })) - 1]).words : [text];
      gsap.fromTo(targets, { opacity: 0.14 }, {
        opacity: 1, ease: "none", stagger: 0.1,
        scrollTrigger: { trigger: text, start: "top 80%", end: "bottom 45%", scrub: true },
      });
      ScrollTrigger.refresh();
    });

    // ---------- 3. Apparitions simples ----------
    $$("[data-reveal]").forEach((el) => {
      gsap.from(el, {
        autoAlpha: 0, y: el.classList.contains("duo-card") ? 60 : 24,
        duration: 1.1, ease: "expo.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
    });

    // ---------- 4. Triptyque : rideaux qui se lèvent ----------
    gsap.timeline({ scrollTrigger: { trigger: ".triptych", start: "top 78%", once: true } })
      .from(".panel", { clipPath: "inset(100% 0% 0% 0%)", duration: 1.5, ease: "expo.out", stagger: 0.14 }, 0)
      .from(".panel-media", { scale: 1.3, duration: 1.8, ease: "expo.out", stagger: 0.14 }, 0)
      .from(".panel-label", { autoAlpha: 0, y: 20, duration: 0.9, ease: "expo.out", stagger: 0.14 }, 0.6);

    // ---------- 5. Nouveautés : défilement horizontal épinglé (grand écran) ----------
    if (desktop) {
      const section = $(".news");
      const vp = $("#news-viewport");
      const track = $("#news-track");
      const bar = $("#news-progress-bar");
      section.classList.add("is-pinned");
      vp.scrollLeft = 0;

      const distance = () => {
        const pad = parseFloat(getComputedStyle(vp).paddingLeft) || 0;
        return Math.max(0, track.scrollWidth - (vp.clientWidth - pad * 2));
      };

      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => "+=" + distance(),
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => { bar.style.transform = "scaleX(" + self.progress + ")"; },
        },
      });

      // Clavier : une carte qui reçoit le focus est ramenée à l'écran
      const onFocus = (e) => {
        const item = e.target.closest(".news-track > li");
        const st = tween.scrollTrigger;
        if (!item || !st) return;
        const ratio = Math.min(1, item.offsetLeft / Math.max(1, track.scrollWidth - item.offsetWidth));
        window.scrollTo({ top: st.start + (st.end - st.start) * ratio, behavior: "auto" });
      };
      track.addEventListener("focusin", onFocus);

      ctx.add(() => () => {
        track.removeEventListener("focusin", onFocus);
        section.classList.remove("is-pinned");
        bar.style.transform = "";
      });
    }

    // ---------- 6. Campagne : parallaxe douce ----------
    gsap.fromTo(".campaign-media", { yPercent: -6 }, {
      yPercent: 6, ease: "none",
      scrollTrigger: { trigger: ".campaign", start: "top bottom", end: "bottom top", scrub: true },
    });

    // ---------- 7. Grille produits : apparition par vagues ----------
    let gridTriggers = [];
    function animateGrid(gridEl) {
      gridTriggers.forEach((t) => t.kill());
      gridTriggers = [];
      const cards = $$(".card", gridEl);
      if (cards.length) {
        gsap.set(cards, { autoAlpha: 0, y: 24 });
        gridTriggers = ScrollTrigger.batch(cards, {
          start: "top 92%",
          once: true,
          onEnter: (batch) => gsap.to(batch, {
            autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.05, ease: "back.out(1.4)", overwrite: true,
          }),
        });
      }
      // La hauteur de la grille change avec les filtres : les sections suivantes
      // (services, newsletter) doivent recalculer leur point de déclenchement
      ScrollTrigger.refresh();
    }
    animateGrid($("#grid"));

    // ---------- 8. En-tête : se cache en descendant, revient en remontant ----------
    const masthead = $("#masthead");
    let hidden = false;
    const showHeader = (show) => {
      if (show === !hidden) return;
      hidden = !show;
      gsap.to(masthead, { yPercent: show ? 0 : -100, duration: 0.45, ease: "power2.out", overwrite: "auto" });
    };
    ScrollTrigger.create({
      start: 0, end: "max",
      onUpdate: (self) => {
        if (window.scrollY < window.innerHeight * 0.6) showHeader(true);
        else showHeader(self.direction === -1);
      },
    });
    const onHeaderFocus = () => showHeader(true);
    masthead.addEventListener("focusin", onHeaderFocus);

    // ---------- Points d'accroche utilisés par app.js ----------
    window.maAnim = {
      grid: animateGrid,
      menu: (panel) => gsap.from($$(".menu-nav a", panel), {
        yPercent: 60, autoAlpha: 0, duration: 0.9, stagger: 0.05, ease: "expo.out", delay: 0.2,
      }),
      bump: (el) => el && gsap.fromTo(el, { scale: 1.45 }, { scale: 1, duration: 0.5, ease: "back.out(3)" }),
    };

    // Les images et polices changent les hauteurs : on recalcule les déclencheurs
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);

    return () => {
      splits.forEach((s) => s.revert());
      gridTriggers.forEach((t) => t.kill());
      masthead.removeEventListener("focusin", onHeaderFocus);
      window.removeEventListener("load", refresh);
      gsap.set(masthead, { clearProps: "transform" });
      window.maAnim = {};
    };
  });
})();
