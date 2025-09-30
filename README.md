
# VI&MO PWA | bratislava-stahovanie.info

> Oficiálna PWA aplikácia spoločnosti VI&MO. Ponúkame profesionálne sťahovacie, upratovacie a vypratávacie služby v Bratislave. Získajte cenovú ponuku, prečítajte si náš blog.

Toto je zdrojový kód pre modernú Progressive Web App (PWA) vytvorenú pre spoločnosť VI&MO, ktorá sa špecializuje na sťahovacie a súvisiace služby. Aplikácia je navrhnutá tak, aby bola rýchla, spoľahlivá, responzívna a plne funkčná aj v offline režime.

---

## ✨ Kľúčové Vlastnosti (Key Features)

- **Komplexný Prehľad Služieb:** Detailné informácie o sťahovaní bytov, firiem, vypratávaní a ďalších službách.
- **Interaktívny Cenník:** Transparentný cenník a formulár pre nezáväznú cenovú ponuku s odhadom ceny v reálnom čase.
- **Firemný Blog:** Články, tipy a rady týkajúce sa sťahovania a bývania.
- **PWA Funkcionalita:** Aplikáciu je možné "nainštalovať" na domovskú obrazovku a funguje aj offline vďaka Service Workerom.
- **Offline Podpora:** Formulár pre cenovú ponuku funguje aj bez pripojenia na internet. Požiadavky sa uložia a odošlú automaticky po obnovení pripojenia.
- **Viacjazyčnosť:** Plná podpora pre slovenčinu a angličtinu.
- **Dynamické SEO:** Meta tagy a JSON-LD štruktúrované dáta sa generujú dynamicky pre lepšiu indexáciu vo vyhľadávačoch.
- **Prístupnosť (Accessibility):** Dôraz na sémantické HTML, ARIA atribúty a navigáciu pomocou klávesnice.
- **Responzívne Obrázky:** Automaticky generovaný `srcset` a `sizes` pre optimalizáciu LCP a šírky prenosu + podpora AVIF / WebP fallback.
- **Inteligentné Prefetchovanie:** Komponenty a trasy sa predbiehajú pri hover / focus a počas idle času.
- **Adaptívny Tmavý Režim:** Tri režimy (Svetlý / Tmavý / Auto podľa systému) s perzistenciou v localStorage.

## 🛠️ Použité Technológie (Tech Stack)

- **Frontend:** React, TypeScript
- **Štýlovanie:** Tailwind CSS
- **AI Asistent (voliteľne):** Google Gemini API
- **Offline Úložisko:** IndexedDB
- **Optimalizácia Obrázkov:** Dynamické `srcset` generovanie (utility `utils/image.ts`)

---

## 🚀 Lokálne Spustenie (Local Development)

Projekt používa **Vite** pre vývoj a build (skripty `dev`, `build`, `preview`).

**Požiadavky:**

- Nainštalovaný [Node.js](https://nodejs.org/) (odporúčané LTS)

**Rýchly štart:**

```bash
git clone https://github.com/vas-username/vas-repozitar.git
cd vas-repozitar
cp .env.example .env   # vyplňte kľúč
npm install
npm run dev
```

Otvorí sa (alebo použite) URL: `http://localhost:5173` (predvolený port Vite).

### Konfigurácia API kľúča

V súbore `.env` nastavte:

```bash
GEMINI_API_KEY=VÁŠ_API_KĽÚČ
```
Premenná `GEMINI_API_KEY` je preferovaná. Pre spätnú kompatibilitu je akceptované aj `API_KEY`, ale odporúča sa prejsť na nové meno.

Ak kľúč nenastavíte, AI funkcie (chat / sumarizácia) budú vypnuté, ostatná funkcionalita funguje normálne.

### Dostupné skripty

| Skript | Popis |
| ------ | ------ |
| `npm run dev` | Vývojový server s HMR |
| `npm run build` | Produkčný build do `dist/` |
| `npm run preview` | Náhľad produkčného buildu |

### Produkčný build lokálne

```bash
npm run build
npm run preview
```
Potom otvorte URL z výstupu (typicky `http://localhost:4173`).

---

## ☁️ Nasadenie na Vercel (Deployment to Vercel)

**Build proces je potrebný** (Vite). Vercel ho spustí automaticky.

**Kľúčové nastavenia:**

- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: (ponechať default – `npm install`)
- Node version: (voliteľne) nastaviť podľa `.nvmrc` ak pridáte

**Environment Variables:**

- Názov: `GEMINI_API_KEY` (alebo dočasne `API_KEY`)
- V prostrediach Production / Preview / Development nastavte rovnako podľa potreby.

Po deploy bude aplikácia dostupná na generovanej Vercel URL. Každý push do `main` spustí nový build.

---

## 🐙 Nastavenie GitHub Repozitára (GitHub Repository Setup)

Ak ste kód dostali ako ZIP súbor a chcete ho nahrať na GitHub pre jednoduché nasadenie na Vercel.

**Postup:**

1. **Vytvorte nový repozitár na GitHub:**
    - Prihláste sa na [github.com](https://github.com) a kliknite na **"New repository"**.
    - Pomenujte repozitár (napr. `viandmo-pwa`), zvoľte, či má byť verejný alebo súkromný, a kliknite na **"Create repository"**.

2. **Inicializujte Git lokálne:**
    - Otvorte terminál v koreňovom adresári vášho projektu a zadajte príkazy:

```bash
# Inicializuje Git v projekte
git init

# Pridá všetky súbory do prvého commitu
git add .

# Vytvorí prvý commit
git commit -m "Initial commit"
```

1. **Prepojte lokálny projekt s GitHub repozitárom:**
    - Skopírujte URL vášho novovytvoreného GitHub repozitára a zadajte príkaz (nahraďte URL):

```bash
git remote add origin https://github.com/vas-username/viandmo-pwa.git
```

1. **Nahrajte kód na GitHub:**
    - Odošlite váš lokálny kód na GitHub:

```bash
# Prepne hlavnú vetvu na "main" (moderný štandard)
git branch -M main

# Nahrá kód do "main" vetvy na GitHube
git push -u origin main
```

1. **Nezabudnite na `.gitignore`:**
    - Súbor je už súčasťou repozitára a obsahuje bežné výnimky (`.env`, `node_modules`, `dist`, atď.).

---

## 🔒 Bezpečnosť API kľúča

API kľúč je vložený do klienta počas buildu (static replacement). Pre verejnú produkciu odporúčame nasadiť vlastný proxy backend, ktorý bezpečne komunikuje s Gemini API a na frontend posiela len výsledky.

---

## 🧪 Testovanie (Manual Smoke Suggestions)

1. Načítať domovskú stránku (bez chýb v konzole).
2. Prepínať jazyk SK/EN (texty sa zmenia).
3. Použiť formulár cenovej ponuky – odoslanie bez pripojenia (simulate offline) -> požiadavka sa uloží.
4. AI Chat komponent: pri nevyplnenom kľúči zobraziť vhodnú chybu / fallback.
5. PWA: "Add to Home Screen" prompt (Chrome / Android) a offline načítanie základných stránok.
6. Overiť prepínanie témy (Svetlá / Tmavá / Auto) a zachovanie preferencie po reload.
7. Skontrolovať, že `<picture>` elementy servírujú AVIF/WebP (DevTools > Network > Img, stĺpec Type).
8. Simulovať pomalé pripojenie a overiť, že prefetch nespôsobuje blokovanie hlavného obsahu (Network panel – Priority = Low).

---

## ♻️ Optimalizácia Obrázkov (Responsive Images)

Implementovaná je utilita `utils/image.ts`:

- Deteguje pomer strán z URL `picsum.photos/seed/.../width/height`.
- Generuje `srcset` pre viacero šírok (konfigurácia podľa komponentu).
- Produkuje zdroje AVIF a WebP + fallback JPEG cez `<picture>`.
- Nastavuje `sizes` pre lepšie rozhodovanie prehliadača.
- Nastavené `decoding="async"`, `loading="lazy"` a vhodný `fetchPriority`.

Refaktorované komponenty:
- `PostCard` (náhľadové karty)
- `PostDetail` (hero obrázok článku)

Ak pridáte ďalšie obrázky, použite:

```ts
const responsive = generateResponsiveImage({
    url: originalUrl,
    widths: [320, 640, 960],
    sizes: '(max-width: 640px) 100vw, 50vw',
    loading: 'lazy',
    fetchPriority: 'low'
});
```

Potom v JSX:

```tsx
<picture>
    {responsive.pictureSources.map(s => <source key={s.type} type={s.type} srcSet={s.srcSet} sizes={responsive.img.sizes} />)}
    <img {...responsive.img} alt="..." />
</picture>
```

---

## ⚡ Prefetch & Performance

Súbor `utils/prefetch.ts` implementuje registráciu trás a komponentov pre prefetch.

- `prefetch(id, loader)` sa volá pri hover/focus navigačného linku.
- Idle prefetch sa plánuje cez `requestIdleCallback` / timeout fallback.
- Minimalizuje blokujúce zdroje (len dynamické importy / API volania podľa potreby).

---

## 🌗 Tmavý Režim (Dark Mode)

Implementované v `services/themeService.ts` + prepínač `components/ThemeToggle.tsx`.

- Režimy: `light`, `dark`, `auto` (nasleduje systém `prefers-color-scheme`).
- Persistencia: `localStorage` kľúč `viandmo-theme`.
- CSS premenlivé tokeny sa injektujú pri inicializácii a pri zmene témy.

---

## 🧱 Service Worker Vylepšenia

- Segmentované cache: shell / static / api / images / fonts.
- `stale-while-revalidate` pre obrázky s jednoduchým obmedzením veľkosti (`IMAGE_CACHE_MAX_ENTRIES`).
- Možnosť ďalšieho rozšírenia pre normalizáciu variantov (aktuálne priamy key podľa URL).


---

## 🗺️ Roadmap (Ideas)

- CI (GitHub Actions) pre lint / build.
- Backend proxy pre AI volania.
- Jednotkové testy (Vitest / React Testing Library).
- Monitorovanie výkonu (Web Vitals export).

---

Ak máte otázky alebo návrhy na zlepšenie, vytvorte prosím issue alebo pull request. ✨

Teraz je váš kód na GitHube a môžete pokračovať nasadením na Vercel podľa návodu vyššie.
