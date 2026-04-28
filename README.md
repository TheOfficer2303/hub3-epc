# HUB3 → EPC QR konverter (PWA)

Konvertira hrvatsku HUB3 uplatnicu (PDF417 barkod) u EPC QR kod koji se može skenirati u Revolutu i drugim SEPA aplikacijama.

## Deploy na GitHub Pages (5 minuta)

### 1. Napravi novi repo

Idi na https://github.com/new i napravi public repo (npr. `hub3-epc`). Ne dodavaj README ili gitignore.

### 2. Upload datoteka

**Najlakši način (web upload, bez gita):**

1. Klikni na "uploading an existing file" link na praznoj repo stranici
2. Drag & drop sve datoteke iz ovog foldera (`index.html`, `manifest.json`, `sw.js`, `icon.svg`, `icon-192.png`, `icon-512.png`)
3. Klikni **Commit changes**

**Preko gita (ako preferiraš):**

```bash
cd /putanja/do/ovog/foldera
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/TVOJ-USERNAME/hub3-epc.git
git push -u origin main
```

### 3. Aktiviraj GitHub Pages

1. U repu idi na **Settings** → **Pages** (lijevi sidebar)
2. Pod **Source** odaberi **Deploy from a branch**
3. Branch: **main**, folder: **/ (root)**
4. **Save**

GitHub će ti za par minuta dati URL kao `https://TVOJ-USERNAME.github.io/hub3-epc/`. Ako se ne pojavi odmah, refresh stranicu nakon 1-2 minute.

### 4. Instaliraj na mobitel

Otvori URL u **Chromeu (Android)** ili **Safariju (iOS)**:

- **Android (Chrome)**: pojavit će se "Add to Home Screen" banner pri dnu, ili u meniju (⋮) klikni **Install app** / **Add to Home Screen**
- **iPhone (Safari)**: klikni Share dugme (kvadrat sa strelicom) → **Add to Home Screen**

Dobit ćeš ikonu na home screenu koja otvara aplikaciju fullscreen kao native app. Radi i offline nakon prvog otvaranja.

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
