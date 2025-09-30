# Obsahová Štruktúra

Tento adresár drží obsahové zdroje (markdown) oddelené od komponentovej logiky.

## Zložky
- `pillars/` – pilierové (hlboké) stránky (1800–2600+ slov)
- `districts/` – lokálne landingy pre mestské časti (lokalizované prvky)
- `blog/` – blogové články (seed topical authority)

## Konvencie
- Názvy súborov: kebab-case bez diakritiky (`ako-zabalit-krehke-veci.md`).
- Frontmatter (minimálne):
  ```yaml
  ---
  title: "..."
  slug: "/blog/..." # alebo /stahovanie-bratislava
  intent: how-to | cost | checklist | problem | segment | local
  primary_keyword: "..."
  secondary_keywords: ["...", "..."]
  description: "Meta popis <= 155 znakov."
  published: false
  ---
  ```
- CTA bloky budú injektované layoutom (budúci template).

## Workflow
1. Naplniť stub → označiť `published: false`.
2. Po editácii a fact-check → zmeniť na `published: true`.
3. Skontrolovať checklist (SEO_PLAN.md sekcia: Kontrola Pred Publikáciou).
4. Nasadiť & sledovať eventy (scroll_75, blog_to_form, etc.).

---
*Auto-generované stuby sú nižšie v zložkách.*
