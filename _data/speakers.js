/**
 * Inspiré des données JSON de OpenPlanner.fr
 * Chemin : speakers
 * Modifications :
 * - mettre un bel id (slug du nom)
 * - télécharger et faire une version optimisée des photos (128x128) et modifier photoUrl
 * - ajuster les bio (Markdown possible)
 * - compléter jobTitle
 *
 * Cette donnée sera parsée/complétée pour avoir une donnée "speakers"
 */

/**
 * @type {import('./types.js').Speaker[]}
 */
const speakers = [
  {
    id: "UxbZKeJnjcSVnmJB2tHv",
    name: "Théo Moreau",
    bio: null,
    company: "OCTO Technology",
    jobTitle: "Data scientist",
    photoUrl: "/avatars/theo-moreau.webp",
    socials: [
      {
        id: "linkedin",
        name: "linkedin",
        link: "https://www.linkedin.com/in/th%C3%A9o-moreau-53842a234/",
      },
    ],
  },
  {
    id: "Z1ENzl4J9ubwck0zoQPw",
    name: "Thibault Boutet",
    bio: null,
    company: null,
    jobTitle: "AI Engineer | Machine Learning Engineer",
    photoUrl: "/avatars/thibault-boutet.webp",
    socials: [
      {
        id: "linkedin",
        name: "linkedin",
        link: "https://www.linkedin.com/in/thibault-boutet/",
      },
    ],
  },
  {
    id: "cm9jwhw4u013vo63mpy91wb74",
    name: "Dorian Lamandé",
    bio: "Dorian, à la fois formateur et leader d'équipe partage avec enthousiasme ses compétences humaines et techniques pour inspirer et guider chacun vers l'exploitation totale de leurs capacités.",
    photoUrl: "/avatars/dorian-lamande.webp",
    socials: [
      {
        id: "github",
        name: "github",
        link: "https://github.com/dlamande",
      },
    ],
  },
  {
    id: "cm9jzdorn0169o63mloy3mv0k",
    name: "Emmanuelle Aboaf",
    bio: "Sourde de naissance, bionique (deux implants cochléaires) et surtout développeuse Fullstack Angular .NET chez Shodo, je lutte chaque jour pour l’accessibilité. Dans mon monde idéal, tout doit être accessible aussi bien dans la vraie vie que sur le Web.",
    company: null,
    jobTitle: null,
    photoUrl: "/avatars/emmanuelle-aboaf.webp",
    socials: [],
  },
  {
    id: "cm9n0w1i501ruo63maqfnft7g",
    name: "Yoan Thirion",
    bio: "J'accompagne les équipes pour qu'elles s'améliorent dans la livraison de logiciels grâce aux pratiques Craft et Agile. \nJe les forme et les aide à mettre en œuvre des pratiques telles que Scrum, Kanban, XP, Domain Driven Design, Clean Code et bien d'autres encore...",
    company: "Coda School",
    jobTitle: null,
    photoUrl: "/avatars/yoan-thirion.webp",
    socials: [
      {
        id: "github",
        name: "github",
        link: "https://github.com/ythirion",
      },
      {
        id: "linkedin",
        name: "linkedin",
        link: "https://www.linkedin.com/in/yoanthirion/",
      },
      {
        id: "x",
        name: "x",
        link: "https://x.com/yot88",
      },
    ],
  },
  {
    id: "cm9savh3v027co63mlkterzhq",
    name: "David Pilato",
    bio: "David est évangéliste (devrel) chez Elastic depuis 2013. Il anime la communauté française autour d'#Elasticsearch et organise des [BBLs](https://david.pilato.fr/blog/2024-08-01-free-lunches-for-opensource-engineers/) au sein des entreprises. Egalement auteur du projet [FSCrawler](https://fscrawler.readthedocs.io/) qui permet d'indexer des documents pdf, open office, etc. dans elasticsearch en utilisant Apache Tika.\n\nSon autre passion se situe au niveau du Deejaying qu'il a commencé à ses 12 ans, pour la radio locale de son collège et assez rapidement pour des soirées locales sur La Rochelle. Il exerce toujours sous le nom de [DJ Elky](https://www.instagram.com/dj_elky/) pour des sets House, Funk & Electro Chic lors d'évènements privés et dans quelques bars & spots parisiens.",
    company: "elastic",
    photoUrl: "/avatars/david-pilato.webp",
    socials: [
      {
        id: "github",
        name: "github",
        link: "https://github.com/dadoonet",
      },
      {
        id: "x",
        name: "x",
        link: "https://x.com/dadoonet",
      },
      {
        id: "link",
        name: "link",
        link: "https://david.pilato.fr/",
      },
      {
        id: "instagram",
        name: "instagram",
        link: "https://www.instagram.com/dj_elky/",
      },
    ],
  },
  {
    id: "cm9sjc10w02k7o63mbzci7k7l",
    name: "Thomas Cami",
    bio: "Développeur curieux et touche à tout, doublé d'un musicien qui a abandonné la scène pour bidouiller des synthétiseurs à coup de Rust et de fer à souder.",
    company: "Winamax",
    photoUrl: "/avatars/thomas-cami.webp",
    socials: [],
  },
  {
    id: "cm9sjc11i02k9o63m9ptdk92q",
    name: "Jonathan Baranzini",
    bio: "Développeur depuis 20 ans, j'accompagne les développeuses et développeurs au sein de l'entité \"Digital Factory\" chez Talan.\nMon objectif est de les aider à monter en compétence et s'épanouir sur leurs projets.\nJe pratique régulièrement Java, Go, React, divers Cloud... chez des clients.\n\nPeu adepte des réseaux sociaux, j'ai toutefois un compte github : github.com/jotitan\n\nPlusieurs prises de parole\nOrganisation des journées mensuelles d'échanges / formations / prise de paroles chez Talan\nNombreuses présentations : formation Elasticsearch, Golang, gestion de la mémoire en Java, gestion de workflow en Java, programmation avec micro:bit, PWA,  gestion des logs sous Azure...\nOrganisation de katas hebdomadaires\nPrésentation au meetup Elasticsearch\nBBL chez les clients (Cassandra...)\nAtelier micro:bit à Devoxx 2025 (8 notes : 4.71 de moyenne)",
    company: "Talan",
    jobTitle: null,
    photoUrl: "/avatars/jonathan-baranzini.webp",
    socials: [
      {
        id: "github",
        name: "github",
        link: "https://github.com/jotitan",
      },
    ],
  },
  {
    id: "cm9wtn21q03ypo63m7hwo5c4s",
    name: "Benjamin Legrand",
    bio: "Tombé dans la marmite du web étant petit en regardant la source des pages html, c'est tout naturellement que Benjamin fit depuis 2008 du développement web son métier.\n\nD'abord full-stack, puis en fait full fronteux, parfois défricheur de frameworks javascript bizarres, amoureux du Typescript, fanboy d'Angular. touche à tout musicien. \n\nIntervenu sur plein de projets variés, de l'e-commerce à l'industrie, en passant par les telecoms . \n\nAujourd'hui Tech Lead front / Architecte Logiciel chez Onepoint",
    company: "Onepoint",
    photoUrl: "/avatars/benjamin-legrand.webp",
    socials: [
      {
        id: "x",
        name: "x",
        link: "https://x.com/benjilegnard",
      },
      {
        id: "bluesky",
        name: "bluesky",
        link: "https://bsky.app/profile/benjilegnard.bsky.social",
      },
      {
        id: "linkedin",
        name: "linkedin",
        link: "https://www.linkedin.com/in/benjilegnard/",
      },
      {
        id: "github",
        name: "github",
        link: "https://github.com/benjilegnard",
      },
    ],
  },
  {
    id: "cma064bhu04mso63m6e2k387j",
    name: "Estéban Soubiran",
    bio: "Je suis développeur web avec plus de 7 ans d'expérience, et full-stack depuis quelques années. Ma priorité est d'optimiser l'expérience utilisateur à chaque étape du développement, et je m'efforce d'apprendre constamment, que ce soit du code, du design ou de l'administration système.\n\nCette approche m'a conduit à développer une passion pour l'open-source. Que ce soit pour étudier du code ou y contribuer activement, j'aspire à participer à la communauté de diverses manières : en rédigeant de la documentation, en améliorant le design, en corrigeant des bogues ou en proposant de nouvelles fonctionnalités. Je gravite principalement autour de UnJS, Vite, Vue.js, Nuxt, Adonis et Laravel !\n\nMa seconde grande passion est le partage des connaissances. À travers mon blog (https://soubiran.dev) et mes réseaux sociaux, je m'efforce de diffuser ce que j'apprends et découvre. Mon objectif est de transmettre des informations de manière claire et accessible, comme j'aurais souhaité les trouver lorsque j'ai débuté dans le développement web, à une époque où des milliers de questions m'envahissaient et où les réponses étaient parfois rares.",
    company: "MaiaSpace",
    jobTitle: null,
    photoUrl: "/avatars/esteban-soubiran.webp",
    socials: [
      {
        id: "link",
        name: "link",
        link: "https://soubiran.dev",
      },
      {
        id: "linkedin",
        name: "linkedin",
        link: "https://linkedin.com/in/esteban25",
      },
      {
        id: "bluesky",
        name: "bluesky",
        link: "https://bsky.app/profile/soubiran.dev",
      },
      {
        id: "x",
        name: "x",
        link: "https://x.com/soubiran_",
      },
    ],
  },
  {
    id: "cma6xafpx00c4po3mj21rns21",
    name: "Yann Mougenel",
    bio: "Architecte logiciel à plein temps, curieux dans l'âme, Yann est toujours à l’affût de nouvelles idées ou technos à bidouiller.\n\nAprès une dizaine d’années dans la tech, il a vu de nombreux contextes en dev fullstack, en DevOps et il met maintenant son expertise au service des autres.\n\nAdepte de design logiciel, aficionado de l’OpenSource et du libre, il adore jongler entre concepts et outils pour trouver des solutions malignes à des problèmes complexes.",
    company: "Takima",
    photoUrl: "/avatars/yann-mougenel.webp",
    socials: [
      {
        id: "github",
        name: "github",
        link: "https://github.com/ymougenel",
      },
      {
        id: "linkedin",
        name: "linkedin",
        link: "https://www.linkedin.com/in/yann-mougenel-843a3b108/",
      },
    ],
  },
  {
    id: "cmb7htz0r012kog3mqcsz380j",
    name: "John Dennison",
    bio: "John Dennison est **architecte Cloud et DevOps** senior chez Sogeti, qui fait partie de Capgemini. Il travaille depuis plus de 25 ans dans l'industrie informatique et possède une expérience variée allant de l'IoT et des données à l'architecture d'applications et à l'expert **DevOps**. Il est passionné par **l'automatisation** et l'amélioration de **l'expérience des développeurs** en leur permettant de se concentrer sur la production de valeur pour leurs clients.",
    company: "Sogeti",
    jobTitle: null,
    photoUrl: "/avatars/john-dennison.webp",
    socials: [],
  },
  {
    id: "cmbkqaf8602zyp93mm8ah86cd",
    name: "Benjamin Buléon",
    bio: "Senior software Engineer chez Gojob. \n\nJ'ai travaillé dans plusieurs secteurs de l'industrie, du spatial à la défense en passant par le médical. J'ai ensuite orienté ma carrière vers le développement web, avec une spécialité frontend ( même si je reste majoritairement Full-stack au quotidien! )\nJe suis toujours partant pour échanger sur des sujets techniques pointus et autour du Craft !\n\nIl y a maintenant quelques années, j'ai également fait le grand saut en utilisant Neovim comme éditeur de code principale et ça a complètement révolutionner ma façon d'écrire et de comprendre le code.",
    company: "Gojob",
    photoUrl: "/avatars/benjamin-buleon.webp",
    socials: [],
  },
  {
    id: "cmbkyumyy03e2p93m0u7eh5ld",
    name: "Aymeric Lamboley",
    bio: "# Parcours professionnel :\n2014 - : Dirigeant et directeur technique de l’entreprise Da Viking Code, Dijon.\n2013 : Développeur Interactif Freelance (jeux, applications mobiles et web).\n2010 - 2012 : Développeur web (back/front) à l’agence Swad en apprentissage, Annecy\n2009 : Stage de 3 mois orienté Flash/AS3 chez Turbulent Média Inc, Montréal, Canada.\n\n# Formation :\n2021 : Accompagner son équipe avec éthique et bienveillance au service du projet collectif.\n2010 - 2012 : Concepteur Réalisateur Multimédia Gobelins, option Développement à Annecy.\n2009 - 2010 : Université Technologique de Belfort-Montbéliard, Génie Informatique.\n2007 - 2009 : IUT Services et Réseaux de Communication, Montbéliard.\n2007 : Baccalauréat S, Belfort.",
    company: "Da Viking Code",
    photoUrl: "/avatars/aymeric-lamboley.webp",
    socials: [
      {
        id: "linkedin",
        name: "linkedin",
        link: "https://www.linkedin.com/in/aymeric-lamboley/",
      },
    ],
  },
  {
    id: "cmbl5zokj03hgp93m66xbf2z8",
    name: "Geoffrey Graveaud",
    bio: 'I have been working in the field of computer science for over 15 years. \n\nI am interested in all areas:  DevSecOps, Software Craftmanship, Security,  Agility, Method, Product  etc…\n\nI gained extensive experience because I had the opportunity to work for thirty different organizations. \n\nIn my last experiences, I was CTO, Coach, Head of a consulting department, speaker, trainer, facilitator and event organizer.\n\nI have been a speaker for 2 years (Voxxed Days, DevOxx, DevFest Agile Tour, MixIt, JugSummerCamp, Sunny Tech, BDX.io, etc.) \n\nCurrently, I am passionate about speaking coaching. In 1 year and half, I have already accompanied several 32 people especially for the preparation of TEDX, School of Product, for the contest of Miss Aquitaine, Opening Keynotes and for the springboards of speakers of Craft Records.\n\nThis year, I accompagny the [Craft Records association](https://www.linkedin.com/company/craftsrecords/) and [Women In Tech Bordeaux](https://www.meetup.com/fr-FR/women-in-tech-bordeaux/).  Since May, I challenge myself to coach a team of coaches for speaking for the "Tremplin des speakers Bordeaux"',
    company: "Inside",
    jobTitle: null,
    photoUrl: "/avatars/geoffrey-graveaud.webp",
    socials: [
      {
        id: "link",
        name: "link",
        link: "https://insidegroup.fr/coachs-craft-accelerate-devops/",
      },
      {
        id: "linkedin",
        name: "linkedin",
        link: "https://www.linkedin.com/in/geoffrey-graveaud-033319b0/",
      },
    ],
  },
  {
    id: "cmbo3grzx0034qt3mahf7d1vp",
    name: "Etienne Idoux",
    bio: "💁‍♂️ Jeune développeur animé par sa passion, Etienne IDOUX se présente comme un consultant web travaillant à Zenika 🔴. Entrain de parfaire ses armes en tant que Développeur Frontend 🖼️ à Bedrock ⚫, il pimente son temps libre de toute sorte de projet. Il aime se rendre à des conférences afin d'apprendre et de faire apprendre à travers des talks variés !",
    company: "Zenika",
    jobTitle: null,
    photoUrl: "/avatars/etienne-idoux.webp",
    socials: [
      {
        id: "github",
        name: "github",
        link: "https://github.com/PopsIDX",
      },
      {
        id: "x",
        name: "x",
        link: "https://x.com/PopsIDX",
      },
    ],
  },
  {
    id: "cmbt053jt02n9qt3myrhmn217",
    name: "Nait Belkacem Youssef",
    bio: "Ce que j’aime par-dessus tout, c’est transformer les idées de mes clients en projet concret. \n\nMon terrain de jeu principal, c’est le backend, Java principalement mais j’ai aussi exploré d'autres langages de programmation par le passé C, C++, TypeScript, .. etc. Ma dernière découverte est Rust, je passe pas mal de temps à comprendre la philosophie derrière ce language fascinant \n\nJe prends beaucoup de plaisir à remettre du sens dans le code à travers le refactoring, à relever des défis de performance (usage des resources à disposition, délais de traitement etc) et à évangéliser tout ce qui touche au craftsmanship.",
    company: "Decathlon",
    photoUrl: "/avatars/nait-belkacem-youssef.webp",
    socials: [
      {
        id: "github",
        name: "github",
        link: "https://github.com/NaitYoussef",
      },
      {
        id: "link",
        name: "link",
        link: "https://stackoverflow.com/users/4782694/youssef-nait",
      },
    ],
  },
  {
    id: "cmbt053k902nbqt3mh07s04nz",
    name: "Jean-Eudes Couignoux",
    bio: "Développeur java, je suis passionné par la création d'application, de la récupération du besoin à la mise en production.\n\nA la frontière entre dev et ops, je m'intéresse à la fois à l'écosystème de la JVM, aux problématiques de performance et de volumétrie, mais aussi aux outils permettant de faciliter le provisionning et le déploiement d'application.",
    company: "Capco",
    photoUrl: "/avatars/jean-eudes-couignoux.webp",
    socials: [
      {
        id: "linkedin",
        name: "linkedin",
        link: "https://www.linkedin.com/in/jean-eudes-couignoux/",
      },
      {
        id: "github",
        name: "github",
        link: "https://github.com/jean-eudes",
      },
    ],
  },
  {
    id: "cmbwcykv2008vpc3mthd61brl",
    name: "Sylvain Coudert",
    bio: "Dev .NET depuis 2008, Freelance depuis 2018, Crafter devant l'éternel et debugger de l'infini!\nJ'aime apprendre, transmettre et découvrir.\nChanteur rockeur circassien intermittent et papa à temps plein, j'aime également prendre le temps de regarder le vent agiter les feuilles d'un arbre.",
    company: "Freelance",
    photoUrl: "/avatars/sylvain-coudert.webp",
    socials: [],
  },
  {
    id: "cmby2s80v02iqpc3mo3losj85",
    name: "Horacio Gonzalez (LostInBrittany)",
    bio: "Malgré ce que son accent espagnol bien prononcé peut suggérer, Horacio est arrivé en France il y a plus d'une vingtaine d'années. Passionné d'informatique, dans laquelle il est tombé depuis tout petit, il a découvert le développement web en 1997 et depuis il n'a pas arrêté de bosser autour.\n\nAprès quelques années comme Directeur de Developer Relations chez [OVHcloud](https://twitter.com/OVHcloud), Horacio travaille actuellement comme Head of DevRel chez [Clever Cloud](https://www.clever-cloud.com/). Il est cofondateur du  [@FinistDevs](https://twitter.com/finistdevs/), et des [@RdvSpeakers](https://twitter.com/RdvSpeakers).\n\nPassionné par le développement web et tout ce qui gravite autour des composants web et des standards web, Horacio aime aussi discuter de Kubernetes, AI et le cloud en général. Il est [Google Developer Expert (GDE)](https://developers.google.com/experts/people/horacio-gonzalez)  en Web Technologies and Flutter.",
    company: "Clever Cloud",
    photoUrl: "/avatars/horacio-gonzalez-lostinbrittany.webp",
    socials: [
      {
        id: "github",
        name: "github",
        link: "https://github.com/LostInBrittany",
      },
      {
        id: "x",
        name: "x",
        link: "https://x.com/LostInBrittany",
      },
    ],
  },
  {
    id: "cmc2fdl8y00i8ol3mtdv7rhil",
    name: "Juliette de Rancourt",
    bio: "Juliette has been a full-stack developer for 6 years, building web applications in various functional contexts and contributing to the JUnit 5 framework.\nBesides seeking to deliver useful, well-crafted software to end-users, she enjoys leveraging testing tools to make test suites pleasant to read and convenient to write.",
    company: "SHODO",
    jobTitle: null,
    photoUrl: "/avatars/juliette-de-rancourt.webp",
    socials: [
      {
        id: "github",
        name: "github",
        link: "https://github.com/juliette-derancourt",
      },
      {
        id: "bluesky",
        name: "bluesky",
        link: "https://bsky.app/profile/jderancourt.bsky.social",
      },
      {
        id: "linkedin",
        name: "linkedin",
        link: "https://fr.linkedin.com/in/juliette-de-rancourt",
      },
    ],
  },
  {
    id: "cmc4lqonj0028m73mo0b45y9c",
    name: "Alexandre Azouri",
    bio: "Je suis un jeune ingénieur en intelligence artificielle et machine learning basé à Lyon. Diplômé de Polytech Lyon de l'UCBL, je suis passionné par ces nouvelles technologies ainsi que leur application dans de nombreux domaines. J'ai eu l'occasion de travailler sur des projets de détection de cancer et d'agents LLM pour du service client respectant la RGPD.",
    company: null,
    jobTitle: null,
    photoUrl: "/avatars/alexandre-azouri.webp",
    socials: [],
  },
  {
    id: "cmcahhw4z005anz3m641hh7x0",
    name: "Vincent Thivent",
    bio: "Gérant de la société ODALID, nous fabriquons des systèmes  de contrôle d’accès, télébillétique et Iot. (Hardware/ Firmware/ Software). Je suis passionné d'électronique, je souhaite vous partagé la magie du contactless lié à la cryptographie. https://odalid.com",
    company: "ODALID",
    photoUrl: "/avatars/vincent-thivent.webp",
    socials: [
      {
        id: "linkedin",
        name: "linkedin",
        link: "https://www.linkedin.com/in/vincentthivent/",
      },
    ],
  },
  {
    id: "cmcand41y00alnz3m8yp005us",
    name: "Flora Njofang",
    bio: "Dans la tech depuis plus de 10 ans, Flora NJOFANG est Engineering Manager chez AXA France. Dans son quotidien, elle prend plaisir à aligner la stratégie Tech et besoin métier pour maximiser l'impact de leurs actions. Curieuse et avide d'échanges, elle adore apprendre et partager des innovations qui font la différence.",
    company: "AXA France",
    jobTitle: null,
    photoUrl: "/avatars/flora-njofang.webp",
    socials: [
      {
        id: "linkedin",
        name: "linkedin",
        link: "https://www.linkedin.com/in/flora-njofang-3513b3164",
      },
    ],
  },
  {
    id: "cmcbvmw6x006bpb3mpfb4u293",
    name: "Adrien Gras",
    bio: "Créateur d'entreprise et architecte solutions, j'aide les entreprises à innover et à accélérer leur transformation numérique. Fort d'une expertise en R&D, stratégie business et management bienveillant, je conçois des plateformes performantes et des MVP sur mesure.\n\nMon approche allie innovation technologique, vision stratégique et leadership humain pour relever des défis complexes et transformer des idées en solutions concrètes et impactantes.",
    company: "Owlnext",
    photoUrl: "/avatars/adrien-gras.webp",
    socials: [
      {
        id: "linkedin",
        name: "linkedin",
        link: "https://www.linkedin.com/in/adrien-gras/",
      },
    ],
  },
  {
    id: "cmcbzm93y007spb3mkeqp3faj",
    name: "Antoine Richard",
    bio: "Développeur fullstack chez SFEIR, je suis particulièrement passionné par le développement frontend et toujours en quête de la nouvelle découverte qui va booster l’expérience des utilisateurs et des développeurs.\nJe suis aussi un passionné de course à pied, de dessin et de welsh.",
    company: "SFEIR",
    jobTitle: null,
    photoUrl: "/avatars/antoine-richard.webp",
    socials: [
      {
        id: "github",
        name: "github",
        link: "https://github.com/arichard-info",
      },
      {
        id: "x",
        name: "x",
        link: "https://x.com/kalagounet",
      },
    ],
  },
  {
    id: "cmcd8jqax0058o83mnnxjes8a",
    name: "Bertrand Delacrétaz",
    bio: "[Bertrand Delacretaz](https://grep.codeconsult.ch) travaille comme Principal Scientist et Web Platform Advocate pour le groupe R&D de Adobe Research à Bâle, en Suisse, sur des systèmes de gestion de contenu et publication Web à grande échelle. Plus de trente ans après avoir pressé ENTER pour la première fois sur un lien hypertexte, Bertrand reste passionné par les technologies du Web. La veille technologique autour du Web est une part importante de son activité, qu'il partage volontiers dans diverses conférences. Bertrand est aussi actif dans l'Open Source et a siègé 14 ans au comité de direction de la fondation Apache (\"Apache Software Foundation\").",
    company: "Adobe",
    photoUrl: "/avatars/bertrand-delacretaz.webp",
    socials: [
      {
        id: "github",
        name: "github",
        link: "https://github.com/bdelacretaz",
      },
      {
        id: "link",
        name: "link",
        link: "https://fosstodon.org/@bdelacretaz",
      },
      {
        id: "linkedin",
        name: "linkedin",
        link: "https://www.linkedin.com/in/bdelacretaz/",
      },
    ],
  },
  {
    id: "cmch9e1cl00fsth3mcz6w1dox",
    name: "Mickael Alves",
    bio: "👋🏼 Web Maker, application builder, and passionate speaker on web development, design, computing, and new technologies! 👨🏻‍💻\n\nCurrently a web consultant at @Zenika 🔴, DX Engineer at @BedrockStreaming 📺 , I also enjoy sharing my knowledge through teaching and speaking at conferences. I’m a co-founder of @DevFestLyon and a co-organizer of @LyonJS 🦁, an @Appwrite Hero 🦸🏼‍♂️, and a @Remotion Expert 🎬",
    company: "Zenika",
    photoUrl: "/avatars/mickael-alves.webp",
    socials: [
      {
        id: "github",
        name: "github",
        link: "https://github.com/mickaelalvs",
      },
      {
        id: "x",
        name: "x",
        link: "https://x.com/mickaelalvs",
      },
    ],
  },
  {
    id: "cmchd14d000gcth3mwbbxo4iv",
    name: "Romain Dorgueil",
    bio: "Artisan logiciel, entrepreneur, musicien. 30ans+ de code dans un peu trop de langages et sur un peu trop de machines.",
    company: "Makersquad",
    photoUrl: "/avatars/romain-dorgueil.webp",
    socials: [
      {
        id: "linkedin",
        name: "linkedin",
        link: "https://www.linkedin.com/in/rdorgueil/",
      },
    ],
  },
  {
    id: "cmcjf8mrz010boe3m549h7l92",
    name: "Jules Poissonnet",
    bio: "Je suis passionné par le ✨frontend✨, je suis actuellement en alternance chez Bedrock Streaming, où j'affine mes compétences dans le web, conciliant sans cesse contraintes historiques et nouvelles technologies. J'ai un faible particulier pour l'écosystème JavaScript et ses outils, du transpilateur au bundler en passant par le linter, tout m'intéresse !\n\nAu-delà de la technique, j'aime le côté humain du partage de connaissance. J'aide l'animation des conférences internes de mon entreprise car je trouve que c'est essentiel pour se tirer vers le haut. J'ai déjà animé des workshops dans mon entreprise, j'aime quand les notions sont apportées par la pratique. \n\nJe suis convaincu que donner des conférences est une excellente occasion d'apprendre et de grandir",
    company: "Bedrock Streaming",
    photoUrl: "/avatars/jules-poissonnet.webp",
    socials: [
      {
        id: "github",
        name: "github",
        link: "https://github.com/jpoissonnet",
      },
    ],
  },
  {
    id: "cmcjf8msk010doe3mmu61c39k",
    name: "Antoine Caron",
    bio: "Voici Antoine Caron, un développeur frontend passionné qui essaie de faire du code de qualité tout en s'amusant. Il a une expertise solide en développement Web, React et frontend, et a travaillé chez M6web/Bedrock Streaming depuis 2017 en tant que Lead Frontend Developer. Il a enseigné également à Polytech Lyon. Très impliqué dans les communauté open source mais également les communautés locales, Antoine a repris avec quelques amis les rênes du Meetup LyonJS depuis 2020.",
    company: null,
    jobTitle: null,
    photoUrl: "/avatars/antoine-caron.webp",
    socials: [
      {
        id: "github",
        name: "github",
        link: "https://github.com/Slashgear",
      },
      {
        id: "x",
        name: "x",
        link: "https://x.com/Slashgear_",
      },
    ],
  },
  {
    id: "cmcjjxzp101dmoe3mhpuj78ip",
    name: 'Alexis "Horgix" Chotard',
    bio: 'Alexis "Horgix" Chotard est un ingénieur système et développeur travaillant à PayFit (https://payfit.fr).\n\nDéveloppeur de formation avec une expérience davantage tournée système et infrastructure, se retrouvant naturellement dans tous les sujets "DevOps" au sens large.\n\nPassionné d\'automatisation pour construire des systèmes autonomes, résilients et facilement maintenables.\nEngagé dans l\'écosystème "Cloud Native", amoureux de Rust, partisan de l\'opensource.',
    company: "PayFit",
    photoUrl: "/avatars/alexis-horgix-chotard.webp",
    socials: [
      {
        id: "github",
        name: "github",
        link: "https://github.com/Horgix",
      },
      {
        id: "x",
        name: "x",
        link: "https://x.com/Horgix",
      },
    ],
  },
];

export default speakers;

/*
const fs = await import("node:fs");
const {Buffer} = await import('buffer');
speakers.forEach(({ id, photoUrl }) => {
  if (!photoUrl) {
    return;
  }
  fetch(photoUrl)
    .then((r) => r.arrayBuffer())
    .then((b) => {
      fs.createWriteStream(`./_assets/avatars/__${id}`).write(Buffer.from(b));
    });
});
*/

/*
# for f in __*; do convert $f -resize "128x128" "${f/__/}.webp"; rm "$f" ; done
*/
