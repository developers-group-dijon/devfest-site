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
    id: "pause midi",
    title: "Pause repas",
    dateStartStr: "2024-12-06T12:45:00.000+01:00",
    durationMinutes: 75,
  },
  {
    id: "pause matin",
    title: "Pause",
    dateStartStr: "2024-12-06T10:40:00.000+01:00",
    durationMinutes: 20,
  },
  {
    id: "pause apres-midi",
    title: "Pause",
    dateStartStr: "2024-12-06T15:45:00.000+01:00",
    durationMinutes: 20,
  },
  // keynotes
  {
    id: "keynote-debut",
    title: "Accueil et lancement de la journée",
    dateStartStr: "2024-12-06T09:00:00.000+01:00",
    durationMinutes: 20,
  },
  // keynotes
  {
    id: "keynote-fin",
    title: "Remerciements et clôture de la journée",
    dateStartStr: "2024-12-06T17:25:00.000+01:00",
    durationMinutes: 20,
  },
  // sessions
  {
    id: "1kJFOZvKChf8LGmoESQd",
    title:
      "Guide de survie pour créer son authentification à l’intention des développeurs",
    abstract:
      "Il existe de très nombreuses options pour implémenter ses systèmes d’authentification et chacune présente des pièges et des erreurs types à éviter. Quand un développeur vient spontanément demander de l’aide à notre équipe de sécurité, 90% du temps le sujet est l’authentification.\n\nDepuis plus de 6 ans à aider les développeurs, nous avons recueilli les questions les plus courantes telles que :\n\n- Faut-il utiliser un JWT ou un cookie ?\n- Comment configurer mon client pour implémenter du SSO avec OIDC ?\n- Comment permettre aux utilisateurs de ne pas être déconnectés de manière intempestive ?\n\nEn les illustrant avec des histoires et des cas concrets, nous vous montrerons les compromis et les bonnes pratiques. \n\nVous repartirez avec des idées d'amélioration (et peut-être même des erreurs à corriger) pour vos applications.",
    dateStartStr: "2024-12-06T09:25:00.000+01:00",
    durationMinutes: 50,
    speakerIds: ["sIO9sxIUn9xLj7uQJ2Ja", "4zSmVVqdtphkOC9fcOVK"],
    trackId: "amphi1",
    language: "French",
    level: "intermediate",
    formatId: "-conference",
    categoryId: "-security",
    hideTrackTitle: false,
  },
  {
    id: "32rdRDHcgzPsYea1Gkxz",
    title: "Vous ne connaissez pas le S de Solid !",
    abstract:
      "\"Comment ça je ne connais pas le S des principes SOLID ?  Bien sûr que si ! C'est le principe de responsabilité unique (Single responsibility principle - SRP) !\"\n\nD'accord, mais le sens profond du SRP est souvent mal compris ! Celui donné par Uncle Bob (Robert C. Martin) en personne !\n\nAu cours de mes échanges avec de nombreux développeurs (juniors comme expérimentés), j'ai pu me rendre compte que ce principe était souvent mal compris. Même ChatGPT m'en a donné une définition erronnée !\n\nLors de cette conférence, j'éclaircirai la signification de ce principe puissant qui vous donnera les clés pour des refactos efficaces et vous guidera tel un fil d'ariane hors des griffes de l'overengeneering ! Tel est son super pouvoir.",
    dateStartStr: "2024-12-06T10:20:00.000+01:00",
    durationMinutes: 20,
    speakerIds: ["xRyLYb1SFLXlVqrPGcoW"],
    trackId: "amphi1",
    language: "French",
    level: "intermediate",
    formatId: "-short-track",
    categoryId: "-discovery",
    hideTrackTitle: false,
  },
  {
    id: "3rb92EY4gWzUQwDK3FlS",
    title: "Faire simple, la clé de la durabilité ?",
    abstract:
      "La quête de simplicité est trop souvent négligée dans nos projets informatiques, mais c'est pourtant la clé de la durabilité et de la qualité de nos logiciels.\n\nFaire simple n'est pas simple: il faut placer la barre très haut et remettre son ouvrage sur le métier, jusqu'à trouver la solution à laquelle on ne peut plus rien enlever, mais qui fait tout de même ce qu'il faut.\n\nNos exemples de projets où cet objectif a été atteint couvrent 30 ans de conception et architecture de logiciels dans des domaines divers: enregistrement audio numérique, gestion de données météorologiques, diffusion de vidéos interactives, frameworks d'application Web, entre autres.\n\nLa recette magique pour faire simple n'existe pas, mais nos exemples vous aideront à identifier les éléments clés et les principes à appliquer pour progresser dans la simplicité.",
    dateStartStr: "2024-12-06T14:00:00.000+01:00",
    durationMinutes: 50,
    speakerIds: ["pHGTjgKtqKoNcNPQS3vp"],
    trackId: "amphi1",
    language: "French",
    level: "beginner",
    formatId: "-conference",
    categoryId: "-pratiques-de-dev",
    hideTrackTitle: false,
  },
  {
    id: "6eZT06LldHNFnynL7P80",
    title: "Introduction pratique à OpenTelemetry pour les développeurs",
    abstract:
      "Il est essentiel de suivre le parcours d'une requête à travers les différents composants d'un système distribué. Avec l'essor des microservices, cette fonctionnalité a atteint un niveau de criticité comme jamais auparant. Certains outils propriétaires de suivi vous sont peut-être connus : Jaeger et Zipkin viennent naturellement à l'esprit.\n\nL'observabilité repose sur trois piliers : la journalisation, les métriques et le traçage. OpenTelemetry est un effort conjoint visant à mettre en place un standard ouvert pour ces trois piliers. Jaeger et Zipkin se sont joints à cet effort et sont maintenant compatibles avec OpenTelemetry.\n\nDans cet exposé, je décrirai plus en détail ce qui précède et je présenterai un cas d'utilisation (simple) pour démontrer comment vous pourriez bénéficier des traces OpenTelemetry dans votre architecture distribuée.",
    dateStartStr: "2024-12-06T14:55:00.000+01:00",
    durationMinutes: 50,
    speakerIds: ["XrZhY3jzawmYvQTnmgtS"],
    trackId: "amphi2",
    language: "French",
    level: "beginner",
    formatId: "-conference",
    categoryId: "-cloud-devops",
    hideTrackTitle: false,
  },
  {
    id: "71OtmrgM7PRgIgCtE5Bc",
    title: "Tu connais ce type ?",
    abstract:
      "Après des années à arpenter les voies de sa stack favorite, on se surprend toujours à découvrir un comportement abscons au détour d’une ligne de code obscure. Plusieurs jours peuvent passer avant de réaliser qu’on ne comprenait pas vraiment des types de données manipulés en toute bonne foi.\n\nLes meilleures techniques de développement ne suffisent pas à vous mettre à l’abri d’un manque de connaissances sur un type de données.\n\nJe vous propose donc de faire le tour de quelques types parmi les plus connus et utilisés pour découvrir les pièges qu’on ne connaît pas assez, qu’on soit débutant·e ou expérimenté·e.\n\nBienvenue dans l’enfer du code, aucun langage n’est à l’abri !",
    dateStartStr: "2024-12-06T14:00:00.000+01:00",
    durationMinutes: 50,
    speakerIds: ["cXI8Zuo4xrLrKneiwnUS"],
    trackId: "amphi3",
    language: "French",
    level: "beginner",
    formatId: "-conference",
    categoryId: "-pratiques-de-dev",
    hideTrackTitle: false,
  },
  {
    id: "9qWvHolfWZ5bDspvKjDN",
    title: "Voyage guidé au pays de l’inaccessibilité",
    abstract:
      "L’accessibilité n’est souvent pas une priorité. On pense toujours que nos clients ne sont pas concernés, que cela coûte cher… ou toutes autres excuses. \nEt puis le handicap c’est quoi ? Et l’accessibilité c’est quoi ?Un accès PMR dans un bâtiment, des sites accessibles aux mal ou non voyants ça suffit ? \n\nÀ l’heure des obligations légales d’accessibilité des sites internet, je vous propose de faire un petit tour dans ma vie et celle d’autres personnes handicapées et vous confronter à l’inaccessibilité du quotidien comme à l’inaccessibilité numérique.\n\nLe numérique a souvent une place importante dans nos vies donc c’est vous qui créer et/ou désigner notre liberté et notre indépendance. Je vous propose de venir le temps d’une conférence de l’autre côté du miroir.",
    dateStartStr: "2024-12-06T11:00:00.000+01:00",
    durationMinutes: 50,
    speakerIds: ["FzUBX43lEkLhCqVZJKwL"],
    trackId: "amphi2",
    language: "French",
    level: "beginner",
    formatId: "-conference",
    categoryId: "-ux-ui",
    hideTrackTitle: false,
  },
  {
    id: "DaKfWkV9ki44fiCE5s35",
    title: "Vers un monde numérique plus sobre et éco-responsable",
    abstract:
      "Dans un monde de plus en plus connecté, la question de la sobriété numérique et de l'éco-responsabilité des applications est primordiale. Il est crucial de repenser nos pratiques pour réduire l'empreinte environnementale des applications que nous développons. \nCela passe par la conception d'applications éco-conçues, optimisées pour limiter leur consommation énergétique et leur impact sur l'environnement.\n\nEn promouvant des pratiques de green coding, nous pouvons contribuer à la réduction des émissions de carbone et à la préservation des ressources naturelles. Les entreprises, les acteurs du numérique, et les développeurs ont un rôle clé à jouer en adoptant des stratégies axées sur la durabilité et en intégrant des critères environnementaux dans la conception de leurs produits numériques.\n\nEnsemble, en repensant notre approche du numérique, nous pouvons œuvrer vers un monde plus sobre, où les applications sont conçues dans le respect de l'environnement, offrant ainsi une expérience numérique plus responsable pour les utilisateurs tout en préservant notre planète pour les générations futures.",
    dateStartStr: "2024-12-06T16:05:00.000+01:00",
    durationMinutes: 20,
    speakerIds: ["RY85IjnTCW48UV6Og0nw"],
    trackId: "amphi1",
    language: "French",
    level: "intermediate",
    formatId: "-short-track",
    categoryId: "-discovery",
    hideTrackTitle: false,
  },
  {
    id: "LSWB8KbPTP7JWgAPp88g",
    title:
      "Dis papa! Comment ça marche l'IA générative ? ChatGPT et Dall-E sous le capot.",
    abstract:
      "45 minutes pour comprendre (un peu) comment ces algorithmes arrivent à écrire des poèmes ou répondre à des questions mieux que ta grand-mère.\n\nCe talk technique vise à dévoiler les mécanismes et les  , ces puissantes architectures d’IA.\nAu programme: \n* Une rapide introduction aux réseaux de neurones et à leur entrainement\n* Une plongée en profondeurs dans les Transformers, l'architecture dominante des LLMs\n* Une explication du Fine-tuning et des RAG pour avoir un LLM qui répond aux ordres\n* Un aperçu du fonctionnement de l'algorithme de Diffusion qui se cache derrière DALL-e et Midjourney",
    dateStartStr: "2024-12-06T11:55:00.000+01:00",
    durationMinutes: 50,
    speakerIds: ["5G0soID7jaEXnPAQ5r8D"],
    trackId: "amphi2",
    language: "French",
    level: "beginner",
    formatId: "-conference",
    categoryId: "-bigdata-ai",
    hideTrackTitle: false,
  },
  {
    id: "QlGcJWzsKtARK1OVmb1M",
    title: "Microservices, maxi supplice",
    abstract:
      "Sur notre projet, comme souvent, la dette technique a commencé au jour 1.\n\nAprès 2 ans avec une dizaine de développeurs, l’application, découpée depuis son commencement en micro-services (7 puis 4), souffre de problèmes de couplages entre services, et donc, de gros problèmes de performances, comme des requêtes essentielles qui répondaient en plus de 44sec (p95).\n\nElle est déjà utilisée en production par de gros clients et cet enjeu de performance freine son développement.\n\nDans ce contexte, nous allons orchestrer une task force de 4 développeurs et Ops sur environ 3 mois pour fusionner ces micro-services en un monolithe. Cette fusion doit s’inscrire dans la roadmap d’un projet en évolution constante et gêner le moins possible les ajouts fonctionnels.\n\nDans ce talk, nous parlerons de pourquoi et comment détruire une archi micro services pour retourner vers un majestueux monolithe :\n- Pourquoi un découpage en micro-services nécessite une maturité technique et métier que nous n’avions pas\n- Comment nous avons commencé par instrumenter pour détecter les bugs ou variations de performances\n- Comment nous avons analysé l’existant pour en déduire un plan avec des itérations régulières et moins risquées\n- Comment nous avons utilisé des outils visuels pour embarquer et synchroniser les autres équipes\n- Comment nous avons géré les problèmes rencontrés en cours de route\n\nAvec ce talk nous espérons vous montrer qu’il est toujours possible de résorber ce genre de dette technique. Si nous l’avons fait, vous pouvez y arriver sur votre projet et bénéficier de notre retour d’expérience.",
    dateStartStr: "2024-12-06T16:30:00.000+01:00",
    durationMinutes: 50,
    speakerIds: ["UJAQ7Y3Mc6srbOnbMbGX", "y2fW622rJpohDpDPkMQb"],
    trackId: "amphi1",
    language: "French",
    level: "intermediate",
    formatId: "-conference",
    categoryId: "-web",
    hideTrackTitle: false,
  },
  {
    id: "S1SAr9UgIyi6AXMjLZ1H",
    title:
      "Quand l'IA s'appuie sur le champignon - Qu'est ce que les champignons nous apprennent sur l'intelligence artificielle ?",
    abstract:
      "Les champignons possèdent des propriétés étonnantes. Nous les utilisons sous forme d'antibiotiques, de levures ou de substances hallucinogènes. Cependant, leur capacité à résoudre des problèmes algorithmiques complexes est plus méconnue.\n\nAinsi, les champignons sont capables de se propager en réseau de façon optimale ou de résoudre des problèmes du plus court chemin. Plus intéressant encore, la propagation des champignons suit un mécanisme similaire au fonctionnement des réseaux de neurones utilisés en intelligence artificielle.\n\nA l’heure où les modèles génératifs type ChatGPT deviennent monnaie courante, il est temps de prendre du recul sur le fonctionnement de l’intelligence artificielle. A première vue, l’analogie entre les champignons et les réseaux de neurone peut surprendre, mais c’est en fait une excellente porte d’entrée pour revoir ensemble les bases de l’IA et réfléchir à ses implications concrètes et philosophiques. Cette conférence propose non seulement une approche technique des réseaux neuronaux mais ouvre aussi de nouvelles pistes de réflexion sur un sujet sociétal majeur, qui implique de plus en plus les développeurs.",
    dateStartStr: "2024-12-06T14:55:00.000+01:00",
    durationMinutes: 50,
    speakerIds: ["3xWM3fVT3yfzmU0v4vpl"],
    trackId: "amphi1",
    language: "French",
    level: "beginner",
    formatId: "-conference",
    categoryId: "-bigdata-ai",
    hideTrackTitle: false,
  },
  {
    id: "Tkofj9fqxXyhTx3QY5va",
    title:
      "Panorama des outils et composantes logicielles open source pour le stockage, le traitement et la diffusion de l'information géographique",
    abstract:
      "C'est un fait, l'usage de l'information géographique fait partie de notre quotidien. Si consommer ou produire de la \"GéoData\" à partir des applications proposées sur le web ou disponibles sur les stores est aujourd'hui à la portée du plus grand nombre, concevoir ces outils nécessite en revanche des connaissances spécifiques pour proposer aux futurs utilisateurs des solutions performantes interopérables et évolutives\n\nDans le domaine des outils dédiés à la manipulation de l'information géographique, la communauté de l'Open source propose, ici aussi,  toute une gamme d'outils et de composantes à même de satisfaire les besoins du développeur d'applications mais également ceux du chargé de missions soucieux de valoriser et diffuser ses données.\n\nCette intervention propose de faire un tour rapide des solutions \"GIS\" open source mobilisables pour les thématiques suivantes\nLe stockage de l'information géographique (modélisation de l'information géographique et stockage dans les SGBD ou fichiers plats)\n* Les serveurs cartographiques et la normalisation des flux\n* Les Librairies cartographiques pour construire ses applications sur mesure\n* Les viewers et applications web cartographiques génériques faciles à prendre en main\n* Les outils SIG sur PC ou sur smartphone\n* Les utilitaires (ETL, gestion de smétadonnées , photogrammetrie, etc.)",
    dateStartStr: "2024-12-06T16:30:00.000+01:00",
    durationMinutes: 50,
    speakerIds: ["nhgsisuav0fMV2xC5xAy"],
    trackId: "amphi2",
    language: "French",
    level: "beginner",
    formatId: "-conference",
    categoryId: "-discovery",
    hideTrackTitle: false,
  },
  {
    id: "XEtghMFgquwIEEbuCgG5",
    title:
      "Le futur du design : un monde où le système prime sur l'utilisateur",
    abstract:
      "Nous évoluons dans une époque marquée par la complexité et l'imprévisibilité. Cette réalité exige de nous une réinvention de notre manière de créer. Les approches classiques de Design Thinking, centrées sur les besoins humains, montrent aujourd’hui leurs limites. Il est impératif de dépasser ces méthodes pour répondre aux défis actuels.\n\nSerons-nous capables de mobiliser nos compétences pour construire un avenir plus désirable pour l'environnement, la société et les individus ? Comment concevoir des produits numériques qui soient non seulement utiles et attrayants, mais également durables et respectueux de leur environnement ?\n\nEn tant que designeuse de produit, j'aimerais partager avec vous comment l'intégration d'une approche systémique dans le design a transformé ma pratique quotidienne.",
    dateStartStr: "2024-12-06T10:20:00.000+01:00",
    durationMinutes: 20,
    speakerIds: ["0JeLh0fxjtc6SmQnWpj9"],
    trackId: "amphi3",
    language: "French",
    level: "beginner",
    formatId: "-short-track",
    categoryId: "-ux-ui",
    hideTrackTitle: false,
  },
  {
    id: "ZrnzSiGdLNJUBEHyafYk",
    title:
      "L'Architecture Hexagonale par la pratique, le live coding qui rendra vos applications plus pérennes",
    abstract:
      "Il arrive toujours un moment où, le logiciel est tellement gros et vieux qu’il devient inmaintenable. Impossible de mettre à jour la stack technique sans tout casser, les nouvelles fonctionnalités deviennent de plus en plus longue à implémenter et la dette technique étant tellement lourde que le refactoring devient exorbitant.\n\nEt si on vous disait que tout ça était plus un problème de pratique qu’un problème de vieillesse du logiciel ?\n\nVenez découvrir par ce live coding, comment l’Architecture Hexagonale peut tacler la complexité logicielle en vous permettant d’être évolutif et pérenne tout en vous aidant à mieux gérer votre dette technique.",
    dateStartStr: "2024-12-06T14:00:00.000+01:00",
    durationMinutes: 50,
    speakerIds: ["F2WldklOGjPxdFWZCN3p"],
    trackId: "amphi2",
    language: "French",
    level: "beginner",
    formatId: "-conference",
    categoryId: "-pratiques-de-dev",
    hideTrackTitle: false,
  },
  {
    id: "aOugKtXlV9Sv3G21V0PJ",
    title: "L'Art de Tester une IA: arrêtons de naviguer à vue !",
    abstract:
      "Tester un programme classique, c'est comme faire un contrôle technique à sa voiture : c'est fastidieux mais assez prévisible. Par contre, tester une Intelligence Artificielle, surtout quand elle est basée sur du machine learning, c'est comme trouver sa position en mer avec un sextant et un compas : possible seulement pour les marins chevronnés avec une carte et de bonnes notions de maths ! Bien sûr il existe des «vanity metrics» comme les sacro-saintes exactitude (accuracy) et coefficient de détermination (R²) du modèle, secondée par leurs suivantes que sont: la précision, le rappel, le F1-score, le MSE, le RMSE, le MAPE, etc. Avec le développement des systèmes d’IA, d’autres métriques ont également vu le jour pour permettre d’évaluer leur explicabilité, leur temps de latence, leur stabilité, leur robustesse et même leur bilan carbone !\n\nToutefois, est-on réellement certain que toute ces évaluations vont nous permettre d’obtenir un résultat qui nous apporte de la valeur ? Qui respecte nos lois (ou celles inhérentes au monde de la physique) ? Comment s’assurer de la cohérence des modèles avec le monde qui nous entoure quand le simple ajout d’un pixel dans une image peut tout faire basculer ?\n\nL’évaluation des modèles est la pierre angulaire du pipeline de création d’un système d’apprentissage. Une bonne évaluation, à l’aide de benchmark adapté au contexte, permet de déployer plus sereinement en production des systèmes qui apportent de la valeur. Et après le déploiement, un processus de surveillance continue aide à se prémunir du *data-drift* et du *concept-drift*. \n\nParce qu'une IA, ça dérive plus vite qu'un bateau sans capitaine !",
    dateStartStr: "2024-12-06T09:25:00.000+01:00",
    durationMinutes: 50,
    speakerIds: ["rzquAGiqcVkWvMUvT49U"],
    trackId: "amphi2",
    language: "French",
    level: "intermediate",
    formatId: "-conference",
    categoryId: "-bigdata-ai",
    hideTrackTitle: false,
  },
  {
    id: "eglFSGcw0HSigqsXcEji",
    title: "La Crypto Hardware, comment sécuriser nos devices ?",
    abstract:
      "CTO, lead dev, développeur.euse, vous ne connaissez pas Elixir, mais vous voulez découvrir ces bienfaits ?\n\nCTO, lead dev, développeur.euse, vous avez entendu parler d'Elixir, mais vous ne savez pas si ce langage est fait pour votre projet et votre équipe ?\n\nCTO, lead dev, développeur.euse, vous voulez adopter Elixir, mais vous ne savez comment commencer ?\n\nCe talk vous plongeras dans un retour d'expérience sur l’implantation d'Elixir dans un projet IoT complexe. Backend, web, monitoring, infrastructure, distribution, haute disponibilité, tolérance à la faute... qu'est ce que Elixir, Erlang et l'Open Telecom Platform peuvent apporter comme avantages (et défauts) à vos projets ? Comment démarrer demain et facilement un nouveau projet Elixir ?\n",
    dateStartStr: "2024-12-06T11:30:00.000+01:00",
    durationMinutes: 20,
    speakerIds: ["OkCDf7MGhu64xOV13jyi"],
    trackId: "amphi1",
    language: "French",
    level: "beginner",
    formatId: "-short-track",
    categoryId: "-discovery",
    hideTrackTitle: false,
  },
  {
    id: "fX3D8yxWf5wR9RGTjzul",
    title: "Chrome DevTools from Zero to Hero",
    abstract:
      "Depuis longtemps, en front on a pris l'habitude de debuguer à coup de `console.log`.\n\nAussi, combien de fois avez-nous été confronté à des problèmes utilisateurs sans les comprendre réellement ?\n\nEt si je vous disais qu'il existe de nombreuses autres façon de debuguer votre front et que de nombreuses astuces autour de votre navigateur peuvent vous aider tous les jours ?\n\nEn 20 minutes nous aborderont différentes aspects des Chrome DevTools pour que vous ne soyez plus démunis face à un front récalcitrant et pour vous faire gagner en expérience développeur.",
    dateStartStr: "2024-12-06T16:05:00.000+01:00",
    durationMinutes: 20,
    speakerIds: ["0k0KOiwAvFKPqrjm37gX"],
    trackId: "amphi2",
    language: "French",
    level: "beginner",
    formatId: "-short-track",
    categoryId: "-web",
    hideTrackTitle: false,
  },
  {
    id: "ffnpaan4NrclaEMrLuLC",
    title: "Comment ne plus avoir peur de vos fichiers de log 🕸️",
    abstract:
      "😱 Vos fichiers de logs ressemblent à une monstruosité digne de Cthulhu ?  \n🧟‍♀️ Les astreintes vous donnent la chair de poule ?  \n🔎 Vous ne savez jamais choisir entre debug, warning ou error lors de l'écriture des logs ?  \n  \nJe vous propose aujourd'hui de vous donner quelques armes de base pour soigner vos fichiers de log applicatif, issues de mon expérience dans l'industrie du paiement sur autoroute.  \nVous aurez ainsi une meilleure idée de comment choisir le niveau de gravité d'une ligne de log, et quelles sont les informations pertinentes à y indiquer.  \nDe quoi être mieux armé⋅es pour la chasse aux ~~vampires~~ bugs !\n\n---\n\n_Le sujet ouvert à tous niveaux et langages car nous aborderons des principes assez généraux, avec quelques exemples._",
    dateStartStr: "2024-12-06T11:55:00.000+01:00",
    durationMinutes: 50,
    speakerIds: ["3ajV130oxggTJGucKAl6"],
    trackId: "amphi1",
    language: "French",
    level: "beginner",
    formatId: "-conference",
    categoryId: "-pratiques-de-dev",
    hideTrackTitle: false,
  },
  {
    id: "flcxKMwQXUe23YYfhNqU",
    title: "La Clean Archi ca marche aussi dans le Front !",
    abstract:
      "**Tout le monde pense que la \"Clean Architecture / Architecture Hexagonale\" se fait uniquement côté Back**.  \nDans ce talk, je vais vous montrer que cela fonctionne également côté Front.  \nEt oui, Redux n'est pas le Silver Bullet des applications front-end.  \nEt oui, Les Stores ne sont pas toujours obligatoires, mais ceci est une autre histoire !\n\n**La mise en place d'une \"clean archigonale\" ©️ sur un Front-End en VueJS, m'a sauvé la vie !**  \nPourquoi je structure un minimum mes projets fronts et comment au final, je fais gagner du temps à mon équipe.\n\nAvec ce talk on va revenir sur **l'importance d'isoler son code des dépendances extérieures (axios, vueJS, etc.)**\nOn verra que l'on peut tester de l'affichage avec des Tests Unitaires, sans forcément passer par du cypress ou du component testing.\n\nTake away :\n- Architecture\n- Stratégie de Tests",
    dateStartStr: "2024-12-06T14:55:00.000+01:00",
    durationMinutes: 50,
    speakerIds: ["fXaDZxBjPj4yacuhnanS"],
    trackId: "amphi3",
    language: "French",
    level: "intermediate",
    formatId: "-conference",
    categoryId: "-web",
    hideTrackTitle: false,
  },
  {
    id: "mMxCCoBqmP8PgJsXfUX5",
    title: "Quand le Terminal dévore la UI : TUI pour tout le monde !",
    abstract:
      "Lassé·es des interfaces graphiques gourmandes en ressources et complexes à utiliser ?   \nVous n'avez pas de temps à perdre entre votre terminal et un navigateur web ?  \nDécouvrez le pouvoir de l'interface utilisateur textuelle (Textual User Interface) !  \n\nNous explorerons l'univers des TUI et leur potentiel pour enrichir les applications en ligne de commande.   \nEn partant d'une CLI simple, je vous montrerai comment intégrer des éléments de TUI pour créer une expérience utilisateur plus intuitive et interactive. \n\nJe vous proposerai un aperçu de quelques frameworks TUI populaires tels que Textual, BubbleTea et Ratatui, respectivement pour les langages Python, Golang et Rust.\nQue vous ayez une grande maîtrise du développement ou que vous soyez novice, ce talk vous montrera comment ces frameworks pourront vous aider à créer des interfaces utilisateur textuelles de nouvelle génération.\n\nVous repartirez donc  :\n- en sachant ce que les TUI peuvent vous apporter\n- avec un tour d'horizon de solutions pour en développer vous même\n- avec des exemples concrets de code\n\nEt n'oubliez pas : ne quittez plus le confort de votre terminal quand les TUI sont là pour vous !",
    dateStartStr: "2024-12-06T09:25:00.000+01:00",
    durationMinutes: 50,
    speakerIds: ["RnE1G3B1bJ1nvE82rpKc"],
    trackId: "amphi3",
    language: "French",
    level: "beginner",
    formatId: "-conference",
    categoryId: "-ux-ui",
    hideTrackTitle: false,
  },
  {
    id: "mZfWeKaZTnsF6eg3nWVu",
    title: "Alerte, tout brûle ! Comment gérer des incidents techniques",
    abstract:
      "Chez PayFit, malgré le côté \\\"licorne scale-up\\\", tout est loin d'être rose et plein de paillettes : en moyenne, sur les 6 derniers mois, nous avons un incident par jour — de gravité différente bien sûr.\n\nVenez découvrir comment, en l'espace d'un an, nous sommes passé d'une culture où le mot \\\"incident\\\" n'existait même pas et où les problèmes soudains étaient cachés dans des board Jira obscurs, à aujourd'hui où nous nous sommes outillés et organisés pour les gérer sereinement et s'en servir comme leviers d'une démarche d'amélioration continue et de réduction de la dette technique.\n\nAu programme :\n- Évaluer la sévérité d'un incident\n- Communiquer en interne\n- Communiquer publiquement\n- Mitigations, troubleshooting, et autre\n- Outillage & automatisation\n- Post-mortems\n- Un mot sur l'astreinte\n\nVous ressortirez de ce talk avec un retour d'expérience concret sur la manière dont nous gérons nos incidents chez PayFit, et le chemin que nous avons parcouru pour en arriver à une approche saine et constructive, incluant bien sûr des idées et tips que vous pourrez appliquer chez vous si besoin !",
    dateStartStr: "2024-12-06T11:55:00.000+01:00",
    durationMinutes: 50,
    speakerIds: ["Y3lAFNatb8otVTjrxmql"],
    trackId: "amphi3",
    language: "French",
    level: "beginner",
    formatId: "-conference",
    categoryId: "-pratiques-de-dev",
    hideTrackTitle: false,
  },
  {
    id: "nQJKoHhFKOjlF8ll2lya",
    title: "La Crypto Hardware, comment sécuriser nos devices ?",
    abstract:
      "Les attaques cyber se font de plus en plus présentes : fisching, emails frauduleux etc...\nNous avons donc naturellement tendance à nous focaliser sur la sécurisation de nos SI, et c'est très bien !\n\nAttention pourtant, le matériel en tant que tel est une entrée d'attaque qu'il ne faut pas négliger.\nLes médias ont relaté de sombres histoires de vols de données par des étudiants internationaux...\n\nDes solutions existent !\n\nJe vous propose de vous présenter la sécurisation d'un device hardware vie Secure Element",
    dateStartStr: "2024-12-06T11:00:00.000+01:00",
    durationMinutes: 20,
    speakerIds: ["GXqn9Y8juiJfoM8t6MXN"],
    trackId: "amphi1",
    language: "French",
    level: "intermediate",
    formatId: "-short-track",
    categoryId: "-iot-and-hardware",
    hideTrackTitle: false,
  },
  {
    id: "tiUZ2G880gjyfWDQBzmF",
    title: "Comment merger sa PR en 10 secondes​ : REX mob code review",
    abstract:
      "Dans la plupart des équipes de développement les suggestions de code sont faites via des Pull (ou Merges) Request. Elles sont le lieu de discussions asynchrones pouvant prendre des heures voire des jours à se terminer. Des validations sont en plus nécessaires pour les merger ralentissant le rythme des releases de nouvelles fonctionnalités. Ces échanges écrits peuvent également amener des incompréhensions et une communication violente qui peuvent dégrader la cohésion dans une équipe.\n\nPendant 2 ans, dans mon équipe, nous avons fait du mob code review avant de merger nos PR. Au lieu de les ouvrir et de faire des code reviews chacun de notre côté, nous nous retrouvions plusieurs fois par jour pour présenter et améliorer le code écrit. C’est comme cela que nous mergions nos PR en 10 secondes​.\n\nAprès vous avoir présenté ce concept, je vous expliquerai comment nous avons fait évoluer nos pratiques au fur et à mesure que l’équipe grandissait. Parmi elles, nous souhaitions aligner l’architecture et les standards de code, tout en ayant au sein de l’équipe, une bonne compréhension de l’application d’un point de vue fonctionnel ou technique. Je détaillerai les difficultés que nous avons rencontrées et les ajustements que nous avons mis en place, les avantages et les inconvénients que j’y vois, ainsi que les conditions nécessaires pour faire du mob code review.",
    dateStartStr: "2024-12-06T16:05:00.000+01:00",
    durationMinutes: 20,
    speakerIds: ["9quzMrZRKcaQe84ZpIzB"],
    trackId: "amphi3",
    language: "French",
    level: "beginner",
    formatId: "-short-track",
    categoryId: "-pratiques-de-dev",
    hideTrackTitle: false,
  },
  {
    id: "u1VI0s1ExsOJQgyFbAOB",
    title: "Les tendances en architecture : entre mythes et réalité",
    abstract:
      "Les différentes architectures se suivent et ne se ressemblent pas... vraiment ?\n\nDans ce talk, je vous propose de revisiter les différentes hypes sur les 20 dernières années, de voir ce qui tient encore aujourd'hui (et pourquoi) et surtout de démystifier les architectures logiciels et des systèmes d'information émergentes. \nTout cela en prenant le prenant le point de vue d'un/e architecte, faisant le lien entre la stratégie d'entreprise, ses métiers, son SI, son parc applicatif et ses infrastructures... Tout un programme ! \n\nNous décoderons notamment les dernières tendances avec cette perspective : Modulith, Cell-based Architecture, les architectures éco-conçues, la socio-technical architecture ou encore les fameux LLM / RAG si gourmands en ressources hardware.",
    dateStartStr: "2024-12-06T16:30:00.000+01:00",
    durationMinutes: 50,
    speakerIds: ["BX00p9A5VCEXggie1bse"],
    trackId: "amphi3",
    language: "French",
    level: "intermediate",
    formatId: "-conference",
    categoryId: "-pratiques-de-dev",
    hideTrackTitle: false,
  },
  {
    id: "w91TD0rjNLMyXIS0T2pK",
    title: "TDD décortiqué",
    abstract:
      "Vous avez tenté de travailler avec le Test-Driven Development (TDD) mais avez abandonné ? Moi aussi ! Mais désormais, j’ai repris et je ne peux plus me passer de cette méthodologie.\n\nSe lancer dans le TDD n’est pas une mince affaire. Après plusieurs tentatives, j'ai appris des leçons précieuses que j'aurais aimé saisir dès le départ, comme la fameuse notion de _baby steps_.\n\nJe vous propose de démystifier cette pratique avec une présentation qui décortique le concept en profondeur.\n\nEnsemble, découvrons comment tirer profit du TDD pour sécuriser notre développement quotidien !",
    dateStartStr: "2024-12-06T10:20:00.000+01:00",
    durationMinutes: 20,
    speakerIds: ["sTLnsfm7wb1WKt3pmIiZ"],
    trackId: "amphi2",
    language: "French",
    level: "beginner",
    formatId: "-short-track",
    categoryId: "-pratiques-de-dev",
    hideTrackTitle: false,
  },
  {
    id: "xen7le9FyX6PylOAABa8",
    title:
      "Les différents mode de synchronisation des Data platforms chez Carrefour",
    abstract:
      "Les plus grandes entreprises, composées de plusieurs pays et/ou filiales, ont plusieurs data platform locales. Chez Carrefour, nous avons un modèle fédéré où chaque pays a sa propre data platform.\n\nTant que les data platform soient utilisées localement, il n'y a pas de problème. Cependant, lorsque le siège souhaite consolider et agréger les données des différentes data platform pour créer des applications globales, des dashboard d'analyse ou des opérations centralisées, de nombreux problèmes sont à résoudre. Au-delà de la gouvernance et de la documentation des données, la synchronisation des données est un véritable challenge.\n\nQuand faut-il récupérer les données de chaque data platform pour les croiser et les agréger?\n\nDe nombreuses solutions sont possibles : utiliser un ordonnanceur, utiliser un orchestrateur, utiliser une architecture événementielle,...\nNous passerons en revue ces solutions, leurs avantages et leurs inconvénients en fonction des cas d'utilisation et des exigences.\n\nUne démo et des interactions avec les participants sont prévues pour cette session",
    dateStartStr: "2024-12-06T11:00:00.000+01:00",
    durationMinutes: 50,
    speakerIds: ["bkjzYBX2F7jOeQqunlB1"],
    trackId: "amphi3",
    language: "French",
    level: "intermediate",
    formatId: "-conference",
    categoryId: "-bigdata-ai",
    hideTrackTitle: false,
  },
];
