/* =========================================================================
   PROJEKTE — die einzige Stelle, an der Arbeiten gepflegt werden.
   Arbeiten-Seite und Detailseite lesen von hier.
   Neue Arbeit = einen Eintrag kopieren und anpassen.

   Felder
   slug       eindeutig, klein, ohne Leerzeichen → arbeit.html?p=<slug>
   nr         Werknummer (frei wählbar)
   kategorie  'mode' | 'kunst' | 'objekt'
   art        Art der Arbeit, z. B. 'Abendkleid' – steht auf der Detailseite
   muster     Stoff-Platzhalter, solange es kein Foto gibt:
              samt, hahnentritt, vichy, nadelstreifen, cord, denim,
              farbfeld, punkte, glencheck, seide, zickzack, leinen
   bild       Titelfoto, z. B. 'assets/img/nachtfalter.jpg'
              → sobald gesetzt, ersetzt es die Stoffprobe
   bilder     optional, Galerie auf der Detailseite:
              [{ bild: 'assets/img/x.jpg', text: 'Bildunterschrift' }, …]
              ohne `bild` wird ein Muster gezeigt ({ muster, zoom, text })
   ========================================================================= */

window.PROJEKTE = [
  {
    slug: 'nachtfalter', nr: '001', titel: 'Nachtfalter', kategorie: 'mode', jahr: 2026,
    art: 'Abendkleid',
    material: 'Seidensamt, Rosshaar', masse: 'Gr. 36 · Länge 142 cm', muster: 'samt',
    kurz: 'Ein Abendkleid, das erst im Dunkeln Farbe bekennt.',
    text: [
      'Seidensamt schluckt das Licht und gibt es nur an den Kanten zurück – wie Staub auf Flügeln.',
      'Platzhalter: Entstehung, Anlass, Credits (Foto, Model, Styling).'
    ],
    bild: null,
    bilder: [
      { muster: 'samt', zoom: 1, text: 'Gesamtansicht' },
      { muster: 'seide', zoom: 1.2, text: 'Futter aus Seidensatin' },
      { muster: 'samt', zoom: 2.6, text: 'Detail Saum' },
      { muster: 'leinen', zoom: 1, text: 'Erster Entwurf' },
      { muster: 'zickzack', zoom: 1.4, text: 'Rückseite' }
    ]
  },
  {
    slug: 'konfetti-danach', nr: '002', titel: 'Konfetti danach', kategorie: 'kunst', jahr: 2026,
    art: 'Bildserie',
    material: 'Stoffreste auf Leinwand', masse: '120 × 160 cm', muster: 'punkte',
    kurz: 'Eine Bildserie aus allem, was nach dem Zuschnitt übrig bleibt.',
    text: [
      'Jeder Punkt ist ein Rest aus einer anderen Arbeit – das Archiv feiert sich selbst.',
      'Platzhalter: Serie, Ausstellung, Verfügbarkeit.'
    ],
    bild: null
  },
  {
    slug: 'hahnenschrei', nr: '003', titel: 'Hahnenschrei', kategorie: 'mode', jahr: 2025,
    art: 'Mantel',
    material: 'Wollpepita, Futterseide', masse: 'Einheitsgröße', muster: 'hahnentritt',
    kurz: 'Ein Mantel mit überschnittenen Schultern und sehr lautem Muster.',
    text: [
      'Pepita, so groß gezogen, dass es nicht mehr höflich ist.',
      'Platzhalter: Idee, Material, Prozess, Credits.'
    ],
    bild: null
  },
  {
    slug: 'farbfeld-eins', nr: '004', titel: 'Farbfeld I', kategorie: 'kunst', jahr: 2025,
    art: 'Malerei',
    material: 'Pigment auf Nessel', masse: '90 × 120 cm', muster: 'farbfeld',
    kurz: 'Malerei auf ungebleichtem Nessel, gespannt wie ein Schnittbogen.',
    text: [
      'Zwei Flächen, ein Saum dazwischen. Der Stoff darf durchscheinen.',
      'Platzhalter: Technik, Ausstellung, Verfügbarkeit.'
    ],
    bild: null
  },
  {
    slug: 'sonntagsstaat', nr: '005', titel: 'Sonntagsstaat', kategorie: 'mode', jahr: 2025,
    art: 'Kollektion',
    material: 'Baumwoll-Vichy', masse: '7 Looks', muster: 'vichy',
    kurz: 'Eine kleine Kollektion über Picknickdecken und gute Vorsätze.',
    text: [
      'Karos, die eigentlich auf den Rasen gehören, ziehen in die Stadt.',
      'Platzhalter: Looks, Präsentation, Credits.'
    ],
    bild: null
  },
  {
    slug: 'webkante', nr: '006', titel: 'Webkante', kategorie: 'objekt', jahr: 2026,
    art: 'Installation',
    material: 'Leinen, Garn', masse: '40 m Stoffkante', muster: 'leinen',
    kurz: 'Eine Installation aus dem Teil des Stoffs, den sonst niemand ansieht.',
    text: [
      'Vierzig Meter Kante, gesammelt über Jahre, aufgehängt wie Wäsche.',
      'Platzhalter: Ort, Zeitraum, Fotos der Installation.'
    ],
    bild: null
  },
  {
    slug: 'linie-sieben', nr: '007', titel: 'Linie 7', kategorie: 'mode', jahr: 2024,
    art: 'Anzug',
    material: 'Nadelstreifen, Schurwolle', masse: 'Gr. 38', muster: 'nadelstreifen',
    kurz: 'Ein Anzug, bei dem jede siebte Linie aus der Reihe tanzt.',
    text: [
      'Ordnung, bis man genauer hinsieht.',
      'Platzhalter: Idee, Material, Prozess, Credits.'
    ],
    bild: null
  },
  {
    slug: 'faltenwurf', nr: '008', titel: 'Faltenwurf', kategorie: 'kunst', jahr: 2024,
    art: 'Fotoserie',
    material: 'Seidensatin, Fotografie', masse: 'Serie, 12 Abzüge', muster: 'seide',
    kurz: 'Eine Fotoserie über Stoff, der sich weigert, glatt zu sein.',
    text: [
      'Barocke Falten, fotografiert wie Landschaften.',
      'Platzhalter: Serie, Format, Edition.'
    ],
    bild: null
  },
  {
    slug: 'rippenstueck', nr: '009', titel: 'Rippenstück', kategorie: 'objekt', jahr: 2025,
    art: 'Sitzobjekt',
    material: 'Breitcord, Holz', masse: '60 × 60 × 45 cm', muster: 'cord',
    kurz: 'Ein Sitzobjekt aus Breitcord, das beim Draufsetzen ausatmet.',
    text: [
      'Möbel als Kleidungsstück – mit Nähten, die man sitzen hört.',
      'Platzhalter: Entstehung, Ausstellung, Verfügbarkeit.'
    ],
    bild: null
  },
  {
    slug: 'karo-studie', nr: '010', titel: 'Karo-Studie', kategorie: 'kunst', jahr: 2023,
    art: 'Collage',
    material: 'Collage, Tartanreste', masse: 'je 30 × 40 cm', muster: 'glencheck',
    kurz: 'Collagen aus Karos, die eigentlich nicht zueinander passen.',
    text: [
      'Clans, Schuluniformen, Punk – alles auf einem Blatt.',
      'Platzhalter: Serie, Technik, Ausstellung.'
    ],
    bild: null
  },
  {
    slug: 'blaumann', nr: '011', titel: 'Blaumann, umgedeutet', kategorie: 'mode', jahr: 2023,
    art: 'Arbeitskleidung',
    material: 'Denim, Kupfernieten', masse: 'Unisex, S–XL', muster: 'denim',
    kurz: 'Arbeitskleidung, neu geschnitten fürs Nachdenken.',
    text: [
      'Taschen dort, wo Gedanken hingehören, nicht Werkzeug.',
      'Platzhalter: Idee, Material, Prozess, Credits.'
    ],
    bild: null
  },
  {
    slug: 'zackenschere', nr: '012', titel: 'Zackenschere', kategorie: 'objekt', jahr: 2024,
    art: 'Skulptur',
    material: 'Stahl, Leinen', masse: 'Maßstab 10 : 1', muster: 'zickzack',
    kurz: 'Eine Skulptur als Verbeugung vor dem wichtigsten Werkzeug im Atelier.',
    text: [
      'Groß genug, um sich davorzustellen. Scharf nur an den Kanten.',
      'Platzhalter: Ort, Material, Fotos.'
    ],
    bild: null
  }
];
