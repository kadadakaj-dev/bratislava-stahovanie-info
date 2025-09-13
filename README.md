
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

## 🛠️ Použité Technológie (Tech Stack)

- **Frontend:** React, TypeScript
- **Štýlovanie:** Tailwind CSS
- **AI Asistent (voliteľne):** Google Gemini API
- **Offline Úložisko:** IndexedDB

---

## 🚀 Lokálne Spustenie (Local Development)

Keďže projekt nevyužíva tradičný build systém ako Vite alebo Create React App, na jeho spustenie lokálne stačí jednoduchý HTTP server.

**Požiadavky:**
- Nainštalovaný [Node.js](https://nodejs.org/)

**Postup:**

1.  **Klonujte repozitár:**
    ```bash
    git clone https://github.com/vas-username/vas-repozitar.git
    cd vas-repozitar
    ```

2.  **Nastavte premenné prostredia:**
    - Skopírujte súbor `.env.example` a premenujte ho na `.env`.
    - V súbore `.env` doplňte váš `API_KEY` pre Google Gemini. Ak API kľúč nemáte, AI funkcie (chatbot) nebudú fungovať, ale zvyšok aplikácie áno.
      ```
      API_KEY=VÁŠ_API_KĽÚČ_SEM
      ```

3.  **Nainštalujte a spustite lokálny server:**
    - Odporúčame použiť balíček `serve`, ktorý je veľmi jednoduchý.
    ```bash
    # Nainštalujte serve globálne (stačí raz)
    npm install -g serve

    # Spustite server v koreňovom adresári projektu
    serve .
    ```

4.  **Otvorte aplikáciu v prehliadači:**
    - Server vám vypíše lokálnu adresu, zvyčajne `http://localhost:3000`. Otvorte ju vo vašom prehliadači.

---

## ☁️ Nasadenie na Vercel (Deployment to Vercel)

Vercel je ideálna platforma pre hosting tejto aplikácie, pretože ponúka štedrý bezplatný plán a je dokonale optimalizovaná pre statické weby a moderné frontendové frameworky.

**Postup krok za krokom:**

1.  **Zaregistrujte sa na Vercel:**
    - Prejdite na [vercel.com](https://vercel.com/) a zaregistrujte sa pomocou vášho GitHub, GitLab alebo Bitbucket účtu.

2.  **Vytvorte nový projekt:**
    - Vo vašom Vercel Dashboarde kliknite na **"Add New..." -> "Project"**.

3.  **Importujte Git Repozitár:**
    - Nájdite a vyberte váš GitHub repozitár s kódom aplikácie.

4.  **Nakonfigurujte projekt:**
    - **Framework Preset:** Vercel by mal automaticky rozpoznať, že ide o statický projekt. Ak nie, zvoľte **"Other"**.
    - **Build and Output Settings:** Keďže tento projekt nemá buildovací krok, môžete tieto nastavenia nechať prázdne alebo ich vypnúť. Vercel automaticky nasadí obsah repozitára ako statické súbory.
    - **Environment Variables (DÔLEŽITÉ):**
        - Prejdite do sekcie **"Environment Variables"**.
        - Pridajte novú premennú s menom `API_KEY`.
        - Do hodnoty (value) vložte váš Google Gemini API kľúč.
        - Kliknite na **"Add"**.

5.  **Nasaďte aplikáciu:**
    - Kliknite na tlačidlo **"Deploy"**.
    - Vercel automaticky stiahne kód, nastaví prostredie a nasadí vašu aplikáciu. Po dokončení vám poskytne unikátnu URL adresu (napr. `nazov-projektu.vercel.app`).

Každý ďalší `git push` do hlavnej vetvy (main/master) automaticky spustí nové nasadenie s aktuálnymi zmenami.

---

## 🐙 Nastavenie GitHub Repozitára (GitHub Repository Setup)

Ak ste kód dostali ako ZIP súbor a chcete ho nahrať na GitHub pre jednoduché nasadenie na Vercel.

**Postup:**

1.  **Vytvorte nový repozitár na GitHub:**
    - Prihláste sa na [github.com](https://github.com) a kliknite na **"New repository"**.
    - Pomenujte repozitár (napr. `viandmo-pwa`), zvoľte, či má byť verejný alebo súkromný, a kliknite na **"Create repository"**.

2.  **Inicializujte Git lokálne:**
    - Otvorte terminál v koreňovom adresári vášho projektu a zadajte príkazy:
    ```bash
    # Inicializuje Git v projekte
    git init

    # Pridá všetky súbory do prvého commitu
    git add .

    # Vytvorí prvý commit
    git commit -m "Initial commit"
    ```

3.  **Prepojte lokálny projekt s GitHub repozitárom:**
    - Skopírujte URL vášho novovytvoreného GitHub repozitára a zadajte príkaz (nahraďte URL):
    ```bash
    git remote add origin https://github.com/vas-username/viandmo-pwa.git
    ```

4.  **Nahrajte kód na GitHub:**
    - Odošlite váš lokálny kód na GitHub:
    ```bash
    # Prepne hlavnú vetvu na "main" (moderný štandard)
    git branch -M main

    # Nahrá kód do "main" vetvy na GitHube
    git push -u origin main
    ```

5.  **Nezabudnite na `.gitignore`:**
    - Uistite sa, že máte v projekte súbor `.gitignore`, ktorý zabráni nahrávaniu citlivých a nepotrebných súborov na GitHub. Mal by obsahovať minimálne:
    ```
    # Súbor s citlivými údajmi
    .env

    # Závislosti (ak by ste ich v budúcnosti pridali)
    node_modules

    # Build výstupy (ak by ste pridali build proces)
    dist
    build
    ```

Teraz je váš kód na GitHube a môžete pokračovať nasadením na Vercel podľa návodu vyššie.
