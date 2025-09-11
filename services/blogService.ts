import { Post } from '../types';

const mockPosts: Post[] = [
  {
    id: 1,
    title: "Sťahovanie Bratislava: Kompletný sprievodca pre bezproblémový presun",
    excerpt: "Plánujete sťahovanie v rámci Bratislavy alebo do nej? Tu nájdete všetko, čo potrebujete vedieť – od výberu správnej firmy, cez ceny, až po praktické tipy na balenie. Objavte, ako sa presťahovať rýchlo, lacno a bez stresu.",
    content: `
      <p class="lead text-lg text-text-muted">Sťahovanie patrí medzi najstresujúcejšie životné udalosti. Krabice, chaos, logistika – to všetko môže byť zdrvujúce. Najmä v dynamickom meste ako Bratislava, kde sa život nikdy nezastaví. Ale nemusí to tak byť. So správnym plánovaním a spoľahlivým partnerom sa môže stať sťahovanie vzrušujúcim začiatkom novej kapitoly. Tento kompletný sprievodca vám ukáže, ako zvládnuť <strong>sťahovanie v Bratislave</strong> efektívne a bez zbytočných starostí.</p>
      
      <h2 id="ako-vybrat">Ako si vybrať tú najlepšiu sťahovaciu firmu?</h2>
      <p>Výber správnej sťahovacej služby je kľúčový. V Bratislave pôsobí desiatky firiem, no nie všetky ponúkajú rovnakú kvalitu. Na čo sa zamerať?</p>
      
      <div class="grid md:grid-cols-2 gap-6 my-8">
        <div class="flex items-start gap-4 p-4 bg-surface-2 rounded-lg">
            <div class="flex-shrink-0 w-12 h-12 bg-accent/10 text-accent rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <div>
                <h4 class="font-bold text-text-primary">Recenzie a referencie</h4>
                <p class="text-sm text-text-muted">Hľadajte reálne hodnotenia na Googli alebo sociálnych sieťach. Spokojní zákazníci sú najlepšou vizitkou. Nebojte sa opýtať firmy na konkrétne referencie.</p>
            </div>
        </div>
        <div class="flex items-start gap-4 p-4 bg-surface-2 rounded-lg">
             <div class="flex-shrink-0 w-12 h-12 bg-accent/10 text-accent rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M14.25 7.756a4.5 4.5 0 010 8.488M7.5 10.5h5.25m-5.25 3h5.25M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <div>
                <h4 class="font-bold text-text-primary">Transparentná cenotvorba</h4>
                <p class="text-sm text-text-muted">Seriózna firma vám poskytne detailnú cenovú ponuku bez skrytých poplatkov. Vyžiadajte si ju vopred a písomne. Viac o cenách nájdete v sekcii <a href="#cennik">Cenník sťahovania</a>.</p>
            </div>
        </div>
        <div class="flex items-start gap-4 p-4 bg-surface-2 rounded-lg">
            <div class="flex-shrink-0 w-12 h-12 bg-accent/10 text-accent rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" /></svg>
            </div>
            <div>
                <h4 class="font-bold text-text-primary">Rozsah služieb</h4>
                <p class="text-sm text-text-muted">Potrebujete len prevoz alebo aj balenie, montáž nábytku a likvidáciu starých vecí? Uistite sa, že firma ponúka všetko, čo potrebujete.</p>
            </div>
        </div>
         <div class="flex items-start gap-4 p-4 bg-surface-2 rounded-lg">
            <div class="flex-shrink-0 w-12 h-12 bg-accent/10 text-accent rounded-full flex items-center justify-center">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75h6m-6 4.5h6m-6-8.25h6M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5M3.75 17.25h16.5" /></svg>
            </div>
            <div>
                <h4 class="font-bold text-text-primary">Poistenie</h4>
                <p class="text-sm text-text-muted">Overte si, či má firma poistenie zodpovednosti za škodu. Nehody sa stávajú a je dôležité, aby bol váš majetok chránený.</p>
            </div>
        </div>
      </div>
      
      <h3>Prieskum spokojnosti zákazníkov (2023)</h3>
      <p>Na základe nášho prieskumu medzi 100 nedávno presťahovanými obyvateľmi Bratislavy sme zistili, čo sú pre nich najdôležitejšie faktory pri výbere <strong>sťahovacej služby</strong>.</p>
      <div class="space-y-4 my-6">
        <div>
          <div class="flex justify-between mb-1">
            <span class="text-base font-medium text-text-primary">Spoľahlivosť a dochvíľnosť</span>
            <span class="text-sm font-medium text-text-secondary">92%</span>
          </div>
          <div class="w-full bg-surface-2 rounded-full h-2.5 progress-bar">
            <div class="bg-accent h-2.5 rounded-full progress-bar-inner" style="width: 0%" data-width="92%"></div>
          </div>
        </div>
        <div>
          <div class="flex justify-between mb-1">
            <span class="text-base font-medium text-text-primary">Cena</span>
            <span class="text-sm font-medium text-text-secondary">85%</span>
          </div>
          <div class="w-full bg-surface-2 rounded-full h-2.5 progress-bar">
            <div class="bg-accent h-2.5 rounded-full progress-bar-inner" style="width: 0%" data-width="85%"></div>
          </div>
        </div>
        <div>
          <div class="flex justify-between mb-1">
            <span class="text-base font-medium text-text-primary">Opatrné zaobchádzanie s majetkom</span>
            <span class="text-sm font-medium text-text-secondary">78%</span>
          </div>
          <div class="w-full bg-surface-2 rounded-full h-2.5 progress-bar">
            <div class="bg-accent h-2.5 rounded-full progress-bar-inner" style="width: 0%" data-width="78%"></div>
          </div>
        </div>
      </div>

      <h2 id="cennik">Cenník sťahovania v Bratislave: S čím počítať?</h2>
      <p>Cena za sťahovanie sa odvíja od viacerých faktorov. Kým niektoré firmy účtujú hodinovú sadzbu, iné ponúkajú fixnú cenu za celý projekt. Priemerné ceny sa pohybujú v nasledujúcich reláciách:</p>
      <ul>
        <li><strong>Hodinová sadzba (2 pracovníci + auto):</strong> 35 - 50 € / hodina</li>
        <li><strong>Sťahovanie 1-izbového bytu:</strong> 150 - 250 €</li>
        <li><strong>Sťahovanie 2-izbového bytu:</strong> 250 - 400 €</li>
        <li><strong>Sťahovanie 3-izbového bytu:</strong> 400 - 600 €</li>
      </ul>
      <p>Pamätajte, že toto sú orientačné ceny. Finálnu sumu ovplyvňuje poschodie, prítomnosť výťahu, vzdialenosť, množstvo a typ nábytku (napr. klavír). Pre <strong>lacné sťahovanie</strong> je dôležité porovnať viacero ponúk a zvážiť, ktoré služby si viete zabezpečiť sami. Pre presnú kalkuláciu odporúčame vyplniť náš formulár pre nezáväznú cenovú ponuku.</p>
      
       <div class="my-8 p-6 bg-surface-2 rounded-lg shadow-lg">
        <h3 class="text-xl font-bold text-center mb-4 text-text-primary">Priemerné náklady na sťahovanie podľa typu bytu</h3>
        <div class="flex items-end justify-around h-64 pt-4">
          <div class="relative flex flex-col items-center flex-grow">
            <div class="relative flex justify-center w-full h-full">
               <div class="absolute bottom-0 w-12 bg-primary/20 rounded-t-md bar-chart-bar" style="height: 0%" data-height="40%"></div>
            </div>
            <span class="absolute -bottom-6 text-sm font-medium">1-izbový</span>
            <span class="absolute top-0 text-sm font-bold text-text-secondary">~200€</span>
          </div>
          <div class="relative flex flex-col items-center flex-grow">
            <div class="relative flex justify-center w-full h-full">
                <div class="absolute bottom-0 w-12 bg-primary/40 rounded-t-md bar-chart-bar" style="height: 0%" data-height="65%"></div>
            </div>
            <span class="absolute -bottom-6 text-sm font-medium">2-izbový</span>
            <span class="absolute top-0 text-sm font-bold text-text-secondary">~325€</span>
          </div>
          <div class="relative flex flex-col items-center flex-grow">
            <div class="relative flex justify-center w-full h-full">
                <div class="absolute bottom-0 w-12 bg-primary/60 rounded-t-md bar-chart-bar" style="height: 0%" data-height="90%"></div>
            </div>
            <span class="absolute -bottom-6 text-sm font-medium">3-izbový</span>
            <span class="absolute top-0 text-sm font-bold text-text-secondary">~500€</span>
          </div>
        </div>
      </div>


      <h2 id="tipy">Praktické tipy pre hladký priebeh</h2>
      <p>Dobrá príprava je polovica úspechu. Držte sa týchto krokov a vaše sťahovanie bude hračka.</p>
      <ol>
        <li><strong>Vytvorte si plán:</strong> Minimálne mesiac dopredu si spíšte zoznam úloh. Kedy začať baliť? Koho informovať o zmene adresy? Dobrý plán vám ušetrí nervy.</li>
        <li><strong>Zbavte sa nepotrebných vecí:</strong> Sťahovanie je ideálna príležitosť na triedenie. Predajte, darujte alebo vyhoďte všetko, čo už nepotrebujete. Ušetríte miesto aj peniaze.</li>
        <li><strong>Baliaci materiál:</strong> Zožeňte si dostatok pevných krabíc rôznych veľkostí, lepiacu pásku, bublinkovú fóliu a fixky.</li>
        <li><strong>Systematické balenie:</strong> Balte po miestnostiach. Každú krabicu jasne označte názvom miestnosti a stručným obsahom. Krehké veci označte extra viditeľne.</li>
        <li><strong>Krabica "prvej pomoci":</strong> Pripravte si jednu krabicu s vecami, ktoré budete potrebovať okamžite po príchode: toaletné potreby, lieky, nabíjačky, káva, rýchle občerstvenie, nožnice a základné náradie.</li>
        <li><strong>Zabezpečte parkovanie:</strong> Pre sťahovacie auto budete potrebovať dostatok miesta. V centre Bratislavy to môže byť problém. Informujte sa o možnostiach na oficiálnej stránke mesta alebo sa dohodnite so susedmi.</li>
      </ol>
      <p>Zvládnutie sťahovania v Bratislave si vyžaduje plánovanie, ale s týmito tipmi a správnou sťahovacou firmou to bude pre vás pozitívna skúsenosť. Prajeme vám šťastný nový začiatok!</p>
    `,
    imageUrl: 'https://picsum.photos/seed/stahovanie1/800/400',
    author: 'VI&MO Tím',
    date: '14. mája 2024',
    datePublished: '2024-05-14T09:00:00+02:00',
    tags: ['sťahovanie Bratislava', 'sťahovacia služba', 'lacné sťahovanie'],
  },
  {
    id: 2,
    title: "5 krokov, ako efektívne vypratať pivnicu a získať späť svoj priestor",
    excerpt: "Je vaša pivnica plná vecí, na ktoré ste už zabudli? Zmeňte ju z tmavého skladiska na funkčný priestor. Náš sprievodca vás prevedie piatimi jednoduchými krokmi k dokonale organizovanej pivnici.",
    content: `
      <p class="lead text-lg text-text-muted">Pivnica. Pre niekoho pokladnica, pre iného nočná mora plná pavučín a zabudnutých vecí. Časom sa môže zmeniť na čiernu dieru, ktorá pohlcuje všetko, čo sa inde nezmestí. Ale s trochou odhodlania a správnym systémom môžete tento zanedbaný priestor premeniť na cenné úložné miesto. Poďme na to!</p>
      
      <h2 id="krok1">Krok 1: Plánovanie a príprava sú základ</h2>
      <p>Nepodceňujte prípravu. Predtým, než sa pustíte do práce, vyhraďte si dostatok času – ideálne celý víkend. Zabezpečte si:</p>
      <ul>
        <li><strong>Pevné vrecia na odpad:</strong> Budete ich potrebovať viac, než si myslíte.</li>
        <li><strong>Krabice alebo prepravky:</strong> Na triedenie vecí, ktoré si chcete nechať.</li>
        <li><strong>Ochranné pomôcky:</strong> Rukavice a respirátor sú nevyhnutnosťou kvôli prachu a plesniam.</li>
        <li><strong>Dobré osvetlenie:</strong> Čelovka alebo prenosná lampa vám odhalí aj tie najtmavšie kúty.</li>
      </ul>
      
      <h2 id="krok2">Krok 2: Nemilosrdné triedenie – pravidlo troch kôpok</h2>
      <p>Najťažšia, no najdôležitejšia časť. Vyneste všetko von (ak je to možné) alebo postupujte po sekciách. Každú vec, ktorú vezmete do ruky, priraďte do jednej z troch kategórií:</p>
      <div class="grid md:grid-cols-3 gap-6 my-8">
        <div class="p-4 bg-surface-2 rounded-lg text-center">
          <h4 class="font-bold text-primary">PONECHAŤ</h4>
          <p class="text-sm text-text-muted">Veci, ktoré reálne používate, majú sentimentálnu hodnotu alebo sú sezónne (lyže, vianočné ozdoby).</p>
        </div>
        <div class="p-4 bg-surface-2 rounded-lg text-center">
          <h4 class="font-bold text-accent">DAROVAŤ / PREDAŤ</h4>
          <p class="text-sm text-text-muted">Funkčné veci, ktoré už nepotrebujete. Môžu poslúžiť niekomu inému.</p>
        </div>
        <div class="p-4 bg-surface-2 rounded-lg text-center">
          <h4 class="font-bold text-red-500">VYHODIŤ</h4>
          <p class="text-sm text-text-muted">Rozbité, nefunkčné veci, staré haraburdy a odpad.</p>
        </div>
      </div>
      <p>Buďte úprimní. Nepoužili ste to posledné dva roky? Pravdepodobne to už nebudete potrebovať.</p>
      
      <h2 id="krok3">Krok 3: Dôkladné čistenie</h2>
      <p>Keď je pivnica prázdna, nastal čas na veľké upratovanie. Pozametajte, povysávajte pavučiny, umyte podlahu. Ak objavíte vlhkosť alebo pleseň, riešte príčinu. Použite prípravky proti plesniam a zvážte pohlcovač vlhkosti.</p>
      
      <h2 id="krok4">Krok 4: Inteligentná organizácia</h2>
      <p>Teraz prichádza tá zábavnejšia časť. Veci, ktoré ste sa rozhodli ponechať, zorganizujte systematicky:</p>
      <ul>
        <li><strong>Regály:</strong> Investujte do pevných kovových alebo plastových regálov. Využijete tak vertikálny priestor a udržíte veci mimo vlhkej podlahy.</li>
        <li><strong>Priehľadné boxy:</strong> Sú ideálne, pretože hneď vidíte, čo je vo vnútri.</li>
        <li><strong>Štítky:</strong> Označte každý box. Ušetrí vám to hodiny hľadania.</li>
        <li><strong>Zónovanie:</strong> Rozdeľte pivnicu na zóny – športové vybavenie, náradie, sezónne dekorácie atď.</li>
      </ul>
      
      <h2 id="krok5">Krok 5: Keď je toho priveľa, zavolajte profesionálov</h2>
      <p>Niekedy je množstvo odpadu jednoducho nad vaše sily, alebo nemáte ako zabezpečiť jeho odvoz a ekologickú likvidáciu. V takom prípade neváhajte. Profesionálna firma ako <strong>VI&MO</strong> sa postará o kompletné vypratanie a odvoz odpadu za vás. Rýchlo, efektívne a bez starostí.</p>
      
      <p class="mt-8">Gratulujeme! S trochou úsilia ste premenili svoju pivnicu na organizovaný a funkčný priestor. Užite si ten pocit kontroly a voľného miesta!</p>
    `,
    imageUrl: 'https://picsum.photos/seed/vypratavanie2/800/400',
    author: 'VI&MO Tím',
    date: '28. mája 2024',
    datePublished: '2024-05-28T10:00:00+02:00',
    tags: ['vypratávanie', 'pivnica', 'organizácia', 'urob si sám'],
  },
  {
    id: 3,
    title: "Sťahovanie firmy bez stresu: Kľúčové tipy pre minimálny výpadok",
    excerpt: "Presun kancelárie či celého podniku je komplexná operácia. Kľúčom k úspechu je detailné plánovanie a stratégia, ktorá minimalizuje dopad na váš biznis. Prečítajte si naše osvedčené tipy.",
    content: `
      <p class="lead text-lg text-text-muted">Sťahovanie firmy nie je len o prenose stolov a počítačov. Je to logistická výzva, kde hlavným cieľom je kontinuita prevádzky. Akýkoľvek výpadok znamená stratu produktivity a peňazí. Ako teda zabezpečiť, aby presun prebehol hladko a vaši zamestnanci mohli v pondelok ráno začať pracovať akoby sa nič nedialo? Odpoveďou je precízne plánovanie.</p>
      
      <h2 id="tip1">Tip 1: Vytvorte detailný časový plán a projektový tím</h2>
      <p>Začnite plánovať aspoň 2-3 mesiace vopred. Určite zodpovednú osobu alebo malý tím, ktorý bude mať celý proces na starosti. Vytvorte podrobný harmonogram s konkrétnymi úlohami a termínmi:</p>
      <ul>
        <li><strong>8-12 týždňov pred:</strong> Výber sťahovacej firmy, inventúra majetku.</li>
        <li><strong>4-6 týždňov pred:</strong> Plánovanie rozloženia nábytku v nových priestoroch, objednanie nových služieb (internet, telefóny).</li>
        <li><strong>2-3 týždne pred:</strong> Informovanie klientov a partnerov o zmene adresy, distribúcia baliaceho materiálu zamestnancom.</li>
        <li><strong>Týždeň sťahovania:</strong> Záloha dát, balenie osobných vecí, označovanie vybavenia.</li>
      </ul>
      
      <h2 id="tip2">Tip 2: Komunikácia je kľúčová</h2>
      <p>Informujte svojich zamestnancov o pláne, termínoch a ich úlohách včas. Jasná komunikácia predchádza chaosu a neistote. Pripravte pre nich manuál s inštrukciami: ako si zabaliť osobné veci, ako označiť krabice a IT techniku, a aký je plán na prvé dni v novej kancelárii.</p>
      
      <h2 id="tip3">Tip 3: Odborné balenie a označovanie IT techniky</h2>
      <p>Najcitlivejšou časťou firemného majetku je IT infraštruktúra. Každý počítač, monitor, server a periférne zariadenie musí byť správne odpojené, bezpečne zabalené a jasne označené menom zamestnanca a číslom pracovného miesta v novom priestore. Toto je oblasť, kde sa oplatí spoľahnúť sa na skúsenosti sťahovacej firmy.</p>
      
      <div class="my-8 p-6 bg-surface-2 rounded-lg border-l-4 border-accent">
        <h4 class="font-bold text-text-primary">Profesionálny tip: Farebné kódovanie</h4>
        <p class="text-sm text-text-muted">Priraďte každému oddeleniu alebo zóne v novej kancelárii špecifickú farbu. Všetky krabice a kusy nábytku z daného oddelenia označte touto farbou. Sťahovací tím tak bude okamžite vedieť, kam ktorá vec patrí, čo dramaticky urýchli proces vybaľovania.</p>
      </div>
      
      <h2 id="tip4">Tip 4: Plánovanie nového priestoru</h2>
      <p>Ešte pred sťahovaním majte pripravený presný plán rozloženia nábytku a pracovných miest v nových priestoroch. Uistite sa, že všetky sieťové a elektrické prípojky sú funkčné a na správnych miestach. Plán odovzdajte sťahovacej firme, ktorá podľa neho rozmiestni nábytok.</p>
      
      <h2 id="tip5">Tip 5: Najmite si profesionálov s referenciami</h2>
      <p>Sťahovanie firmy na vlastnú päsť je recept na katastrofu. Profesionálna sťahovacia služba ako <strong>VI&MO</strong> má nielen skúsenosti, ale aj potrebné vybavenie a poistenie. Kľúčovou výhodou je možnosť realizovať sťahovanie mimo pracovnej doby – cez víkend alebo v noci – aby vaša firma neutrpela žiadne prestoje.</p>
      
      <p class="mt-8">Dobre zorganizované sťahovanie môže byť pre firmu pozitívnym impulzom. Je to príležitosť na optimalizáciu procesov, modernizáciu a nový začiatok v priestoroch, ktoré lepšie zodpovedajú vašim potrebám. So správnym plánom a partnerom to zvládnete bez stresu.</p>
    `,
    imageUrl: 'https://picsum.photos/seed/firma3/800/400',
    author: 'VI&MO Tím',
    date: '4. júna 2024',
    datePublished: '2024-06-04T11:00:00+02:00',
    tags: ['sťahovanie firiem', 'kancelária', 'biznis', 'logistika'],
  },
  {
    id: 4,
    title: "Veľké upratovanie pred sťahovaním: Ako na odpad a nepotrebné veci v Bratislave",
    excerpt: "Sťahovanie nie je len o krabiciach, ale aj o triedení. Od vypratania garáže po odvoz starej kuchyne – zistite, ako efektívne zvládnuť odpad a prečo je prenájom kontajnera často najlepšie riešenie.",
    content: `
      <p class="lead text-lg text-text-muted">Každé <strong>sťahovanie do nového bytu v Bratislave</strong> so sebou prináša jedinečnú príležitosť: zbaviť sa všetkého, čo už nepotrebujete. Či už ide o <strong>vypratávanie garáže</strong>, likvidáciu starého nábytku alebo odvoz odpadu po rekonštrukcii, správny prístup vám ušetrí čas, peniaze a nervy. Poďme sa pozrieť, ako na to efektívne.</p>
      
      <h2 id="triedenie">Začnite triedením: Menej je viac</h2>
      <p>Predtým, než začnete čokoľvek baliť, prejdite si všetky svoje veci. Buďte nekompromisní. Ak ste niečo nepoužili viac ako rok, je malá šanca, že to budete potrebovať v novom domove. Tento proces je kľúčový najmä pri špecifických situáciách, ako je <strong>sťahovanie študentov</strong>, kde je priestor limitovaný, alebo pri komplexnom <strong>presťahovaní firmy</strong>.</p>
      <ul>
        <li><strong>Predajte alebo darujte:</strong> Funkčné veci, ktoré už nepotrebujete, môžu potešiť niekoho iného. Skúste online bazáre alebo miestne charity.</li>
        <li><strong>Recyklujte:</strong> Správna <strong>recyklácia nábytku</strong> a spotrebičov je dnes už nevyhnutnosťou.</li>
        <li><strong>Vyhoďte:</strong> Všetko ostatné patrí do odpadu. A tu prichádza na rad logistika.</li>
      </ul>

      <h2 id="odvoz-odpadu">Odvoz odpadu: Možnosti v Bratislave</h2>
      <p>Keď máte vytriedený odpad, stojíte pred otázkou, ako sa ho zbaviť. V Bratislave máte niekoľko možností:</p>
      
      <div class="my-8 p-6 bg-surface-2 rounded-lg border-l-4 border-accent">
        <h4 class="font-bold text-text-primary">Plánovaný vs. pohotovostný zvoz</h4>
        <p class="text-sm text-text-muted">Mesto Bratislava poskytuje pravidelné <strong>termíny vývozu odpadu</strong>, vrátane veľkoobjemového. Ak vám však tieto termíny nevyhovujú, napríklad pri <strong>lacnom last minute sťahovaní</strong>, ideálnym riešením je <strong>pohotovostný zvoz odpadu</strong>, ktorý si môžete objednať u profesionálnej firmy.</p>
      </div>

      <h3 id="prenajom-kontajnera">Prenájom kontajnera: Najefektívnejšie riešenie</h3>
      <p>Pre väčšie objemy odpadu je jednoznačne najlepšou voľbou <strong>prenájom minikontajnera v Bratislave</strong>. Prečo?</p>
      <ul>
        <li><strong>Pohodlie:</strong> Kontajner vám privezú priamo pred dom a po naplnení ho odvezú.</li>
        <li><strong>Flexibilita:</strong> Môžete si vybrať veľkosť kontajnera presne podľa vašich potrieb.</li>
        <li><strong>Univerzálnosť:</strong> Ideálne riešenie pre <strong>zber stavebného odpadu po rekonštrukcii</strong>, <strong>odvoz záhradného odpadu</strong>, ale aj pre veľké vypratávanie kancelárií.</li>
      </ul>
      <p>Potrebujete sa zbaviť bioodpadu? Žiadny problém, stačí si objednať <strong>prenájom kontajnera na bioodpad</strong>.</p>

      <h2 id="specificky-odpad">Riešenie pre špecifický odpad a služby</h2>
      <p>Niektoré veci si vyžadujú špeciálny prístup. Profesionálna firma ako VI&MO vám pomôže aj s týmito úlohami:</p>
      <ul>
        <li><strong>Odvoz starej kuchyne a likvidácia spotrebičov:</strong> Zabezpečíme demontáž, odvoz a ekologickú likvidáciu.</li>
        <li><strong>Odvoz kovového odpadu:</strong> Postaráme sa o staré radiátory, vane a iný kovový šrot.</li>
        <li><strong>Objednať odvoz nábytku s montážou:</strong> Ak potrebujete presunúť len pár kusov, no neviete si poradiť s ich demontážou, sme tu pre vás.</li>
        <li><strong>Bezpečná likvidácia chemického odpadu:</strong> Staré farby, riedidlá a iné nebezpečné látky musia byť zlikvidované odborne.</li>
      </ul>

      <p class="mt-8">Správne naplánovaný <strong>odvoz odpadu</strong> je neoddeliteľnou súčasťou bezproblémového sťahovania. Ušetrí vám nielen starosti, ale aj peniaze za sťahovanie vecí, ktoré v skutočnosti nepotrebujete. Plánujete <strong>sťahovanie cez víkend</strong> a potrebujete všetko zorganizovať naraz? Kontaktujte nás a my vám pripravíme komplexné riešenie na mieru – od balenia až po finálne upratanie a odvoz odpadu.</p>
    `,
    imageUrl: 'https://picsum.photos/seed/odpad4/800/400',
    author: 'VI&MO Tím',
    date: '18. júna 2024',
    datePublished: '2024-06-18T09:00:00+02:00',
    tags: ['odvoz odpadu Bratislava', 'vypratávanie', 'prenájom kontajnera'],
  },
];

/**
 * Fetches all blog posts.
 * @returns A promise that resolves to an array of posts.
 */
export const getPosts = (): Promise<Post[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockPosts);
    }, 500); // Simulate network delay
  });
};

/**
 * Fetches a single blog post by its ID.
 * @param id The ID of the post to fetch.
 * @returns A promise that resolves to the post or undefined if not found.
 */
export const getPostById = (id: number): Promise<Post | undefined> => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(mockPosts.find(post => post.id === id));
      }, 300); // Simulate network delay
    });
};