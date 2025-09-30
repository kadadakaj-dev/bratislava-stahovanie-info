# 30-Dňový SEO + Content Launch Plán (Bratislava & Mestské Časti)

Cieľ: Seed topical authority, zachytiť long‑tail dopyty, pripraviť škálovateľnú architektúru pre 4–9 mesačný rast a konverzie (500–1000 kvalifikovaných dopytov postupne po akumulácii autority).

---
## Prehľad Fáz

| Fáza | Deň | Strategický Cieľ | Kľúčové Výstupy |
|------|-----|------------------|-----------------|
| Audit & Setup | 1–3 | Technický + entitný základ | GMB/GBP, NAP, sitemap, robots, schema, Core Web Vitals baseline |
| Architektúra & Klastre | 4–6 | Topical map & URL strom | Strom klastrov, naming konvencie, slug štandard |
| Pillar Pages | 7–12 | 2–3 pilierové stránky | "Stahovanie Bratislava Sprievodca", "Odvoz odpadu Bratislava" |
| Lokálne Landingy | 10–20 | 6–10 mestských častí | Unikátne varianty + micro FAQ + CTA |
| Blog Seed | 12–25 | 12–20 článkov (mix intentov) | How-to, checklist, náklady, problémové otázky |
| Konverzný Funnel | 15–25 | Experimenty & optimalizácia | Varianty formulára, sticky CTA, PDF lead magnet |
| Autorita & E-E-A-T | 20–30 | Dôvera + signály kvality | Stránka O nás, tím, proces, fotky, recenzie |
| Interné Prelinkovanie | priebežne | Posilnenie siló | Huby, tagy, kontextové odkazy |
| Meranie | 1–30 | Základné eventy & dashboards | track: form_submit, click_call, chat_open, scroll_75, blog_to_form |

---
## Detailný Deň-Po-Dni Rozpis

### Dni 1–3: Audit & Setup

- Technický audit: indexácia (robots.txt, meta robots), canonical, 404/redirect kontrola.
- Core Web Vitals baseline (LCP, INP, CLS) – uložiť do `QA_CHECKLIST.md`.
- Google Business Profile (úplné vyplnenie kategórie: Moving Company / Waste Management doplnkové).
- NAP konzistencia (header/footer, schema, contact stránka) – rovnaký formát.
- Sitemap.xml validácia + odoslanie do GSC.
- Initial schema: Organization (MovingCompany) + Service + Homepage FAQ (ak relevantné) + BreadcrumbList.
- Vytvoriť štruktúru adresárov pre obsah: `/content/pillars`, `/content/districts`, `/content/blog` (prípadne headless CMS plán).
- Definovať naming konvencie: slugy bez diakritiky, kebab-case (napr. `stahovanie-bratislava`, `odvoz-odpadu-bratislava`).

### Dni 4–6: Architektúra & Klastre

- Topical map – export do `TOPICAL_MAP.md`.
- Každému klastru priradiť: primárny intent (info / komerčný / transakčný), sekundárne entity.
- Navrhnúť interné huby (napr. `/stahovanie/`, `/odvoz-odpadu/`).
- Prioritizácia (štart s vysokou komerčnou hodnotou + manageľná konkurencia): sťahovanie bytov, odvoz odpadu, vypratávanie pivnice.

### Dni 7–12: Pillar Pages

- Generovať pomocou MASTER PROMPT (pilierová verzia).
- Každý pilier: 1800–2600 slov, sekčné H2/H3, interné linky na budúce landingy (even if 404 – pripraviť stub / noindex until content ready).
- Vložiť FAQ (5–10 otázok) – použiteľné pre FAQPage schema.
- Vložiť CTA blok po 25 % a 85 % textu.
- Pripraviť obrázky (popisy pre alt – semantická relevancia, unikátne – nie generické stock).

### Dni 10–20: Lokálne Landingy (6–10)

- Poradie: Ružinov, Petržalka, Nové Mesto, Karlova Ves, Dúbravka, Rača, Staré Mesto (alebo podľa business priority).
- Každá stránka musí mať unikátne prvky: parkovanie, typ bývania, bežné problémy, lokálne landmark referencie.
- Štruktúra: H1 (Sťahovanie + {MČ}), Úvod, Lokálne výzvy, Ako riešime, Cenník odhady (intervaly), Micro-case, FAQ (4–6), CTA variácie.
- Interný link späť na pilier + na cenník + 1–2 relevantné blogy.

### Dni 12–25: Blog Seed (12–20 článkov)

Intent mix (percentuálne):
- How-to (25%) – "ako zabaliť ...", "ako plánovať ..."
- Náklady / cenník (15%) – "koľko stojí ..."
- Checklist (15%) – "kontrolný zoznam sťahovanie"
- Problém / bolesť (20%) – "problém so starým nábytkom", "kam s odpadom po ..."
- Segmentové (15%) – študenti, seniori, firmy
- Lokalizované long-tail (10%) – kombinácie služby + MČ + špecifikum.

Každý článok: 900–1500 slov (how-to 1200–1700), 1 CTA mid + 1 CTA end, interné linky (pilier + 1 horizontálny + 1 komerčný).

### Dni 15–25: Konverzný Funnel

- A/B: Hero nadpis (emo vs. value).
- Form variant: single step vs. multi-step (hypotéza zvýšenia completion).
- Sticky CTA: pravý dolný roh (quote form open / chat open) – event `sticky_cta_click`.
- Lead magnet: PDF "30-dňový plán hladkého sťahovania" – gate e-mailom.
- Implementovať event tracking (viď sekcia Events).

### Dni 20–30: Autorita & E-E-A-T

- Stránka O nás: história, hodnoty, transparentná infraštruktúra, fotky reálneho vozového parku.
- Tím: mini bio (roky skúseností, špecializácia).
- Proces: krok po kroku s ikonami (riziká a mitigácie).
- Recenzie: overiť legálnosť + zhromaždiť citácie (neskôr AggregateRating schema).
- Trust prvky: Poistenie, licencie, GDPR, kontakt (click-to-call event).

### Priebežne: Interné Prelinkovanie
- Po publikovaní novej stránky: prosadiť 2–3 spätné interné odkazy zo starších článkov (re-edit vlny).
- Sledovať orphan pages (skript / manuálny audit). 

### Meranie (Základné Eventy)
| Event Name | Kedy | Parametre |
|------------|------|-----------|
| form_submit | Quote form success | source (page), services_selected, estimated_distance |
| click_call | Klik na tel. link | page, placement (header/footer/cta) |
| chat_open | Chatbot otvorený | page |
| scroll_75 | Prvý krát user prejde >= 75% | page, depth=0.75 |
| blog_to_form | Klik z blogu na CTA form anchor | page, post_id |
| sticky_cta_click | Klik na floating CTA | page, variant |
| lead_magnet_download | Stiahnutie PDF | page, asset="plan-30" |

---
## Entitná & Semantická Vrstva (Implementačné Pokyny)
- Zachovať prirodzenú densitu – žiadne  keyword stuffing.
- Každá hlavná entita aspoň 1× v prvých 200 slovách relevantnej stránky.
- Alt text obrázkov: opis + kontext + lokalita ak dáva zmysel.
- FAQ: otázky formou prirodzenej reči (napr. "Koľko trvá sťahovanie 3-izbového bytu v Ružinove?").

---
## Interné Linkovanie – Štandardy
- 1 Pilier ↔ 6–10 podporujúcich stránok.
- Cieľ: Každá stránka (okrem právnych) má min. 2 interné príchodzie odkazy.
- Nepoužívať identický anchor vo všetkých odkazoch (variačné frázy: "cenník sťahovania", "náklady na presun").

---
## Štruktúra Promptov (Rekapitulácia)
- MASTER PROMPT pre pilier / landing.
- BLOG PROMPT – volí intent + generuje štruktúru.
- LOCAL LANDING PROMPT – geo špecifiká.
- UPDATE PROMPT – reoptimalizácie po dátach z GSC.

---
## Kontrola Pred Publikáciou (Checklist)
- [ ] Meta Title <= 60 znakov + lokalita + benefit
- [ ] Meta Description <= 155 znakov, CTA-ish
- [ ] H1 unikátne (nie skopírovaný Title)
- [ ] Prvé 150 slov obsahuje hlavný intent + variácia
- [ ] 1–2 obrázky s alt
- [ ] 1 interný link nahor (pilier) + 1 horizontálny + 1 konverzný
- [ ] FAQ validný (bez duplicít otázok)
- [ ] Schema JSON-LD validované (Rich Results test)
- [ ] Manuálna faktická verifikácia (časy, ceny, proces)

---
## KPI & Reporting Štruktúra
- Týždenný log: počet nových URL, indexované, impressions (GSC), leads (events -> form_submit), CTR long-tail queries.
- 30-dňové vyhodnotenie: ktoré klastre získali najrýchlejšiu trakciu, úprava priorít.

---
## Ďalšie Fázy Po 30 Dňoch (Náčrt)
- Rozšíriť landingy na všetky zvyšné mestské časti.
- Pridať video obsah (návody, proces sťahovania) – potenciál pre VideoObject schema.
- Budovanie externých odkazov: lokálne portály, partneri (realitky, správcovia budov).
- Lead nurturing: e‑mail sekvencie pre stiahnutie PDF.

---
## Rýchle Prompty (Copy‑Paste Set)

### Pilier
```
POUZI MASTER PROMPT. TEMA: Stahovanie Bratislava – Kompletny Sprievodca. CIEL: Edukovat + konvertovat. DLZKA: 2200 slov. OUTPUT: Markdown + JSON-LD.
```

### Lokálny Landing (Ružinov)
```
POUZI LOCAL LANDING PROMPT. SLUZBA: Stahovanie. MESTSKA CAST: Ruzinov. TONY: profesionalny, empatia. DLZKA: 1400 slov.
```

### Blog (How-To)
```
POUZI BLOG PROMPT. TYP: how-to. KEYWORD: ako zabalit krehke veci pri stahovani. DLZKA: 1300 slov.
```

### Reoptimalizácia
```
POUZI UPDATE PROMPT. STRANKA: /stahovanie-bratislava. VSTUP: (vloz markdown). KONKURENCIA: (URL1, URL2). GSC QUERIES: (vloz). OUTPUT: JSON navrhov.
```

---
## Poznámky
- Reálne konverzie závisia od rýchlosti implementácie a diferenciácie ponuky.
- Nedeklarovať garancie typu "900%" – sú mimo kontrolu.

---
*Dokument generovaný ako základ exekúcie. Aktualizuj iteratívne podľa dát.*
