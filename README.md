# HUB3 → EPC QR konverter (PWA)

Konvertira hrvatsku HUB3 uplatnicu (PDF417 barkod) u EPC QR kod koji se može skenirati u Revolutu i drugim SEPA aplikacijama.

## Datoteke u ovom paketu

- `index.html` — glavna aplikacija
- `manifest.json` — PWA metadata (ime, ikone, boje)
- `sw.js` — service worker (offline cache)
- `icon.svg` — vektorska ikona
- `icon-192.png`, `icon-512.png` — rasterizirane ikone za home screen

## Skeniranje i Revolut

- **Kamera uživo** (tab "Kamera") ili upload slike/screenshota — dekoder je zxing-cpp (WASM), radi i s nagnutim (do ~20°), mutnim i šumovitim fotografijama.
- Na mobitelu se nakon skena odmah otvara Revolut ekran: jedan tap kopira IBAN i otvara Revolut app, a ime, iznos i opis imaju copy gumbe. Podaci ostaju i kad se vratiš iz Revoluta.
- Revolut nema javni deep link koji bi automatski popunio uplatu, pa se polja paste-aju ručno.

## Troubleshooting

**Service worker ne radi lokalno preko `file://`** — to je očekivano, PWA traži HTTP(S). Lokalno možeš testirati s `python3 -m http.server` u folderu, pa otvoriti `http://localhost:8000`.

**"Add to Home Screen" se ne pojavljuje** — provjeri da je URL HTTPS (GitHub Pages je automatski HTTPS), da je `manifest.json` dostupan, i da SW nije blokirao registraciju (DevTools → Application → Service Workers).

**Kamera ne radi** — treba HTTPS (ili `localhost`) i dopuštenje za kameru u pregledniku.

**QR kod se ne generira** — provjeri u DevTools console je li se `qrcode-generator` učitao. Ako CDN ne radi, reload nakon par sekundi (SW će sljedeći put cache-irati lokalno).
