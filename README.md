# Yael Bulik — Website (Grundgerüst)

Statische Website ohne Build-Schritt: HTML, CSS, etwas JavaScript.

## Look

Ruhig und reduziert. Weiße Fläche, eine Grotesk (Archivo) für alles, eine Serif (Instrument Serif) nur für kleine Rubriken. Der Name „Yael Bulik“ steht in Syne ExtraBold und Rot – das einzige laute Element. Rot sonst nur als Rückmeldung beim Hovern. Alle Farben, Schriftgrößen und Abstände stehen als Tokens oben in `style.css`.

- **Startseite:** Startfoto randlos als Vollbild (auch am Handy), Name mittig im unteren Drittel direkt auf dem Foto, darunter „Mode & Kunst“ und die Links – keine Felder oder Rahmen. Anderes Foto: `assets/img/start.jpg` austauschen, Höhe der Schrift über `align-items` in `.start` anpassen
- **Arbeiten:** Liste, gruppiert nach Mode / Kunst / Objekte, Jahr grau daneben. Das Bild erscheint rechts nur beim Drüberfahren
- **Über:** Text + Porträt, „Was ich mache“ auf heller Fläche, eine Aussage, die beim Scrollen Wort für Wort dunkel wird, Stationen + Anfrage
- **Kontakt:** Button „Anfrage schreiben“ als Hauptaktion, darunter die E-Mail-Adresse und Instagram, rechts ein Bild
- **Detailseite:** Titel + Hauptfoto (entwickelt sich einmal wie ein Abzug), Text + Detailfoto, Galerie, vorherige/nächste
- **Plan:** `DESIGNPLAN.md` (nach tasteskill) – dort auch die Fotoliste

## Ansehen

Doppelklick auf `index.html` – oder lokal mit Server:

```bash
python3 -m http.server 8080
```

→ http://localhost:8080

## Dateien

```
index.html          Startseite
arbeiten.html       alle Arbeiten
arbeit.html         Detailseite, wird über ?p=<slug> befüllt
ueber.html          Über
kontakt.html        Kontakt
impressum.html      Impressum + Datenschutz (Platzhalter)
assets/css/style.css
assets/js/projekte.js   ← hier werden Arbeiten gepflegt
assets/js/main.js       Interaktionen
assets/img/             Fotos hierher
```

Kopf und Fuß stehen in jeder HTML-Datei – Änderungen dort bitte überall nachziehen.

## Arbeit hinzufügen

In `assets/js/projekte.js` einen Eintrag kopieren und anpassen.

## Fotos statt Platzhalter

```js
bild: 'assets/img/nachtfalter.jpg',
bilder: [
  { bild: 'assets/img/nachtfalter-1.jpg', text: 'Gesamtansicht' },
  { bild: 'assets/img/nachtfalter-2.jpg', text: 'Detail' }
]
```

Die Platzhalter sind reines CSS (Stoffmuster) und verschwinden, sobald ein `bild` eingetragen ist.

## Vor dem Livegang

- [ ] **Schriften lokal hosten** – Google Fonts direkt einzubinden ist in Deutschland abmahnrelevant. Archivo, Instrument Serif und Syne z. B. über google-webfonts-helper herunterladen und per `@font-face` einbinden.
- [x] Startfoto eingesetzt (`assets/img/start.jpg`, erster Versuch) – Teilen-Bild `assets/img/share.jpg` daraus geschnitten
- [ ] Impressum (nur Name + E-Mail) und Datenschutzerklärung rechtlich prüfen lassen
- [ ] Alles in `[eckigen Klammern]` ersetzen
- [ ] `og:image` ergänzen
- [ ] SEO: Arbeiten werden per JavaScript gerendert. Für bessere Auffindbarkeit später statisch erzeugen (z. B. mit Eleventy oder Astro) – `projekte.js` lässt sich dafür direkt weiterverwenden.
