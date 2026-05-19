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
    id: "GApOTPqDfIwafBVZpi27",
    name: "Houleymatou Baldé",
    bio: null,
    company: "Yeeso",
    jobTitle: null,
    photoUrl: "/avatars/houleymatou-balde.webp",
    socials: [],
  },
  {
    id: "cmnzwk78m00nx01o2e0mjq9l7",
    name: "Edouard Mangel",
    bio: "Edouard Mangel, Dev depuis 2012. \n\nJ'évolue en tant que lead tech ou CTO dans des start-up early stage. \n\nJ'ai découvert les pratiques liées au software craftsmanship en 2018, et elles m'ont redonné le goût de mon métier. C'est pourquoi, depuis 2019, je suis également formateur dans des écoles et des entreprises de la région. \n\nJ'adorerais venir les transmettre dans votre conférence !",
    company: "Freelance",
    jobTitle: null,
    photoUrl: "/avatars/edouard-mangel.webp",
    socials: [
      {
        id: "linkedin",
        name: "linkedin",
        link: "https://www.linkedin.com/in/edouard-mangel-",
      },
    ],
  },
  {
    id: "cmnzy3p5j00o401o2zbrazim9",
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
    id: "cmo17ykd400rc01o2ujfy5t8t",
    name: "Gaëtan Eleouet",
    bio: "Dans mes jeunes années être geek n’était pas un métier et pourtant je suis aujourd’hui développeur depuis 15 ans. \nAnimé par des convictions fortes sur l’impact des développeurs sur le monde, je transmets et j’enseigne dans le cadre d’atelier de code et en vacation en école d’ingénieur. \nAu-delà de mon métier, c’est aussi une passion : je code pour le plaisir dans des projets personnels et lors de compétition de programmation.",
    company: "meritis",
    jobTitle: null,
    photoUrl: "/avatars/gaetan-eleouet.webp",
    socials: [],
  },
  {
    id: "cmo3eswpp00zk01o25d7f0w9h",
    name: "Abeba Ngwe",
    bio: "## ENGLISH\n\n**Abeba Ngwe** is a Senior Front-end Developer at leboncoin, where she works in a Next.js monorepo within a guild of over 60 developers.\n\nCreator of the YouTube channel [Alors on dev](https://www.youtube.com/@Alorsondev), she is also the author of *[Réussir ses tests techniques en développement web](https://www.alorsondev.com/reussir-ses-tests-techniques/MdOxj)* (2024) and has been a guest on several tech podcasts.\n\nAn early adopter of AI tools in development, she helped structure the use of context engineering in her guild: skills, specialized agents, context files, and workflows. Her approach combines hands-on experience with critical perspective: how to use AI to boost efficiency without falling into the trap of control obsession.\n\nShe now explores a simple conviction: intelligently delegating repetitive tasks allows developers to maximize what they truly enjoy doing — thinking.\n\n## FRANCAIS\n\n**Abeba Ngwe** est développeuse front-end senior chez leboncoin, où elle évolue dans un monorepo Next.js au sein d'une guilde de plus de 60 développeurs.\n\nCréatrice de la chaîne YouTube [Alors on dev](https://www.youtube.com/@Alorsondev), elle est également l'autrice du livre *[Réussir ses tests techniques en développement web](https://www.alorsondev.com/reussir-ses-tests-techniques/MdOxj)* (2024) et invitée dans plusieurs podcasts tech.\n\nEarly adopter des outils d'IA en développement, elle a contribué à structurer l'usage du context engineering dans sa guilde : skills, agents spécialisés, fichiers de contexte, workflows. Son approche mêle retour d'expérience concret et recul critique : comment utiliser l'IA pour gagner en efficacité sans tomber dans l'obsession du contrôle.\n\nElle explore aujourd'hui une conviction simple : déléguer intelligemment les tâches répétitives permet de maximiser ce que les développeurs aiment vraiment faire — réfléchir.",
    company: "leboncoin",
    jobTitle: null,
    photoUrl: "/avatars/abeba-ngwe.webp",
    socials: [
      {
        id: "link",
        name: "link",
        link: "https://www.alorsondev.com/",
      },
      {
        id: "linkedin",
        name: "linkedin",
        link: "https://www.linkedin.com/in/abebangwe/",
      },
      {
        id: "youtube",
        name: "youtube",
        link: "https://www.youtube.com/@alorsondev",
      },
    ],
  },
  {
    id: "cmoa7vcqa00kp01mkmbfpgeam",
    name: "Damien Hackett",
    bio: "Développeur logiciel embarqué depuis 2013, j ai travaillé dans différents domaines de l embarqué : Linux embarqué, OS temps réel, baremetal, environnements normés... même sur FPGA et en co-design électronique.",
    company: "SII",
    jobTitle: null,
    photoUrl: "/avatars/damien-hackett.webp",
    socials: [
      {
        id: "linkedin",
        name: "linkedin",
        link: "https://fr.linkedin.com/in/damien-hackett-34aa0662",
      },
    ],
  },
  {
    id: "cmog1d7ji002a01o27sy3bxke",
    name: "Anne-Laure Gros",
    bio: "Développeuse full stack freelance (Java/Kotlin+Vue.js), curieuse, engagée et aussi formatrice en Discipline Positive",
    company: null,
    jobTitle: null,
    photoUrl: "/avatars/anne-laure-gros.webp",
    socials: [
      {
        id: "linkedin",
        name: "linkedin",
        link: "https://www.linkedin.com/in/anne-laure-gros/",
      },
    ],
  },
  {
    id: "cmogz4f4s005h01o2wusrxu8m",
    name: "Norbert Jeff Nadir",
    bio: "Profil hybride IA Ops et de stratège, Norbert accompagne la transformation des organisations en fusionnant l'analyse structurelle et le potentiel de l'intelligence artificielle.\n\n     Son parcours est fondé sur la direction d'audits et de diagnostics stratégiques au sein de grands groupes internationaux multilingues, lui permettant d'évaluer avec précision les besoins de Change et d'appliquer les stratégies d'entreprise.\n     Engagé au cœur de la R&D de Zenika sur l'orchestration agentique et les méthodologies de développement assisté par IA, il déploie cette expertise pour augmenter la précision et l'impact de ses missions.\n     Cette recherche se matérialise par le développement d'outils concrets - orchestrateurs d'agents IA et frameworks méthodologiques - visant à concevoir des organisations plus agiles et apprenantes (M3.0, unFIX, M3K).\n\n     En appliquant le prisme du Lean-AI, il traduit ces diagnostics en plans d'action innovants, transformant les opérations pour les adapter aux défis et aux opportunités à l'ère de l’IA agentique.",
    company: "ZENIKA",
    jobTitle: null,
    photoUrl: "/avatars/norbert-jeff-nadir.webp",
    socials: [
      {
        id: "linkedin",
        name: "linkedin",
        link: "https://www.linkedin.com/in/norbert-jeff-nadir/",
      },
    ],
  },
  {
    id: "cmogz4f4v005i01o20ozzp9s0",
    name: "Christophe Breheret-Girardin",
    bio: "CTO @Zenika Paris, Coach Craft, formateur, auteur et conférencier, Christophe partage avec enthousiasme ses connaissances afin d’inspirer et de guider chacun vers l'excellence.\n\nÀ la fois CTO et consultant, il aide les entreprises à structurer leurs applications et leur SI en sous-domaines métiers, tout en réorganisant les équipes pour maximiser l'efficience. Très impliqué sur les enjeux de DevX (Developer Experience), il intègre notamment l'IA dans ses pratiques depuis quelques années pour accompagner la transformation des méthodes de réalisation.",
    company: "Zenika",
    jobTitle: null,
    photoUrl: "/avatars/christophe-breheret-girardin.webp",
    socials: [
      {
        id: "x",
        name: "x",
        link: "https://x.com/ChristopheB_G",
      },
    ],
  },
  {
    id: "cmol8q71l006401ohp3x3w8ts",
    name: "Jef Canzano",
    bio: "Jef Canzano\nDirecteur des Docks Numériques\nSpécialisé dans l'accompagnement de projets innovants de solution SaaS, appli web et mobile.",
    photoUrl: "/avatars/jef-canzano.webp",
    socials: [],
  },
  {
    id: "cmolzkx93000e01ofhgo22jaq",
    name: "Hervé Letourneur",
    bio: "J'ai commencé ma vie professionnelle en tant qu'electro-chimiste puis enseignant.\nDe ces expériences, j'ai développé une curiosité continue, une soif d'apprendre et une envie de transmettre.\n\n\nUn bilan de compétence a mis en lumière une expérience de mon adolescence : mes premiers pas dans le développement avec un vieux 386.\nJ'ai donc opéré une reconversion qui m'a permis d'être maintenant développeur Java.\n\n\nJ'ai pu allié ces expériences pour rester ouvert aux nouvelles pratiques, outils et évolutions.\nJ'ai toujours voulu comprendre ce que j'utilisais et transmettre ces apprentissages à mes pairs.\n\n\nDepuis 16 ans, je met en pratique ces connaissances et savoir faire auprès de clients (BNP CIB, SG CIB, B for Bank, Amundi et SNCF) mais aussi de Consultant, RH et Ingénieur d'affaire de Méritis en tant que Practice Leader Java.",
    company: "SFEIR",
    jobTitle: null,
    photoUrl: "/avatars/herve-letourneur.webp",
    socials: [
      {
        id: "github",
        name: "github",
        link: "https://github.com/hervemeritis",
      },
    ],
  },
  {
    id: "cmolzkx99000f01oflje7pj27",
    name: "Alban Clevy",
    bio: "Travaillant depuis bientôt 17 dans l'univers Java, j'ai occupé différents postes : développeur, architecte, techlead. \nJe suis actuellement tech lead en mission dans une grande banque française. \n\nDurant j'ai rédigé différent articles :\n* https://meritis.fr/java-nouveau-modele-long-time-support/\n* https://meritis.fr/tech-lead-presentation-de-la-nouvelle-fonction-tendance-en-developpement/\n* https://meritis.fr/retour-sur-devoxx-france-2020-2021-une-edition-9-%C2%BE/\n* https://meritis.fr/retour-sur-les-conferences-les-plus-marquantes-de-devoxx-2022/\n\nJ'ai aussi animé des conférences\n* https://www.youtube.com/watch?v=PDJTSCxPAo0\n* https://www.meetup.com/fr-FR/meetup-programmez/events/298563662/\n* https://app.voxxr.in/events/snowcamp26/talks/40/details",
    company: "Sfeir",
    jobTitle: null,
    photoUrl: "/avatars/alban-clevy.webp",
    socials: [
      {
        id: "github",
        name: "github",
        link: "https://github.com/b16d?tab=repositories",
      },
      {
        id: "linkedin",
        name: "linkedin",
        link: "https://www.linkedin.com/in/alban-clevy-97248110/",
      },
    ],
  },
  {
    id: "cmor55okq000g01mmsl26byb8",
    name: "Estelle Thou",
    bio: "Je m'appelle Estelle Thou et je travaille depuis cinq ans comme Sofware Engineer chez Criteo (Paris). Mon parcours est atypique, puisque j'ai obtenu un diplôme d'ingénieure agroalimentaire à AgroParisTech, avec une spécialisation en nutrition. J'ai passé deux ans et demi à travailler dans une start-up, LaFabrique Cookies, en tant que responsable Qualité et R&D. Pendant le COVID, j'ai décidé de changer de carrière pour trouver un poste qui corresponde mieux à ma passion pour l'analyse et la résolution de problèmes. J'ai suivi un bootcamp de six mois à l'EPITECH, suivi d'un stage de six mois, qui a marqué le début de mon nouveau parcours en tant que Full-stack. En tant que femme dans le secteur des technologies, j'ai développé une passion pour la prise de parole en public et donner une voix à cette communauté sous-représentée. Enfin, je suis également l'heureuse maman d'une petite fille de 1 an, une cuisinière passionnée et amatrice de course à pied.",
    company: "CRITEO",
    photoUrl: "/avatars/estelle-thou.webp",
    socials: [],
  },
  {
    id: "cmotx4djo009401pxkmjo51pq",
    name: "Emmanuelle Aboaf",
    bio: "Sourde de naissance et bionique avec mes deux implants cochléaires, je suis développeuse fullstack et coach en accessibilité chez Shodo. Dans mon monde idéal, tout doit être accessible aussi bien dans la vraie vie que sur le Web.",
    company: "Shodo",
    jobTitle: null,
    photoUrl: "/avatars/emmanuelle-aboaf.webp",
    socials: [
      {
        id: "linkedin",
        name: "linkedin",
        link: "https://www.linkedin.com/in/emmanuelle-aboaf/",
      },
    ],
  },
  {
    id: "cmotx4dk6009501pxf28dz4m4",
    name: "Manon Carbonnel",
    bio: "Développeuse web front et back, experte en intégration web, design systems et accessibilité. \n\nSpécialisée en tests automatisés (unitaires, composants, mutation, UI, non‑régression visuelle, accessibilité) et en analyse statique.\n\nJ’accompagne les équipes vers les pratiques software craft grâce à la facilitation, au mentoring et à l’animation de workshops (pair & mob programming, TDD, tests, coding dojos, mindset Agile).\n\nJe suis passionnée par le HTML/CSS et j'ai créé [Csscade](https://csscade.fr/), une communauté française sur l'intégration web.\n\nJe m'investis activement pour promouvoir la diversité dans la tech. En tant que [Yeeso](https://yeeso.fr/) Leader à Rennes, animatrice de [La Fresque Du Sexisme](https://www.fresque-du-sexisme.org/), et mentor/marraine pour [Craft Records](https://craftsrecords.org/).",
    company: "Shodo",
    photoUrl: "/avatars/manon-carbonnel.webp",
    socials: [
      {
        id: "github",
        name: "github",
        link: "https://github.com/manoncarbonnel",
      },
      {
        id: "link",
        name: "link",
        link: "https://linktr.ee/manoncarbonnel",
      },
      {
        id: "linkedin",
        name: "linkedin",
        link: "https://www.linkedin.com/in/manon-carbonnel/",
      },
      {
        id: "bluesky",
        name: "bluesky",
        link: "https://bsky.app/profile/manoncarbonnel.bsky.social",
      },
    ],
  },
  {
    id: "cmou6gf3900by01pxbce5cxr6",
    name: "Ambre Person",
    bio: "Développeur passionné d'ingénierie logicielle de bout en bout, j'aime partager mes connaissances et apporter mon aide aux équipes avec lesquelles je suis amené à travailler. Toujours de bonne humeur, mon rire est un indicateur de réussite des projets !",
    company: "Ippon Technologies",
    photoUrl: "/avatars/ambre-person.webp",
    socials: [
      {
        id: "linkedin",
        name: "linkedin",
        link: "https://www.linkedin.com/in/ambre-person/",
      },
    ],
  },
  {
    id: "cmowgsi5z00fh01o8k551hre3",
    name: "Yann-Thomas Le Moigne",
    bio: "Développeur informatique passionné par les technologies JavaScript, Angular, Svelte, Java, Spring, Quarkus...\n\nJe suis curieux et j'aime beaucoup ce qui peut me faciliter la vie. C'est pourquoi je propose de partager mon expérience sur certains outils de développement.\n\nJe suis également investi dans plusieurs associations :\n- Angular Devs France : Partage de contenu autour du framework Angular en francophone.\n- Ng Baguette Conf : Co organisateur de la conférence.\n- Ess 37 : Ecole de secours et de sauvetage - Formateur PSC\n- SPV : Sapeur Pompier Volontaire",
    company: "CGI",
    jobTitle: null,
    photoUrl: "/avatars/yann-thomas-le-moigne.webp",
    socials: [
      {
        id: "github",
        name: "github",
        link: "https://github.com/Yatho",
      },
      {
        id: "x",
        name: "x",
        link: "https://x.com/Yatho91",
      },
    ],
  },
  {
    id: "cmpaxsd6h009801p10h2u5h03",
    name: "Nicolas Goudry",
    bio: "Ingénieur DevOps spécialisé Kubernetes et Cloud Native, j'ai parcouru toute la stack, du front au backend, avec une seule obsession : l'automatisation. Amoureux des systèmes déclaratifs, j'ai plongé dans le « rabbit hole » Nix pour en extraire le Graal de la reproductibilité. Aujourd'hui, je dédie mon temps (et mes nuits) à dompter cet écosystème pour faire de la reproductibilité la norme, pas l'exception.",
    company: "SCIAM",
    photoUrl: "/avatars/nicolas-goudry.webp",
    socials: [
      {
        id: "linkedin",
        name: "linkedin",
        link: "https://linkedin.com/in/goudryn",
      },
      {
        id: "github",
        name: "github",
        link: "https://github.com/nicolas-goudry",
      },
    ],
  },
  {
    id: "cmpduoc1g015001p12211uh04",
    name: "Mehdi Chilla",
    bio: "# Mehdi Chilla — Responsable socle et forge logicielle\n\nAvec plus de dix ans d’expérience, Mehdi pilote le socle technique, la forge logicielle et les standards de développement au sein d’un grand groupe mutualiste. Passionné par la collaboration et l’amélioration continue, il partage des **retours d’expérience concrets** pour aider les équipes à construire des outils, normes et pratiques adaptées aux besoins réels des développeurs.",
    company: "IMA",
    jobTitle: null,
    photoUrl: "/avatars/mehdi-chilla.webp",
    socials: [],
  },
  {
    id: "cmpjq82ah007g01mnvcxary56",
    name: "Vanessa Chodaton",
    bio: "Vanessa CHODATON, une développeuse amoureuse du code et du développement personnel",
    company: "MAIF",
    jobTitle: null,
    photoUrl: "/avatars/vanessa-chodaton.webp",
    socials: [],
  },
  {
    id: "cmpntvw1k00t801qj0znd9mkp",
    name: "Bertrand Delacrétaz",
    bio: "Ingénieur retraité, [Bertrand Delacrétaz](https://grep.codeconsult.ch) a consacré plus de 40 ans au développement de logiciels, principalement dans le domaine du Web, travaillant notamment pour le Parlement Fédéral Suisse, la Radio Télévision Suisse et pour Adobe en tant que Principal Scientist. Membre du comité de direction de la fondation ASF (apache.org) pendant 14 ans, il est un acteur engagé du logiciel libre. Depuis plus de 20 ans, il intervient dans des conférences internationales, notamment pour promouvoir une approche responsable et durable face aux mutations technologiques.",
    company: "Adobe",
    jobTitle: null,
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
    id: "cmpygzsok00qh01pp15pl0dau",
    name: "Léo Mouyna",
    bio: "Ingénieur logiciel depuis 8 ans, ce qui m'anime dans notre métier c'est de concevoir des logiciels utiles, qui répondent à un besoin, et maintenable dans le temps.\n\nJe me suis intéressé aux pratiques plébiscités dans le monde du craft et je tente de les rendre accessible à mes collègues, mes pairs et les étudiants.",
    photoUrl: "/avatars/leo-mouyna.webp",
    socials: [
      {
        id: "linkedin",
        name: "linkedin",
        link: "https://www.linkedin.com/in/leo-mouyna/",
      },
    ],
  },
  {
    id: "cmq6le89x015101nsin1ha2li",
    name: "Arnaud Fornerot",
    bio: "Co-gérant, chef de projet et développeur chez Cadoles, je pilote des projets informatiques complexes et d'envergure nationale en mode Agile depuis plus de 13 ans (comme le portail Mes Services Étudiant pour le CNOUS). Passionné par l’open source et la philosophie du libre, j’allie au quotidien une vision stratégique d'entreprise, une expertise technique pointue (Symfony, Docker) et une casquette de formateur en conduite de projet. Très sensible aux enjeux d'inclusion, je m'investis également dans des projets concrets comme Lutrin, un dispositif d'assistance à la lecture basé sur l'OCR et la synthèse vocale. Récemment certifié Numérique Responsable, je m'attache à faire converger gouvernance d'entreprise, ingénierie logicielle, éco-conception et accessibilité.",
    company: "Cadoles",
    jobTitle: null,
    photoUrl: "/avatars/arnaud-fornerot.webp",
    socials: [
      {
        id: "linkedin",
        name: "linkedin",
        link: "https://www.linkedin.com/in/arnaud-fornerot-60a349284/",
      },
      {
        id: "github",
        name: "github",
        link: "https://github.com/afornerot",
      },
      {
        id: "link",
        name: "link",
        link: "https://terium.org/ninefolio/arno",
      },
    ],
  },
  {
    id: "cmqajew9a03j401nszyd9gmyr",
    name: "Philippe Bourgau",
    bio: "Coach Agile Technique,\n\nJe contribue à ma mesure à rendre le monde du travail plus sûr pour les développeurs, et à les rendre plus fiers de leur travail.\n\nResponsable Product & Flow @ Shodo",
    company: "Murex",
    photoUrl: "/avatars/philippe-bourgau.webp",
    socials: [
      {
        id: "github",
        name: "github",
        link: "https://github.com/philou",
      },
      {
        id: "x",
        name: "x",
        link: "https://x.com/pbourgau",
      },
    ],
  },
  {
    id: "cmqasdxa203pm01ns3eknbn9n",
    name: "Luke Archer",
    bio: "",
    company: null,
    jobTitle: null,
    photoUrl: "/avatars/luke-archer.webp",
    socials: [],
  },
  {
    id: "cmqcd16ik007w01nl6jz56z49",
    name: "Stéphane Trebel",
    bio: "## Stéphane TRÉBEL alias \"Le Permacodeur\"\n\nJe bourlingue depuis une vingtaine d'années dans le monde du numérique, entre développement web full-stack et architecture de solutions diverses et variées. J'ai lancé récemment ma chaîne Twitch et YouTube (Le Permacodeur) pour justement discuter de la Tech et mettre les mains dans le cambouis.\n\nMes intérêts:\n- Le code, quel que soit le langage, avec quand même une grosse préférence pour la Programmation Fonctionnelle et la Qualité Logicielle\n- L'automatisation, quelle qu'elle soit, en particulier des tests, et donc l'Intégration Continue\n- L'itération, et donc le DevOps\n- Les memes, partout, toujours, tout le temps",
    company: "Le Permacodeur",
    jobTitle: null,
    photoUrl: "/avatars/stephane-trebel.webp",
    socials: [
      {
        id: "github",
        name: "github",
        link: "https://github.com/StephaneTrebel",
      },
      {
        id: "x",
        name: "x",
        link: "https://x.com/stephanetrebel",
      },
      {
        id: "youtube",
        name: "youtube",
        link: "https://www.youtube.com/@permacodeur",
      },
      {
        id: "link",
        name: "link",
        link: "https://www.twitch.tv/permacodeur",
      },
    ],
  },
  {
    id: "cmqdezxni000f01qhq5gy12r9",
    name: "Xavier Calland",
    bio: "Je suis actuellement le Directeur Technique d'Atol Conseils et Développements, j'ai rejoint cette ESN lors de mon stage de fin d'étude.\nD'abord développeur puis architecte, je suis passé (un peu) par la gestion de projet avant de passer manager d'une équipe tout en gardant un pied (voir plus) dans le développement.\nMa préoccupation pour les questions de qualité et sécurité logicielle ainsi que la volonté de diffuser les bonnes pratiques au sein de l'entreprise m'ont amené à avoir un poste plus transversal de Coordinateur Technique avant de devenir Directeur Technique en 2022.",
    company: "Atol Conseils & Développements",
    jobTitle: null,
    photoUrl: "/avatars/xavier-calland.webp",
    socials: [
      {
        id: "github",
        name: "github",
        link: "https://github.com/xavier-calland",
      },
      {
        id: "linkedin",
        name: "linkedin",
        link: "https://www.linkedin.com/in/xavier-calland-4471866/",
      },
    ],
  },
  {
    id: "cmqeyn80600co01qfeaaqnavi",
    name: "Julien WITTOUCK",
    bio: "Je suis fan de Star Wars 💫, de Dragon Ball 🐉, et de rock seventies & nineties 🎸🤘.\n\nJe suis aussi Architecte Solution 🏗️  indépendant, associé chez [Ekité](https://ekite.info) et j'enseigne le développement Java / Spring à l'université de Lille 🎓 depuis plus de 10 ans.\nJe suis aussi l'auteur du livre [L’infrastructure as Code avec Terraform](https://www.editions-eni.fr/livre/l-infrastructure-as-code-avec-terraform-deployez-votre-infrastructure-sur-le-cloud-9782409046629) paru aux éditions ENI, et membre du comité d'organisation de la conférence ☁️ Cloud Nord\n\nJe publie régulièrement des articles de veille sur mon site perso [codeka.io](https://codeka.io).\n\nMes sujets de prédilection:\n\n* ☕ : Java/Spring\n* ☁️ : Cloud/IaC/Terraform\n* 🐋 : Docker/Kubernetes\n* 🐧 : Linux 💙",
    company: "Freelance / Associé chez Ekité",
    photoUrl: "/avatars/julien-wittouck.webp",
    socials: [
      {
        id: "github",
        name: "github",
        link: "https://github.com/juwit",
      },
      {
        id: "bluesky",
        name: "bluesky",
        link: "https://bsky.app/profile/codeka.io",
      },
      {
        id: "linkedin",
        name: "linkedin",
        link: "https://www.linkedin.com/in/julien-wittouck/",
      },
    ],
  },
  {
    id: "cmqkodgg6056q01qfly5vf43y",
    name: "Kevin Davin",
    bio: "Google Developer Expert on Google Cloud & Kotlin, Gitlab Hero, I am above all passionate about tech, languages, infrastructure, and automation.\n\nOn a daily basis, I work with languages such as Kotlin, Java, SQL, and YAML.\nLeveraging the power of the Google Kubernetes Engine and GitLab's Continuous Integration, I deploy and manage applications seamlessly.\n\nI am an ardent advocate of agility and DevOps, and I had the privilege of guiding teams in adopting these principles successfully.\n\nFrom code quality analysis to unit or end-to-end tests setup all the way to continuous deployment and operation, I ensure a project's journey from inception to production is smooth and efficient.\n\nCurrently, I'm Principal Software Engineer at Gradle, focusing on the development of Develocity. This groundbreaking product enhances developer productivity by reducing build and test times, while also providing valuable insights into all aspects of the development process.",
    company: "Gradle",
    photoUrl: "/avatars/kevin-davin.webp",
    socials: [
      {
        id: "github",
        name: "github",
        link: "https://github.com/davinkevin",
      },
      {
        id: "x",
        name: "x",
        link: "https://x.com/davinkevin",
      },
    ],
  },
  {
    id: "cmquoksp4039z01kx54gm57g9",
    name: "Joseph Ligier",
    bio: "J'ai commencé ma carrière il y a fort longtemps en tant qu'administrateur système Linux. Puis j'ai découvert Docker et enfin Kubernetes : ma vie a changé !\n\nPassionné par Cilium et eBPF, j'ai commencé à bloguer sur [medium](https://medium.com/@littel.jo) et je continue sur [un blog indépendant](https://blog.littlejo.link/). J'ai également présenté mon premier talk sur Cilium en 2025 à Sunny Tech ([slides disponibles ici](https://talk-littlejo.github.io/sunnytech-2025/\n)).",
    company: "IMF",
    photoUrl: "/avatars/joseph-ligier.webp",
    socials: [
      {
        id: "github",
        name: "github",
        link: "https://github.com/littlejo",
      },
    ],
  },
  {
    id: "cmr0tifwd06kb01kxnq4re7ny",
    name: "Thomas Broyer",
    bio: "",
    company: "Atol Conseils & Développements",
    jobTitle: null,
    photoUrl: "/avatars/thomas-broyer.webp",
    socials: [
      {
        id: "link",
        name: "link",
        link: "https://mu.social/profile/tbroyer.ltgt.net",
      },
      {
        id: "link",
        name: "link",
        link: "https://piaille.fr/@tbroyer",
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
