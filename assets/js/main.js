/* =========================================================================
   Yael Bulik — Interaktionen
   Ohne Bibliotheken. Läuft auch per Doppelklick auf die HTML-Datei.

   archiv()     Arbeiten-Seite: gruppierte Liste, Bild erscheint beim Hovern
   detail()     Detailseite arbeit.html?p=<slug>
   entwickeln() Moment „picture-develops“: Hauptfoto entwickelt sich einmal
   woerter()    Moment „word-highlight“: Aussage wird Wort für Wort dunkel
   ========================================================================= */
(() => {
  'use strict';

  const ruhig = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const feinerZeiger = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const PROJEKTE = window.PROJEKTE || [];
  const KATEGORIE = { mode: 'Mode', kunst: 'Kunst', objekt: 'Objekt' };
  const GRUPPE = { mode: 'Mode', kunst: 'Kunst', objekt: 'Objekte' };

  /* Hilfen ------------------------------------------------------------- */
  const $ = (sel, el = document) => el.querySelector(sel);
  const $$ = (sel, el = document) => [...el.querySelectorAll(sel)];
  const esc = (wert = '') => String(wert).replace(/[&<>"']/g, (z) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[z]
  ));
  const link = (p) => `arbeit.html?p=${encodeURIComponent(p.slug)}`;

  // Bildfeld: Foto, falls vorhanden – sonst ein CSS-Platzhalter
  function bildfeld({ muster = 'leinen', bild, alt = '', zoom = 1, format, laden = 'lazy' } = {}) {
    const stil = format ? ` style="--format:${format}"` : '';
    const a11y = alt ? `role="img" aria-label="${esc(alt)}"` : 'aria-hidden="true"';
    const innen = bild
      ? `<img src="${esc(bild)}" alt="${esc(alt)}" loading="${laden}" decoding="async" style="--zoom:${zoom}">`
      : `<div class="bildfeld__muster muster--${esc(muster)}" style="--zoom:${zoom}" ${a11y}></div>`;
    return `<div class="bildfeld"${stil}>${innen}</div>`;
  }

  // Ladezustand: Fläche bleibt sichtbar, bis das Foto da ist
  function ladezustand(wurzel) {
    $$('img', wurzel).forEach((img) => {
      const fertig = () => img.classList.add('ist-geladen');
      if (img.complete && img.naturalWidth) fertig();
      else {
        img.addEventListener('load', fertig, { once: true });
        img.addEventListener('error', fertig, { once: true });
      }
    });
  }


  /* Arbeiten-Seite ----------------------------------------------------- */
  function archiv() {
    const wurzel = $('[data-archiv]');
    if (!wurzel || !PROJEKTE.length) return;

    const listen = $('[data-listen]', wurzel);
    const rahmen = $('[data-bild]', wurzel);

    listen.innerHTML = Object.keys(GRUPPE).map((kat) => {
      const eintraege = PROJEKTE
        .map((p, i) => ({ p, i }))
        .filter(({ p }) => p.kategorie === kat);
      if (!eintraege.length) return '';
      return `
        <section class="gruppe" aria-labelledby="gruppe-${kat}">
          <h2 class="rubrik" id="gruppe-${kat}">${GRUPPE[kat]}</h2>
          <ul>
            ${eintraege.map(({ p, i }) => `
              <li><a class="eintrag" href="${link(p)}" data-i="${i}">${esc(p.titel)}<span class="eintrag__zusatz">${esc(p.jahr)}</span></a></li>`).join('')}
          </ul>
        </section>`;
    }).join('');

    // Bild nur mit Maus – auf dem Handy führt ein Tipp direkt zur Arbeit
    if (!rahmen || !feinerZeiger) return;

    rahmen.innerHTML = PROJEKTE.map((p) => `<div class="medienrahmen__foto">${bildfeld({ muster: p.muster, bild: p.bild, laden: 'eager' })}</div>`).join('');
    ladezustand(rahmen);

    const fotos = $$('.medienrahmen__foto', rahmen);
    let aktiv = -1;

    const zeigen = (i) => {
      if (aktiv !== -1) fotos[aktiv].classList.remove('ist-aktiv');
      aktiv = i;
      fotos[i].classList.add('ist-aktiv');
      rahmen.classList.add('ist-sichtbar');
    };
    const verstecken = () => rahmen.classList.remove('ist-sichtbar');
    const eintrag = (e) => e.target.closest('a[data-i]');

    listen.addEventListener('pointerover', (e) => {
      const a = eintrag(e);
      if (a) zeigen(Number(a.dataset.i));
      else verstecken();
    });
    listen.addEventListener('pointerleave', verstecken);
    listen.addEventListener('focusin', (e) => { const a = eintrag(e); if (a) zeigen(Number(a.dataset.i)); });
    listen.addEventListener('focusout', verstecken);
  }


  /* Detailseite – in Bildschirmen:
     1 Titel + Hauptfoto (entwickelt sich)  2 Text + Detailfoto
     3 Galerie in einer Reihe               4 vorherige / nächste       */
  function detail() {
    const wurzel = $('[data-arbeit]');
    if (!wurzel) return;

    const slug = new URLSearchParams(location.search).get('p');
    const i = PROJEKTE.findIndex((p) => p.slug === slug);

    if (i === -1) {
      wurzel.innerHTML = `
        <div class="seite">
          <a class="arbeit__zurueck" href="arbeiten.html">← Alle Arbeiten</a>
          <h1 class="titel">Diese Arbeit gibt es nicht.</h1>
        </div>`;
      return;
    }

    const p = PROJEKTE[i];
    const vor = PROJEKTE[(i - 1 + PROJEKTE.length) % PROJEKTE.length];
    const nach = PROJEKTE[(i + 1) % PROJEKTE.length];
    // Ohne eigene Bilderliste: fünf Platzhalter-Ausschnitte desselben Musters
    const bilder = p.bilder && p.bilder.length ? p.bilder : [
      { zoom: 1, text: 'Gesamtansicht' },
      { zoom: 2.4, text: 'Detail' },
      { zoom: 1.3, text: 'Rückseite' },
      { zoom: 1.8, text: 'Ausschnitt' },
      { zoom: 3, text: 'Material' }
    ];
    const [erstes, zweites, ...rest] = bilder;
    const meta = [KATEGORIE[p.kategorie], p.art, p.jahr].filter(Boolean).map(esc).join(' · ');

    // Bildbeschreibungen nur im alt-Text – keine Bildunterschriften
    const feld = (b) => bildfeld({ muster: b.muster || p.muster, bild: b.bild, alt: `${p.titel}, ${b.text || ''}`, zoom: b.zoom || 1 });
    const fester = (b, extra = '') => `
      <div class="zweiteilig__medien zweiteilig__medien--immer">
        <figure class="medienrahmen medienrahmen--fest"${extra}>${feld(b)}</figure>
      </div>`;

    document.title = `${p.titel} — Yael Bulik`;

    wurzel.innerHTML = `
      <section class="zweiteilig" aria-labelledby="arbeit-titel">
        <div>
          <a class="arbeit__zurueck" href="arbeiten.html">← Alle Arbeiten</a>
          <header class="arbeit__kopf">
            <h1 class="titel" id="arbeit-titel">${esc(p.titel)}</h1>
            <p class="arbeit__meta">${meta}</p>
          </header>
          <p class="lead">${esc(p.kurz)}</p>
        </div>
        ${fester(erstes, ' data-entwickeln')}
      </section>

      ${zweites ? `
      <section class="zweiteilig" aria-label="Über die Arbeit">
        <div>
          <div class="arbeit__text">
            ${[].concat(p.text || []).map((t) => `<p>${esc(t)}</p>`).join('')}
          </div>
          <dl class="angaben">
            <div><dt class="rubrik">Material</dt><dd>${esc(p.material)}</dd></div>
            ${p.masse ? `<div><dt class="rubrik">Maße</dt><dd>${esc(p.masse)}</dd></div>` : ''}
          </dl>
        </div>
        ${fester(zweites)}
      </section>` : ''}

      <div class="seite">
        ${rest.length ? `<div class="raster12 galerie">${rest.map((b) => `<figure>${feld(b)}</figure>`).join('')}</div>` : ''}
        <nav class="weiter" aria-label="Weitere Arbeiten">
          <a href="${link(vor)}" rel="prev">← ${esc(vor.titel)}</a>
          <a href="${link(nach)}" rel="next">${esc(nach.titel)} →</a>
        </nav>
      </div>`;

    ladezustand(wurzel);
  }


  /* Moment „picture-develops“ ------------------------------------------ */
  function entwickeln() {
    const bilder = $$('[data-entwickeln]');
    if (!bilder.length) return;
    if (ruhig || !('IntersectionObserver' in window)) {
      bilder.forEach((el) => el.classList.add('ist-entwickelt'));
      return;
    }
    const beobachter = new IntersectionObserver((eintraege) => {
      eintraege.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add('ist-entwickelt');
        beobachter.unobserve(e.target);
      });
    }, { threshold: 0.35 });
    bilder.forEach((el) => beobachter.observe(el));
    // Sicherheitsnetz: kein Bild bleibt grau, falls der Beobachter nicht auslöst
    setTimeout(() => {
      bilder.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < innerHeight && r.bottom > 0) el.classList.add('ist-entwickelt');
      });
    }, 1500);
  }


  /* Moment „word-highlight“ --------------------------------------------
     Jedes Wort wird dunkel, sobald es die Bildschirmmitte kreuzt, und
     wieder hell auf dem Weg nach oben. Das <em>-Wort wird rot.           */
  function woerter() {
    if (ruhig) return;
    $$('[data-woerter]').forEach((satz) => {
      const teile = [];
      satz.childNodes.forEach((knoten) => {
        if (knoten.nodeType === Node.TEXT_NODE) {
          knoten.textContent.split(/(\s+)/).forEach((t) => {
            if (!t) return;
            teile.push(/^\s+$/.test(t) ? t : `<span class="wort">${esc(t)}</span>`);
          });
        } else {
          teile.push(`<span class="wort wort--akzent">${esc(knoten.textContent)}</span>`);
        }
      });
      satz.innerHTML = teile.join('');
      satz.classList.add('ist-gestuft');

      const liste = $$('.wort', satz);
      let geplant = false;
      const stellen = () => {
        geplant = false;
        const mitte = innerHeight / 2;
        liste.forEach((w) => w.classList.toggle('ist-tinte', w.getBoundingClientRect().top < mitte));
      };
      const anfordern = () => {
        if (geplant) return;
        geplant = true;
        requestAnimationFrame(stellen);
      };
      stellen();
      addEventListener('scroll', anfordern, { passive: true });
      addEventListener('resize', anfordern);
    });
  }


  /* Los geht's --------------------------------------------------------- */
  $$('[data-jahr]').forEach((el) => { el.textContent = new Date().getFullYear(); });
  archiv();
  detail();
  entwickeln();
  woerter();
})();
