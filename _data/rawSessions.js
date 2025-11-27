/**
 * Inspiré des données JSON de OpenPlanner.fr
 * Chemin : sessions
 * Modifications :
 * - notion de trackRange pour indiquer si une session est sur plusieurs tracks
 * - ajout des "grandes" pauses
 * - dateStart en Date
 * - pas de endStart
 * - Nettoyer les abstracts : Markdown mais pas HTML
 *
 * À noter : hideTrackTitle (true par défaut, c'est comme ca dans OpenPlanner) est utilisé pour
 * - savoir s'il faut générer une page de détail pour la session
 * - compter le nombre de sessions
 * On mettra généralement à true pour les pauses et les keynotes
 *
 * Cette donnée sera parsée/complétée pour avoir une donnée "sessions"
 */

/**
 * @type {import("./types.js").RawSession[]}
 */
export default [
  // pauses
  {
    id: "pause matin",
    title: "Pause",
    dateStartStr: "2025-12-05T11:10:00.000+01:00",
    durationMinutes: 20,
    trackRange: ["niepce", "paris"],
    styleClass: "pause",
  },
  {
    id: "pause matin 2",
    title: "Pause",
    dateStartStr: "2025-12-05T11:15:00.000+01:00",
    durationMinutes: 15,
    trackId: "bernard",
    styleClass: "pause",
  },
  {
    id: "pause midi",
    title: "Pause repas",
    dateStartStr: "2025-12-05T12:20:00.000+01:00",
    durationMinutes: 100,
    styleClass: "pause",
  },
  {
    id: "pause apres-midi",
    title: "Pause",
    dateStartStr: "2025-12-05T15:45:00.000+01:00",
    durationMinutes: 20,
    trackRange: ["niepce", "paris"],
    styleClass: "pause",
  },
  {
    id: "pause apres-midi 2",
    title: "Pause",
    dateStartStr: "2025-12-05T15:50:00.000+01:00",
    durationMinutes: 15,
    trackId: "bernard",
    styleClass: "pause",
  },
  // keynotes
  {
    id: "keynote-debut",
    title: "Accueil et lancement de la journée",
    dateStartStr: "2025-12-05T09:00:00.000+01:00",
    durationMinutes: 20,
  },
  // keynotes
  {
    id: "keynote-fin",
    title: "Remerciements et clôture de la journée",
    dateStartStr: "2025-12-05T17:50:00.000+01:00",
    durationMinutes: 10,
  },
  // qui veut être mon dev
  {
    id: "DDeXJLYZfCLtVIFXwzMv",
    title: "Qui veut être mon dév ‽",
    abstract: `En collaboration avec les Docks Numériques, nous vous proposons de participer à une session de pitchs de startups numériques innovantes !

L'objectif ?
- Faciliter la rencontre entre startups numériques en quête de développeurs web et des développeurs ayant un esprit entrepreneurial, cherchant un projet ou un associé pour se lancer dans une aventure entrepreneuriale.

Vous êtes ?
- Développeur web ayant un projet entrepreneurial ou cherchant à rejoindre un projet existant.
- Développeur web en recherche dʼun associé pour lancer une startup.
- Développeur web souhaitant participer à un projet entrepreneurial innovant.
`,
    dateStartStr: "2025-12-05T10:30:00.000+00:00",
    durationMinutes: 50,
    speakerIds: [],
    trackId: "bernard",
    language: "fr",
    level: "BEGINNER",
    formatId: "",
    categoryId: "",

    hideTrackTitle: false,
  },
  // sessions
  {
    id: "cm9jwj2cc013yo63mmmtm0vfx",
    title: "UX/UI s'il vous plaît, ne faites pas ça !",
    abstract:
      "## 🎤 Pitch\n\nDans ce talk, on va vider notre sac.  \nVous savez, ces moments où vous ouvrez Figma et que votre œil gauche commence à trembler ?  \nCes écrans où rien n’est aligné, ces parcours qui changent les règles à chaque clic ?  \nOui, on va parler de *ça*.\n\nParce qu’on les aime bien, nos UX/UI, mais parfois... ils nous testent. 😅  \nSi vous sentez que ça frotte un peu dans votre équipe, venez rire (et pleurer) ensemble !\n\n---\n\n## 🎯 Take away\n\n- Détecter les (très) mauvais patterns avant qu’ils n’atterrissent dans votre backlog  \n- Des idées concrètes pour transformer le facepalm en high five ✋",
    dateStartStr: "2025-12-05T15:30:00.000+00:00",
    durationMinutes: 20,
    speakerIds: ["cm9jwhw4u013vo63mpy91wb74"],
    trackId: "niepce",
    language: "fr",
    level: "BEGINNER",
    formatId: "cm8fxewbi00qbqr3mdo7foy1h",
    categoryId: "cm90vct7x04v3qo3mvwyo6rej",
    hideTrackTitle: false,
  },
  {
    id: "cm9jzdorq016ao63mrldcylgu",
    title: "Comment tester l'accessibilité d'un site internet ?",
    abstract:
      "Selon l'Observatoire du respect des obligations d'accessibilité, seulement 5% des sites web sont accessibles pour les personnes handicapées.\nDans cette conférence, nous explorons les six erreurs d'accessibilité les plus courantes sur un site web. Afin de les corriger, je vous présenterai des conseils simples à mettre en pratique en HTML et un peu de CSS.\nJe vous expliquerai aussi comment effectuer un test utilisateur avec un lecteur d'écran et le clavier afin de vérifier si sa page web est accessible ainsi que comment mettre en place des tests automatisés.",
    dateStartStr: "2025-12-05T13:00:00.000+00:00",
    durationMinutes: 50,
    speakerIds: ["cm9jzdorn0169o63mloy3mv0k"],
    trackId: "paris",
    language: "fr",
    level: "BEGINNER",
    formatId: "cm8fxehjm00qaqr3mi6qly25m",
    categoryId: "cm8fxk82t00qhqr3m2gwuiaq2",
    hideTrackTitle: false,
  },
  {
    id: "cm9n0z4vw01rxo63ml063xuel",
    title: "L'artisanat logiciel à l'heure du numérique responsable",
    abstract:
      'Dans un monde numérique en pleine expansion, comment conjuguer la qualité logicielle avec un impact environnemental réduit ? \n\nCette session vous invite à explorer comment les valeurs et principes du Software Craftsmanship (artisanat logiciel) ouvrent la voie à un numérique plus responsable.\n\nÀ travers une brève introduction au numérique responsable, nous revisiterons chaque valeur du "**Manifesto for Software Craftsmanship**" sous cet angle, pour en tirer des leviers d’action concrets et immédiats. \n\nAu programme :\n- **Architecture Logicielle** : Concevoir des systèmes efficients et durables, appuyés par des référentiels qui nous guident.\n- **Pratiques de Développement** : Identifier les pratiques anti-gaspillage, favorisant un code de qualité tout en minimisant les ressources.\n- **Communauté de Pratiques** : Créer un espace pour échanger et adopter de nouvelles pratiques à impact positif.\n- **Outils de Facilitation** : Remettre en question nos idées et pratiques pour construire un numérique plus conscient.\n\nRejoignez-moi pour découvrir comment chaque ligne de code peut contribuer à une technologie plus responsable et donc un avenir durable pour toutes et tous !',
    dateStartStr: "2025-12-05T15:30:00.000+00:00",
    durationMinutes: 20,
    speakerIds: ["cm9n0w1i501ruo63maqfnft7g"],
    trackId: "bernard",
    language: "fr",
    level: "BEGINNER",
    formatId: "cm8fxewbi00qbqr3mdo7foy1h",
    categoryId: "cm8fxk82t00qhqr3m2gwuiaq2",
    hideTrackTitle: false,
  },
  {
    id: "cm9sayfd8027io63mgq4ei7dn",
    title: "Envie de booster ta carrière ? Open source-toi !",
    abstract:
      "Viens découvrir à travers une histoire vraie, comment une simple petite réponse dans un forum de discussion sur un projet méconnu peut complètement changer et accélérer ta carrière.",
    dateStartStr: "2025-12-05T15:05:00.000+00:00",
    durationMinutes: 20,
    speakerIds: ["cm9savh3v027co63mlkterzhq"],
    trackId: "niepce",
    language: "fr",
    level: "BEGINNER",
    formatId: "cm8fxewbi00qbqr3mdo7foy1h",
    categoryId: "cm8fxjv3o00qgqr3mngl0n2li",
    hideTrackTitle: false,
  },
  {
    id: "cm9sjc11l02kao63m1i741erl",
    title: "L'IOT pour 5 ans et + : atelier d'initiation sur carte micro:bit",
    abstract:
      "La carte micro:bit est une mini carte programmable créée en 2015 par la BBC avec pour objectif d'en distribuer aux écoliers britanniques afin de les initier au développement en bloc, javascript ou python.\nPeu chère, aux performances limitées, elle est dotées de plusieurs entrées / sorties permettant différents usages :\nDécouverte et apprentissage de l'informatique\nPrototypage / IoT\nEntrainement et perfectionnement au développement (kata, tests)\nPratique de l'algorithmie avec contraintes fortes (peu de mémoire, peu de cpu)\nEt surtout s'amuser\n\nVenez prendre en main cette petite carte très efficace, voir ses possibilités et imaginer ce que vous pouvez en faire.\nNous coderons ensemble un mini snake, nous jouerons avec les entrées / sorties et nous ferons même des katas d'algo.\n\nAprès cette session, vous n'aurez qu'une seule envie, continuer à coder sur la carte.",
    dateStartStr: "2025-12-05T13:00:00.000+00:00",
    durationMinutes: 110,
    speakerIds: ["cm9sjc10w02k7o63mbzci7k7l", "cm9sjc11i02k9o63m9ptdk92q"],
    trackId: "bernard",
    language: "fr",
    level: "BEGINNER",
    formatId: "cm8fxfxfc00qcqr3m410c87zu",
    categoryId: "cm90v7wak04v1qo3m74nkqbjj",
    hideTrackTitle: false,
  },
  {
    id: "cm9wtn21t03yqo63mf9z7jz9o",
    title:
      "Construire soi-même son clavier mécanique, idée bizarre ou idée de génie ?",
    abstract:
      "Après avoir longtemps voulu un clavier \"ergonomique\", j'ai décidé de me lancer moi-même dans sa construction \n\nCe que je ne savais pas, c'est que j'allais plonger dans le monde merveilleux des claviers mécaniques et du \"do it yourself\"\n\nOn sait tous utiliser le clavier standard AZERTY dit 100%, mais est-ce que cette disposition est encore pertinente en 2023 ?\n\nEn quoi faire son propre clavier peut être intéressant pour les développeurs et développeuses que nous sommes ?\n\nEt comment donc peut-on être efficaces avec des claviers de seulement 34 touches ?\n\nSurvolons ensemble les différentes options qui s'offrent à nous aujourd'hui.",
    dateStartStr: "2025-12-05T08:25:00.000+00:00",
    durationMinutes: 50,
    speakerIds: ["cm9wtn21q03ypo63m7hwo5c4s"],
    trackId: "recoura",
    language: "fr",
    level: "BEGINNER",
    formatId: "cm8fxehjm00qaqr3mi6qly25m",
    categoryId: "cm8fxjv3o00qgqr3mngl0n2li",
    hideTrackTitle: false,
  },
  {
    id: "cma064z9304mvo63m1dzzbvst",
    title: "La réactivité et les signaux : démystifions la magie du frontend",
    abstract:
      'Certaines choses dans l’univers resteront sans réponse, mais la réactivité et les signaux **ne devraient pas en faire partie**.\n\nDepuis plusieurs années, la réactivité (et son concept clé : les signaux) s’est imposée sur toute la scène frontend. Que ce soit dans **Vue.js**, **Angular**, **React**, **Svelte**, **Solid**, **Qwik**, ou **Preact**, ces notions sont partout. Pourtant, malgré leur popularité, il est souvent difficile de comprendre **ce qui se cache réellement derrière les signaux**.\n\nOn entend parler de _tracking_, de _proxies_, d’_états dérivés_, et même d’_effects_, mais… **de quoi parle-t-on vraiment** ? Comment ces mécanismes permettent-ils à des valeurs d’"écouter" et de réagir aux changements d’autres ? Quelle est cette "sorcellerie" qui met à jour nos interfaces **en temps réel**, simplement en assignant une nouvelle valeur à une variable ?\n\nDans cette session, plonge dans le monde fascinant (et parfois mystérieux) de la réactivité et des signaux. Ensemble, nous décortiquerons une bibliothèque comme **Alien Signals**, pour **démystifier ces concepts** et enfin comprendre la mécanique qui se cache derrière cette "magie" du frontend.',
    dateStartStr: "2025-12-05T09:20:00.000+00:00",
    durationMinutes: 50,
    speakerIds: ["cma064bhu04mso63m6e2k387j"],
    trackId: "paris",
    language: "fr",
    level: "ADVANCED",
    formatId: "cm8fxehjm00qaqr3mi6qly25m",
    categoryId: "cm8fxiayr00qdqr3meoylp50p",
    hideTrackTitle: false,
  },
  {
    id: "cma6xafq100c5po3mr3cjqb5y",
    title: "Démystifions la mise en production pour nos projets Open-Source",
    abstract:
      "Vos projets aussi restent en Localhost ?\n\nBien que le DevOps soit aujourd'hui une pratique incontournable dans les entreprises ; lorsqu'il s'agit de projets personnels, la mise en production reste un défi intimidant. Trop souvent, cet obstacle freine les développeurs individuels dans la concrétisation de leurs idées.\nLes défis d'un projet open-source diffèrent souvent de ceux rencontrés dans le cadre professionnel : budgets limités, technologies accessibles, infrastructure simplifiée. Il existe pourtant des solutions simples et open-source permettant de livrer rapidement et de manière fiable.\n\nCette conférence vise à : \n- Explorer une stack open-source complète pour l’industrialisation et livraison Continue (CI/CD)\n- Automatiser les bonnes pratiques (Qualité de code, Tests, Sécurité…)\n- Examiner les solutions d’hébergement disponibles : SaaS, Iaas, et orchestration.\n- Offrir des conseils pratiques pour propulser des projets personnels jusqu’en production.",
    dateStartStr: "2025-12-05T09:20:00.000+00:00",
    durationMinutes: 50,
    speakerIds: ["cma6xafpx00c4po3mj21rns21"],
    trackId: "niepce",
    language: "fr",
    level: "BEGINNER",
    formatId: "cm8fxehjm00qaqr3mi6qly25m",
    categoryId: "cm8fxjmkl00qfqr3m1nist70w",
    hideTrackTitle: false,
  },
  {
    id: "cmbkqaf8802zzp93mr6n3hr5l",
    title: "Ce que les IDE ne veulent pas que vous sachiez!",
    abstract:
      "De nos jours, les développeurs utilisent des IDE hyper complets, avec des centaines de fonctionnalités pré-configurées pour une prise en main simple et rapide. Mais vous êtes-vous déjà demandé comment ces outils fonctionnent vraiment ? Par exemple : Comment fonctionne la coloration syntaxique ? Comment trouve-t-il les utilisations de vos fonctions ou classes ? Comment détecte-t-il les erreurs dans votre code ? Et comment fonctionne l'autocomplétion ?\n\nSi vous aimez comprendre comment les choses fonctionnent sous le capot, ce talk est fait pour vous !\n\nNous allons explorer et configurer un IDE *from scratch*, en utilisant Neovim. Neovim est un éditeur de texte basé sur Vim, avec l'avantage de pouvoir ajouter des plugins pour le transformer en un véritable IDE sans jamais quitter le terminal ! (Le rêve de tout développeur !)\n\nÀ la fin de ce talk, vous pourrez :\n- Voir les IDE sous un autre angle, loin de la boîte noire\n- Configurer un IDE de base, entièrement dans votre terminal, avec Neovim",
    dateStartStr: "2025-12-05T15:55:00.000+00:00",
    durationMinutes: 50,
    speakerIds: ["cmbkqaf8602zyp93mm8ah86cd"],
    trackId: "recoura",
    language: "fr",
    level: "BEGINNER",
    formatId: "cm8fxehjm00qaqr3mi6qly25m",
    categoryId: "cm8fxkkdc00qiqr3m4btxoakk",
    hideTrackTitle: false,
  },
  {
    id: "cmbkyumz103e3p93munlr6l3n",
    title: "Du jeu vidéo à l’industrie en passant par la XR",
    abstract:
      "Retour sur mon parcours de mes études avec la découverte de la prog, et la passion des moteurs de jeux vidéo à la création de la société Da Viking Code.\nDu jeu vidéo nous travaillons également déromais dans des domaines comme l'industrie, la santé, la formation... en utilisant des technos du JV : moteurs 3D temps réel, réalité virtuelle, IA...\n\nDécouverte des technos du JV, comment push ton des pixels à l'écran ? Comment avoir des milliers de particules ? Le pooling. Un peu de maths...\nLes optis, les contraintes du mobile, la physique... Le web et le WebGL (de Flash à WebGPU).\nLa 3D.\nL'expérience utilisateur, l'interactivité...",
    dateStartStr: "2025-12-05T10:30:00.000+00:00",
    durationMinutes: 50,
    speakerIds: ["cmbkyumyy03e2p93m0u7eh5ld"],
    trackId: "recoura",
    language: "fr",
    level: "BEGINNER",
    formatId: "cm8fxehjm00qaqr3mi6qly25m",
    categoryId: "cm8fxiayr00qdqr3meoylp50p",
    hideTrackTitle: false,
  },
  {
    id: "cmbl61bx403hlp93myu19ilbf",
    title: "Une petite histoire du DevSecOps avec Trivy 🔎🔗",
    abstract:
      "Face à l'augmentation des cybermenaces, il est devenu **important et stratégique de protéger** les applications et leurs infrastructures. \nDans ce cas, le **DevSecOps** permet d’intégrer la sécurité dès les premières étapes du cycle de développement et de faire des livraisons rapides et plutôt \"sécure\".\n\nCependant, l’intégration de la sécurité dès le début du cycle de développement **peut être un défi**. Comment démarrer ? Comment s’y prendre ? Quels process pouvons-nous mettre en place ? Quels sont les bons repères ? Et enfin quels outils du monde de la sécurité peuvent être fiables et facilement intégrables dans un CICD ? \n\nUne petite histoire du DevSecOps avec Trivy est **un retour d’expérience sur l’intégration et l’utilisation d’un scanner de sécurité open source** dans le cas de la **création d’images Docker personnalisée** pour une équipe de développement.\nDans cette histoire présentée **sous forme de démo live**, nous verrons ensemble le fort potentiel de l’outil Trivy et comment celui-ci s’intègre aisément dans un process de création d’image Docker jusqu’à leur livraison.\n\nEn partant de la conception d'une image (Dockerfile) et en passant par l'analyse des composants systèmes (librairie système, outils natifs ou installés) d'images personnalisées (Phase Post build image) , puis en passant par **la génération et de l'analyse des SBOMS** (Software Bill Of Materials) et en terminant par **la génération automatisée d'un rapport des failles de sécurités** des images et de leurs dépendances sous différents formats (Markdown, Word,etc.).\n\nNous terminerons en parlant de **l'intégration des SBOMS et de leur analyse via Trivy Server** directement dans l'outil **Dependency Track**\n\nTout, tout, tout, vous saurez tout sur le **shifting left security** avec Trivy ! (ou presque)",
    dateStartStr: "2025-12-05T15:55:00.000+00:00",
    durationMinutes: 50,
    speakerIds: ["cmbl5zokj03hgp93m66xbf2z8"],
    trackId: "bernard",
    language: "fr",
    level: "INTERMEDIATE",
    formatId: "cm8fxehjm00qaqr3mi6qly25m",
    categoryId: "cm8fxjmkl00qfqr3m1nist70w",
    hideTrackTitle: false,
  },
  {
    id: "cmbl60hms03hjp93mvwtbdyfz",
    title: "Le bien-être: le nouvel enjeu du software development ? ❤️💻",
    abstract:
      "Le **bien-être** au travail devient un sujet **de plus en plus évoqué** dans les entreprises. \n\nDu code à la mise en production, quels sont **les impacts de nos pratiques actuelles** sur notre bien-être ? Quels constats pouvons-nous faire en 2025 ? 🤔\n\nPrenons conscience des **conséquences de notre quotidien de travail sur notre charge cognitive**. Mais également, sur notre motivation ou sur nos capacités de concentration. 🧠 ⚡\n\nConstatons ensemble les **impacts positifs de la maintenance de code** sur votre charge mentale. Observons comment votre **contexte de travail et le leadership peuvent influencer votre capacité de concentration** et votre productivité. Et voyons si des opportunités de 2025, **comme la GenIA ou le DevEx**, ont réellement leur place pour donner les moyens à une organisation de soutenir et soulager les équipes. Le tout agrémenté de sources et d’études pour argumenter la mise en œuvre de ces pratiques. \n\nLe bien-être devient **une nécessité** pour les entreprises, **et non plus une option** 👍",
    dateStartStr: "2025-12-05T10:30:00.000+00:00",
    durationMinutes: 50,
    speakerIds: ["cmbl5zokj03hgp93m66xbf2z8"],
    trackId: "niepce",
    language: "fr",
    level: "INTERMEDIATE",
    formatId: "cm8fxehjm00qaqr3mi6qly25m",
    categoryId: "cm8fxjv3o00qgqr3mngl0n2li",
    hideTrackTitle: false,
  },
  {
    id: "cmbt053kb02ncqt3mcju9f2pp",
    title: 'Voyage au bout des APIs IO de Linux (de "poll" à "io uring")',
    abstract:
      "Que l’on travaille avec des bases de données, des serveurs web ou même que l’on lise simplement des fichiers, on retrouvera toujours sous Linux les mêmes API en dessous : « poll » ou « select » pour les plus anciens d’entre nous, « epoll » pour les plus récents.\n\nMais depuis 2019, une révolution bouscule le monde Linux et propose une alternative à ces API historiques : il s’agit de « io_uring ».\n\nAu cours de cette conférence, nous vous expliquerons, via un exemple simple (une socket) et du code, les différentes API Linux, leurs évolutions et les problématiques que ces évolutions résolvent.",
    dateStartStr: "2025-12-05T08:25:00.000+00:00",
    durationMinutes: 50,
    speakerIds: ["cmbt053jt02n9qt3myrhmn217", "cmbt053k902nbqt3mh07s04nz"],
    trackId: "paris",
    language: "fr",
    level: "INTERMEDIATE",
    formatId: "cm8fxehjm00qaqr3mi6qly25m",
    categoryId: "cm8fxj4cj00qeqr3m3xph6k7n",
    hideTrackTitle: false,
  },
  {
    id: "cmbwcykv6008wpc3md260wuzl",
    title: "Et si on avait plus à vendre qu'une simple stack?",
    abstract:
      "Le monde du dev est totalement techno-centré.\nAffichez votre spécialisation technique et vous verrez les regards changer de teintes selon que vous prononciez les termes Php, Java, React ou Haskell...\nUn tel engagement envers une stack technique finit souvent par ressembler à un choix de confession religieuse qu'on va devoir garder à vie.\n\nAprès plus de 15 ans sur .NET, j'ai eu la possibilité d'intégrer un projet Java.\nComment je me suis retrouvé là? Pourquoi j'ai fait le choix de Java plutôt qu'un autre écosystème?\nQu'est-ce que cette expérience m'a appris sur les fondamentaux de nos expertises techniques? Tant sur la façon de les acquérir que sur celle de les valoriser sur le marché du travail?\nA l'heure d'une remise en question profonde de nos avenirs en tant que dev, il est peut-être temps de se poser une simple question: \"Que me reste-t-il si on me retire ma stack technique?\".",
    dateStartStr: "2025-12-05T09:20:00.000+00:00",
    durationMinutes: 50,
    speakerIds: ["cmbwcykv2008vpc3mthd61brl"],
    trackId: "recoura",
    language: "fr",
    level: "BEGINNER",
    formatId: "cm8fxehjm00qaqr3mi6qly25m",
    categoryId: "cm8fxkkdc00qiqr3m4btxoakk",
    hideTrackTitle: false,
  },
  {
    id: "cmby2ta6902j3pc3mkup4ug1g",
    title:
      "Hands on HTMX et Web Components : un combo parfait pour le développement web",
    abstract:
      "Cet atelier explore htmx 2.0 à travers une approche pratique pour simplifier le développement frontend. Vous découvrirez ses nouvelles fonctionnalités grâce à du live coding et des exercices interactifs, en commençant par une introduction rapide à ses concepts clés et ses mises à jour. Des exemples concrets et des extraits de code vous montreront comment htmx facilite les tâches courantes du frontend.\n\nEnsuite, vous apprendrez à créer des Web Components réutilisables avec la bibliothèque Lit, en suivant un exercice guidé pour concevoir un élément simple et l’intégrer dans un projet.\n\nDans la seconde partie, nous verrons comment htmx et les Web Components Lit peuvent être combinés efficacement. À l’aide d’exemples progressifs, vous apprendrez à construire des composants modulaires et maintenables avec un minimum de JavaScript. À la fin, vous comprendrez comment ces outils se complètent et aurez la confiance nécessaire pour les utiliser dans vos propres projets.",
    dateStartStr: "2025-12-05T08:25:00.000+00:00",
    durationMinutes: 110,
    speakerIds: ["cmby2s80v02iqpc3mo3losj85"],
    trackId: "bernard",
    language: "fr",
    level: "BEGINNER",
    formatId: "cm8fxfxfc00qcqr3m410c87zu",
    categoryId: "cm8fxiayr00qdqr3meoylp50p",
    hideTrackTitle: false,
  },
  {
    id: "cmc4lqonq0029m73mjzvn23or",
    title: "La classification par similarité : Comment se passer des LLM",
    abstract:
      "A l’heure où les LLM prennent la plus grande part de marché des solutions d’IA, ils sont vus comme des solveurs généraux sur toute tâche impliquant du langage naturel. Seulement, cela soulève plusieurs problématiques. Ces modèles représentant une taille mémoire conséquente et une puissance de calcul démesurée, le client se trouve dépendant du fournisseur, de ses conditions en termes de sécurité des données, de disponibilité et de fluctuation des prix. De plus, pour des tâches longues ils se montrent parfois lents et assez opaques quant aux traitements effectués.\nLa classification de plaintes utilisateurs entre pleinement dans ce contexte. De nombreuses solutions existent, mais peu offrent une facilité de mise en place ainsi qu’un contrôle sur les modèles et les données qui sont ou seront déployés. Aussi, ceux-ci requièrent généralement des données labellisées et homogènes, qui ne sont pas toujours disponibles en conditions réelles.\nCette présentation vient traiter d’une situation courante chez le client : Une grande quantité de données non labellisées dans une entreprise pour laquelle la protection des données est un enjeu majeur. La solution proposée devait donc présenter ces caractéristiques clés :\n\n* Apprentissage non supervisé\n* Faible en coût et s’appuyant sur des options gratuites et open source\n* Exécution locale\n* En outre, le temps total d’exécution s’en trouve fortement réduit et la consommation d’énergie nécessaire à l’exécution est négligeable en comparaison à un LLM, justifiant le développement d’une solution à part entière.\n* Pour cela, j’utilise des modèles de vectorisation ouverts, dont la particularité est de rapprocher les mots dont la sémantique est similaire. Plusieurs possibilités s’offrent alors, selon ce que le métier aura mis à disposition : catégories déjà définies, messages partiellement labellisés… Le processus ensuite mis en place peut mettre en œuvre des algorithmes de clustering, ou un simple système de récupération vectorielle à travers des vector stores. Le rapprochement a déjà été fait par le modèle, le reste du traitement dépend alors des exigences et des spécificités de chaque projet. La solution ici proposée s’appuie donc sur des outils déjà bien répandus et montre une forte robustesse au changement, notamment l’ajout de catégories.\n\n",
    dateStartStr: "2025-12-05T15:30:00.000+00:00",
    durationMinutes: 20,
    speakerIds: ["cmc4lqonj0028m73mo0b45y9c", "cmb7htz0r012kog3mqcsz380j"],
    trackId: "paris",
    language: "fr",
    level: "INTERMEDIATE",
    formatId: "cm8fxewbi00qbqr3mdo7foy1h",
    categoryId: "cm90v97ub04v2qo3mb56jezst",
    hideTrackTitle: false,
  },
  {
    id: "cmc2fdl9100i9ol3myoikun9h",
    title: "Rendre ses tests concis et évolutifs grâce à JUnit & cie",
    abstract:
      "Après avoir développé une nouvelle fonctionnalité, on passe souvent par une phase de refactoring pour essayer de trouver une meilleure implémentation. Mais peut-être qu’on oublie parfois d’améliorer aussi les tests ?\n\nUne fois écrits, ces tests serviront non seulement à détecter de potentiels bugs, mais aussi à documenter un comportement et à apporter de la confiance à l’équipe lors des développements suivants. Pour remplir ces fonctions cruciales, une suite de tests doit être lisible, compréhensible, rapidement exécutable, et doit pouvoir être enrichie le plus simplement possible.\n\nVoyons comment tirer parti d’outils tels que JUnit, AssertJ ou Spring Test pour atteindre ces objectifs !",
    dateStartStr: "2025-12-05T13:00:00.000+00:00",
    durationMinutes: 50,
    speakerIds: ["cmc2fdl8y00i8ol3mtdv7rhil"],
    trackId: "recoura",
    language: "fr",
    level: "INTERMEDIATE",
    formatId: "cm8fxehjm00qaqr3mi6qly25m",
    categoryId: "cm8fxj4cj00qeqr3m3xph6k7n",
    hideTrackTitle: false,
  },
  {
    id: "cmcahhw51005bnz3mfla0avhn",
    title: "Comment hacker le contrôle d'accès de mon entreprise ?",
    abstract:
      "De plus en plus d'employeurs utilisent le contrôle d'accès pour autoriser leurs employés à pénétrer dans les locaux. Petit problème : la plupart du temps, les systèmes qui semblent sécurisants ne sont pour autant pas toujours sécurisés. Avec le manque de connaissances hardware, le sujet tombe vite dans les points à traiter ... Je vous propose de vous montrer les failles du système et surtout comment se prémunir en utilisant les bonnes technologies.",
    dateStartStr: "2025-12-05T15:30:00.000+00:00",
    durationMinutes: 20,
    speakerIds: ["cmcahhw4z005anz3m641hh7x0"],
    trackId: "recoura",
    language: "fr",
    level: "INTERMEDIATE",
    formatId: "cm8fxewbi00qbqr3mdo7foy1h",
    categoryId: "cm90v7wak04v1qo3m74nkqbjj",
    hideTrackTitle: false,
  },
  {
    id: "cmcand42200amnz3mm1jkttfh",
    title:
      "Quand une licorne trébuche : hériter d’un projet legacy, bâtir un changement",
    abstract:
      "Imaginez une licorne flamboyante. Le temps passe et, peu à peu, certaines pratiques de conception et de développement sont mises de côté. Les investissements s'amenuisent, les technologies prennent du retard, et des vulnérabilités de sécurité émergent.\nEt devinez quoi ? C'est à vous de prendre en main cette licorne atypique.\n \nVous vous demandez sûrement : vais-je m’ennuyer ? Vais-je perdre mon temps ? Est-ce un piège ou une opportunité ?\nEt si, au contraire, cette mission était une véritable mine d’or pour booster vos compétences, expérimenter des idées, et même… innover ?\n \nForte de mes expériences, je vous partagerai des conseils pratiques pour en sortir grandi. Ensemble, nous découvrirons comment dépasser ces doutes et transformer cette licorne expérimentée en un tremplin pour votre carrière.\nAlors, qui parmi vous relèvera ce défi pour bâtir l’après ?",
    dateStartStr: "2025-12-05T15:05:00.000+00:00",
    durationMinutes: 20,
    speakerIds: ["cmcand41y00alnz3m8yp005us"],
    trackId: "recoura",
    language: "fr",
    level: "BEGINNER",
    formatId: "cm8fxewbi00qbqr3mdo7foy1h",
    categoryId: "cm8fxkkdc00qiqr3m4btxoakk",
    hideTrackTitle: false,
  },
  {
    id: "cmcbvmw71006cpb3mu5t5nsm9",
    title:
      "Le secret des 10x devs enfin révélé (spoiler : c’est pas du talent)",
    abstract:
      "Tu crois que les 10x devs sont des génies solitaires tombés dans l’optimisation quand ils étaient petits ?\nEt si je te disais qu’en réalité, c’est souvent juste une question de rigueur, de process, et… de gestion de notifications Slack ?\n\nDans ce talk, je t’explique pourquoi le mythe du “crack” te dessert (oui, toi, jeune padawan), et je te donne 10 habitudes simples et puissantes pour hacker ta productivité comme les pros.\nAvec de l’humour, des memes, et (presque) aucune mention de ChatGPT.",
    dateStartStr: "2025-12-05T15:55:00.000+00:00",
    durationMinutes: 50,
    speakerIds: ["cmcbvmw6x006bpb3mpfb4u293"],
    trackId: "niepce",
    language: "fr",
    level: "BEGINNER",
    formatId: "cm8fxehjm00qaqr3mi6qly25m",
    categoryId: "cm8fxkkdc00qiqr3m4btxoakk",
    hideTrackTitle: false,
  },
  {
    id: "cmcbzm941007tpb3mglgykdfw",
    title: "CSR, SSR, SSG, ISR... SOS ! Le guide de survie du rendu web",
    abstract:
      "**Chaque jour, un nouveau framework JavaScript sort avec sa méthode de rendu révolutionnaire, et pourtant on n'a toujours pas trouvé LA solution parfaite.**\n\nEntre CSR, SSR, SSG, ISR, streaming HTML, hydration et autres acronymes mystérieux, le rendu web est devenu un véritable casse-tête. Chaque framework promet LA solution ultime, mais au final : les sites sont toujours plus lourds, les utilisateurs attendent plus longtemps, et les équipes passent plus de temps à configurer qu'à développer.\n\n**Le vrai enjeu ?** Nous avons perdu de vue l'essentiel : afficher du contenu rapidement et efficacement. Entre la course aux nouveautés et la complexité croissante, on oublie parfois que la performance web, c'est avant tout une question de simplicité.\nCette présentation démystifie les méthodes de rendu actuelles avec des explications claires et des exemples concrets. \n\n**Vous découvrirez :**\n* Les vrais avantages et inconvénients de chaque approche\n* Un guide pratique pour choisir la méthode adaptée à votre projet\n* Pourquoi la simplicité est souvent la meilleure solution (et comment l'appliquer)\n\n**Objectif : reprendre le contrôle de vos choix techniques et offrir une meilleure expérience à vos utilisateurs !**",
    dateStartStr: "2025-12-05T13:55:00.000+00:00",
    durationMinutes: 50,
    speakerIds: ["cmcbzm93y007spb3mkeqp3faj"],
    trackId: "niepce",
    language: "fr",
    level: "INTERMEDIATE",
    formatId: "cm8fxehjm00qaqr3mi6qly25m",
    categoryId: "cm8fxiayr00qdqr3meoylp50p",
    hideTrackTitle: false,
  },
  {
    id: "cmcd9f4mc006lo83mjrc7f3tp",
    title: "Les équipes distribuées, ça peut marcher?",
    abstract:
      "Est-il nécessaire de passer le plus clair de son temps dans des réunions vidéo pour qu'une équipe distribuée fonctionne? Les communautés Open Source démontrent que la réponse et non, et les techniques de collaboration qu'elles ont développé s'appliquent aussi bien en entreprise.\n\nSur la base d'exemples concrets, réussite ou échecs, ainsi que de plus de 20 ans d'expérience dans ce domaine, vous découvrirez comment les techniques de prise de décisions asynchrone, la communication claire et concise, l'attention aux éléments multi-culturels et la bienveillance dans les relations sont déterminants pour une collaboration efficace à distance.\n\nCes techniques s'appliquent à tout type de projet, mais il n'y a pas de solution unique. Mieux comprendre les principes et outils de base vous aidera à adapter nos recommendations à votre propre environmment.",
    dateStartStr: "2025-12-05T13:00:00.000+00:00",
    durationMinutes: 50,
    speakerIds: ["cmcd8jqax0058o83mnnxjes8a"],
    trackId: "niepce",
    language: "fr",
    level: "INTERMEDIATE",
    formatId: "cm8fxehjm00qaqr3mi6qly25m",
    categoryId: "cm8fxkkdc00qiqr3m4btxoakk",
    hideTrackTitle: false,
  },
  {
    id: "cmchd14d500gdth3mncldz801",
    title: "Construire des logiciels fiables basés sur des APIs douteuses",
    abstract:
      "Qui n'a jamais écrit un hack pour gérer les défaillances d'une API externe ?\n\nLes deux causes principales de panne logicielle sont les erreurs humaines et les services externes. Consommant bon nombre d'APIs externes de qualité… variable, notre qualité de service dépend souvent de celle des services tiers, qu'on ne maîtrise pas (ou pas complètement). Et in fine, nos clients nous jugent (à raison) sur la disponibilité du service final.\n\nCe talk présente un retour d'expérience de notre évolution depuis une approche ad hoc vers une solution structurée, répétable (et open-source). Comment nous sommes passé, en prod, du petit hack dans un coin à un service dédié, montrant les avantages et les inconvénients de chaque approche, et les alternatives existantes.",
    dateStartStr: "2025-12-05T13:55:00.000+00:00",
    durationMinutes: 50,
    speakerIds: ["cmchd14d000gcth3mwbbxo4iv"],
    trackId: "recoura",
    language: "fr",
    level: "INTERMEDIATE",
    formatId: "cm8fxehjm00qaqr3mi6qly25m",
    categoryId: "cm8fxjmkl00qfqr3m1nist70w",
    hideTrackTitle: false,
  },
  {
    id: "cmci20pq3010nth3m4ir84jmc",
    title: "Les coulisses de JavaScript : ce qu’on utilise sans comprendre 🎭",
    abstract:
      "Bienvenue dans les coulisses d’un des plus grand spectacle du développement web : **JavaScript 🪄** Sur scène, tout semble magique : les animations captivent, les promesses sont tenues, et tout s’exécute sans accroc. Mais derrière le rideau, une véritable troupe travaille sans relâche pour donner vie à ce spectacle.\n\nDans cette visite guidée, nous vous invitons à lever le rideau sur la mécanique de JavaScript : son engine, la scope chain, son incontournable event loop, les contextes d’exécution, et bien sûr, ses fameuses promesses. Ces concepts vous sont peut-être familiers, mais n’est-il pas temps d’un peu mieux les comprendre ?\n\nPrenez vos billets et plongez avec nous dans les rouages fascinants de JavaScript 🎟️",
    dateStartStr: "2025-12-05T15:55:00.000+00:00",
    durationMinutes: 50,
    speakerIds: ["cmch9e1cl00fsth3mcz6w1dox", "cmbo3grzx0034qt3mahf7d1vp"],
    trackId: "paris",
    language: "fr",
    level: "BEGINNER",
    formatId: "cm8fxehjm00qaqr3mi6qly25m",
    categoryId: "cm8fxiayr00qdqr3meoylp50p",
    hideTrackTitle: false,
  },
  {
    id: "cmcjf8msm010eoe3mig4l6a33",
    title: "Tester c'est tricher",
    abstract:
      'Dans le monde du développement logiciel, la pyramide des tests est un modèle souvent pris pour acquis. Pourtant, est-elle vraiment la clé pour garantir une couverture de tests optimale et une maintenance efficace ? Ce talk propose de questionner ce modèle en montrant que "tester, c\'est tricher" si l\'on se limite à une vision traditionnelle des tests.\n\nÀ travers des exemples concrets et des démonstrations en live, nous explorerons les limites de la pyramide des tests. Nous verrons pourquoi il est essentiel de revoir la place des tests end-to-end (E2E) et comment une bonne stratégie de test repose sur la compréhension des comportements plutôt que sur une approche quantitative. Le tout avec une approche pragmatique qui met l\'accent sur la valeur ajoutée des tests et leur impact à long terme.\n\nNous proposerons des réponses aux questions souvent évoquées:\n\n- "Est-ce que tester avec des mocks c\'est moins bien que sans ?"\n- "Est-ce compliqué de setup une stack de tests E2E en 2025 ?"\n- "Est-ce que le test coverage est une metric intéressante ?"\n- "Quels outils on recommande dans un stack de test en 2025 ?"\n\nCe talk s\'adresse aux développeurs, testeurs et architectes qui souhaitent repenser leur manière d\'aborder les tests, tout en optimisant le temps de développement et la qualité du produit. L\'objectif est de leur fournir des clés pour construire une stratégie de test adaptée à leurs besoins, afin de maximiser la valeur de leurs tests tout en minimisant les coûts et les efforts de maintenance.',
    dateStartStr: "2025-12-05T10:30:00.000+00:00",
    durationMinutes: 50,
    speakerIds: ["cmcjf8mrz010boe3m549h7l92", "cmcjf8msk010doe3mmu61c39k"],
    trackId: "paris",
    language: "fr",
    level: "BEGINNER",
    formatId: "cm8fxehjm00qaqr3mi6qly25m",
    categoryId: "cm8fxkkdc00qiqr3m4btxoakk",
    hideTrackTitle: false,
  },
  {
    id: "cmcjf99p6010goe3mte3i6q1w",
    title: "Sécurisons nos utilisateurs grâce au Mozilla Observatory",
    abstract:
      "Assurer la sécurité d'une application web est une tâche complexe qui nécessite une attention particulière. Il est difficile de savoir si son site web est suffisamment protégé et s'il respecte les normes de sécurité habituelles. Pour aider les propriétaires de sites web à évaluer leur sécurité, la fondation Mozilla propose un outil d'audit gratuit qui permet de vérifier rapidement si son site web respecte un ensemble de règles de sécurité.\n\nCependant, il est important de noter que l'utilisation de l'outil d'audit ne suffit pas à garantir la sécurité de votre site web. Si toutefois les propriétaires de sites web suivaient les pratiques de sécurité recommandées, le web serait déjà beaucoup plus sûr pour tous.\n\nDans le cadre d'un livecoding, je vous invite à suivre mes instructions pour améliorer la sécurité de votre site web. Nous allons travailler ensemble pour passer votre site web d'un niveau F à un niveau A+ dans le Mozilla Observatory.",
    dateStartStr: "2025-12-05T08:25:00.000+00:00",
    durationMinutes: 50,
    speakerIds: ["cmcjf8msk010doe3mmu61c39k"],
    trackId: "niepce",
    language: "fr",
    level: "BEGINNER",
    formatId: "cm8fxehjm00qaqr3mi6qly25m",
    categoryId: "cm8fxkkdc00qiqr3m4btxoakk",
    hideTrackTitle: false,
  },
  {
    id: "cmcjl2hu701g1oe3myt1d3npm",
    title:
      "Tout déléguer, mais à quel prix ? Les vrais chiffres derrière un bon outillage",
    abstract:
      "_\"Combien ça coûte de complètement outiller le cycle de vie d'une application et les développeurs travaillant dessus ?\"_ —  Vous aurez la réponse en sortant de ce talk !\n\n**Déléguer un maximum** à des services managés & SaaS tout ce qui n'est pas de la logique métier, c'est sans l'ombre d'un doute très pratique et plein d'avantages… mais combien ça coûte vraiment au bout du compte ?\n\nChez PayFit, licorne scale-up française disposant de forts moyens d'investissements, nous avons eu la chance de pouvoir faire le pari de joyeusement déléguer tout ce que nous pouvions, et de nous acheter une certaine tranquillité d'esprit. Dans ce talk, venez découvrir **les vrais chiffres de PayFit en tout transparence**, y compris le coût \"par développeur\" — un exercice trop rarement fait !\n\nDe l'hébergement des applications à l'outillage des développeurs en passant par l'automatisation du cycle de vie d'une application, nous parlerons des coûts d'AWS, CircleCI, Raenovate, Datadog, Launchdarkly, GitHub (et Copilot), licences d'IDE, et plus généralement des …  **81 (!) outils tiers** sur lesquels PayFit repose, ce panorama se voulant aussi exhaustif que possible.\n\nAu-delà des coûts unitaires, nous explorerons également comment maintenir un certain contrôle et éviter un flagrant gâchis de moyens sans pour autant nuire à l'efficacité et au confort.",
    dateStartStr: "2025-12-05T13:55:00.000+00:00",
    durationMinutes: 50,
    speakerIds: ["cmcjjxzp101dmoe3mhpuj78ip"],
    trackId: "paris",
    language: "fr",
    level: "BEGINNER",
    formatId: "cm8fxehjm00qaqr3mi6qly25m",
    categoryId: "cm8fxkkdc00qiqr3m4btxoakk",
    hideTrackTitle: false,
  },
  {
    id: "f3z3JEMn83zSS0MrC9KZ",
    title:
      "Devenez l'enquêteur intraitable qui réduit le coût de vos anomalies visuelles",
    abstract:
      "Bob, détective des pixels, traque tout ce qui cloche : un produit défectueux dans une usine, une image violente sur un réseau social, ou encore une zone suspecte sur une radio médicale. Trois univers, un même enjeu : détecter automatiquement l’anomalie avant qu’elle ne coûte — que ce soit en argent, en sécurité ou en santé.\n\nEn ce moment, son urgence est industrielle : une chaîne de production de vis, où reflets, ombres et parasites visuels brouillent les pistes. Comment distinguer le vrai défaut du simple bruit ?\nBob, fidèle aux méthodes traditionnelles, se perd encore dans les fausses alertes. Puis, il mise sur les Vision Transformers qui s’avèrent plus efficaces.\n\nDans cette session, vous suivrez l’enquête de Bob pour comprendre comment automatiser la détection d’anomalies. Vous découvrirez comment un algorithme peut comprendre une image, et deux méthodes qui permettent de détecter des anomalies visuelles. Puis, nous terminerons l’enquête en confrontant et évaluant ces méthodes afin de dégager celle qui offre la précision la plus implacable.\n\nÀ l’issue de cette session, vous repartirez avec l’œil d’un détective : les anomalies se cachent dans tous les sujets qui vous entourent — et vous ne les verrez plus de la même façon.\n",
    dateStartStr: "2025-12-05T15:05:00.000+00:00",
    durationMinutes: 20,
    speakerIds: ["UxbZKeJnjcSVnmJB2tHv"],
    trackId: "paris",
    language: "fr",
    level: "INTERMEDIATE",
    formatId: "cm8fxewbi00qbqr3mdo7foy1h",
    categoryId: "cm90v97ub04v2qo3mb56jezst",
    hideTrackTitle: false,
  },
  {
    id: "VTTGLQDHLnJmYtKZY8GX",
    title:
      "Et si vos données SQL devenaient un assistant IA pour vos utilisateurs ?",
    abstract:
      "Vos bases de données SQL regorgent d'informations précieuses : données métier, suivi opérationnel, données clients… Mais trop souvent, elles restent réservées à quelques personnes expertes capables de manier SQL, ou accessibles uniquement via des interfaces parfois rigides et peu intuitives. Imaginez que n'importe quel collaborateur ou même client puisse y accéder simplement, en posant une question en langage naturel.\nC'est à partir de cette idée qu'un agent conversationnel a été créé : il transforme une requête libre en une réponse claire, contextualisée et directement issue de la base de données.\nDans ce talk, je reviendrai sur les grandes étapes de l'architecture : comment passer du langage naturel à une requête SQL fiable, comment gérer les erreurs les plus courantes, et surtout comment assurer des réponses utiles et rapides. Je partagerai également les principaux défis rencontrés et les leviers que j'ai mis en place pour améliorer la robustesse et la performance de l'agent.\nUn retour d'expérience concret pour toutes celles et ceux qui veulent donner une nouvelle voix à leurs données SQL et transformer ce capital dormant en un véritable levier de valeur, que ce soit en interne pour leurs équipes ou en externe pour leurs clients.",
    dateStartStr: "2025-12-05T15:05:00.000+00:00",
    durationMinutes: 20,
    speakerIds: ["Z1ENzl4J9ubwck0zoQPw"],
    trackId: "bernard",
    language: "fr",
    level: "BEGINNER",
    formatId: "cm8fxewbi00qbqr3mdo7foy1h",
    categoryId: "cm90v97ub04v2qo3mb56jezst",
    hideTrackTitle: false,
  },
];
