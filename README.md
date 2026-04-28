# HUB3 → EPC QR konverter (PWA)

Konvertira hrvatsku HUB3 uplatnicu (PDF417 barkod) u EPC QR kod koji se može skenirati u Revolutu i drugim SEPA aplikacijama.

## Datoteke u ovom paketu

- `index.html` — glavna aplikacija
- `manifest.json` — PWA metadata (ime, ikone, boje)
- `sw.js` — service worker (offline cache)
- `icon.svg` — vektorska ikona
- `icon-192.png`, `icon-512.png` — rasterizirane ikone za home screen

## Troubleshooting

**Service worker ne radi lokalno preko `file://`** — to je očekivano, PWA traži HTTP(S). Lokalno možeš testirati s `python3 -m http.server` u folderu, pa otvoriti `http://localhost:8000`.

**"Add to Home Screen" se ne pojavljuje** — provjeri da je URL HTTPS (GitHub Pages je automatski HTTPS), da je `manifest.json` dostupan, i da SW nije blokirao registraciju (DevTools → Application → Service Workers).

**QR kod se ne generira** — provjeri u DevTools console je li se `qrcode-generator` učitao. Ako CDN ne radi, reload nakon par sekundi (SW će sljedeći put cache-irati lokalno).
