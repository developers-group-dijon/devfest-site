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
    id: "0JeLh0fxjtc6SmQnWpj9",
    name: "Clémence Piteau",
    bio: "*Product designeuse indépendante et engagée*, j'explore de nouvelles pratiques dans le design pour mettre mon savoir au service d'un futur plus souhaitable pour l'environnement, la société et les individus.",
    company: "CLEMTOPI",
    jobTitle: null,
    photoUrl: "/avatars/clemence-piteau.webp",
    socials: [
      {
        id: "mastodon",
        name: "Mastodon",
        link: "https://mastodon.design/@clem_topi",
      },
    ],
  },
  {
    id: "0k0KOiwAvFKPqrjm37gX",
    name: "Simon Belbeoch",
    bio: "Simon débute l’informatique dès son plus jeune âge en automatisant des scripts et en réalisant le site de la webradio associative auprès de laquelle il s’engage à 12 ans.\nIl développe sa passion lors de ses études en MIAGE ou il développe ses compétences en apprentissage sur de l’expertise technique chez Orange puis SFR.\nIl lance en parallèle Intuitive Communication une application libre et gratuite qui permet aux personnes en situation de handicap de communiquer à nouveau. Convaincu que le web est voué à perdurer il développe l’application au format web ce qui permettra à quelques dizaines de milliers de personnes sourdes d’utiliser l’application.\n\nPendant deux ans et demi Simon tente ensuite l’expérience entrepreneuriale en développant frankise, une solution web pour remettre les utilisateurs en avant dans le cadre des avis clients. Il rejoint ensuite Octo Technology ou il rejoint WebF pour lui permettre dans ses mission comme en R&D de travailler autour des PWA et sur l’architecture front.",
    company: "Octo Technology",
    jobTitle: null,
    photoUrl: "/avatars/simon-belbeoch.webp",
    socials: [
      {
        id: "github",
        name: "GitHub",
        link: "LiquidITGuy",
      },
      {
        id: "twitter",
        name: "Twitter",
        link: "liquidIT_fr",
      },
    ],
  },
  {
    id: "3ajV130oxggTJGucKAl6",
    name: "Virginie Pageaud",
    bio: "Diplômée en 2010 d'un Master de cryptologie et sécurité informatique, j'ai travaillé 12 ans dans le secteur du paiement par carte bancaire pour les autoroutes, les transports en commun ou encore du don.  \n\nJ'aime particulièrement apprendre de nouvelles choses, et également transmettre et vulgariser les sujets qui me passionnent.",
    company: null,
    jobTitle: null,
    photoUrl: "/avatars/virginie-pageaud.webp",
    socials: [
      {
        id: "github",
        name: "GitHub",
        link: "Fairy-wen",
      },
      {
        id: "twitter",
        name: "Twitter",
        link: "La_Fee_Dragee",
      },
    ],
  },
  {
    id: "3xWM3fVT3yfzmU0v4vpl",
    name: "Marine Sobas",
    bio: "Après des études entre commerce et ingénierie, j'ai commencé ma carrière en data science puis je me suis ensuite orientée vers le développement full stack. Je suis actuellement tech lead engineering chez Dataiku, une entreprise qui développe un logiciel collaboratif pour faciliter l'adoption de l'IA en entreprise. \n\nPassionnée par les sujets pluridisciplinaires, je cherche à partager mes lectures et mes expériences à travers des présentations ou des blogposts.",
    company: "Dataiku",
    jobTitle: null,
    photoUrl: "/avatars/marine-sobas.webp",
    socials: [
      {
        id: "github",
        name: "GitHub",
        link: "Marsobad",
      },
      {
        id: "twitter",
        name: "Twitter",
        link: "Marine_Sobas",
      },
    ],
  },
  {
    id: "4zSmVVqdtphkOC9fcOVK",
    name: "Paul Molin",
    bio: "Paul Molin is the CISO of the Theodo Group.\nAfter training in information systems security, he joins Theodo in 2013 and becomes passionate about web development. Very quickly, he specializes in security issues by helping Theodo teams to succeed in their post-production audits. He eventually becomes group CISO, and he is committed to creating a security culture in a developer company. He loves giving talks, especially to help developers understand the cybersecurity world. Convinced that it is developers who will change the world of cybersecurity, he leads trainings and develops tools to help them code flawlessly the first time.",
    company: "Theodo",
    jobTitle: null,
    photoUrl: "/avatars/paul-molin.webp",
    socials: [
      {
        id: "github",
        name: "GitHub",
        link: "Paulmolin",
      },
      {
        id: "twitter",
        name: "Twitter",
        link: "paulmolin42",
      },
    ],
  },
  {
    id: "5G0soID7jaEXnPAQ5r8D",
    name: "Arnaud Pichery",
    bio: null,
    company: "Dataiku",
    jobTitle: null,
    photoUrl: "/avatars/arnaud-pichery.webp",
    socials: [],
  },
  {
    id: "9quzMrZRKcaQe84ZpIzB",
    name: "Thibaut Cantet",
    bio: "17 ans de développement, crafter, architecte et DDD adict",
    company: "Néosoft",
    jobTitle: null,
    photoUrl: "/avatars/thibaut-cantet.webp",
    socials: [
      {
        id: "github",
        name: "GitHub",
        link: "thibautcantet",
      },
      {
        id: "twitter",
        name: "Twitter",
        link: "thibautcantet",
      },
    ],
  },
  {
    id: "BX00p9A5VCEXggie1bse",
    name: "Adrien Nortain",
    bio: "Ex-Wavestone - Consulting, software architecture, coding\nEx-Bosch - Consulting, vendor product engineering\nEx-CGI - Expertise, architecture, projects tech lead\nCurrent-Zenika :) - CTO, consulting, architecture",
    company: "Zenika",
    jobTitle: null,
    photoUrl: "/avatars/adrien-nortain.webp",
    socials: [
      {
        id: "github",
        name: "GitHub",
        link: "LamSonFei",
      },
      {
        id: "twitter",
        name: "Twitter",
        link: "AdrienNortain",
      },
    ],
  },
  {
    id: "F2WldklOGjPxdFWZCN3p",
    name: "Julien Topçu",
    bio: "Tech Coach chez Shodo, j'accompagne le développement de logiciels à forte valeur métier en usant de techniques issues du Domain-Driven Design, le tout propulsé en Xtreme Programming dans la philosophie Kanban #NoEstimates. Membre de la fondation OWASP, je sensibilise sur les techniques de sécurité applicative afin d'éviter de se faire hacker bien comme il faut.",
    company: "Shodo",
    jobTitle: null,
    photoUrl: "/avatars/julien-topcu.webp",
    socials: [
      {
        id: "github",
        name: "GitHub",
        link: "julien-topcu",
      },
      {
        id: "twitter",
        name: "Twitter",
        link: "JulienTopcu",
      },
    ],
  },
  {
    id: "FzUBX43lEkLhCqVZJKwL",
    name: "Thanh Lan Doublier",
    bio: "Après des études de droits, je suis tombée dans le développement web . Après quelques années en tant que développeuse  free-lance  RoR, mon état de sante s’est dégradée, ce qui m’a forcée à m’arrêter de coder pendant environ deux ans.\n\nAprès une formation orientée data science et une  alternance  chez Axa France, je suis actuellement Data engineer Mlops chez Second Brain une start-up  qui développe des solutions qui accompagnent les industriels pharmaceutiques dans leur processus de vente.\n\nLe code est un des éléments clef qui m’a aidé à accepter et avancer avec la maladie. C’est pour moi, un peu comme une baguette magique où tout peut devenir possible. Mais comme un grand pouvoir implique de grandes responsabilités,  il est parfois utile en tant que développeuse ou développeur de se questionner  sur nos pratiques et déconstruire nos biais.\n\nJe fais partie de l’organisation de Cloud Nord ( une conférence  orientée cloud à Lille ) et des Chtitedev ( un collectif de femmes de la tech)",
    company: "Second brain",
    jobTitle: null,
    photoUrl: "/avatars/thanh-lan-doublier.webp",
    socials: [],
  },
  {
    id: "GXqn9Y8juiJfoM8t6MXN",
    name: "Vincent Thivent",
    bio: null,
    company: "Odalid",
    jobTitle: null,
    photoUrl: "/avatars/vincent-thivent.webp",
    socials: [],
  },
  {
    id: "RY85IjnTCW48UV6Og0nw",
    name: "Thierno Diallo",
    bio: "Actuellement, je travaille en tant que Staff Engineer chez Axa France depuis 5 mois. J'ai travaillé en tant que Leader technique/ingénieur logiciel senior chez Axa France pendant 3 ans et demi. J'ai commencé chez Axa France il y a 4 ans.\n\nJe suis un ingénieur expérimenté avec une expérience avérée dans l'IT. Je suis compétent en Java/JEE/Spring/SpringBoot, Python, PostgreSQL, Webmethods, ODM, concepts SOA, modélisation statistique et Prolog. Professionnel de l'ingénierie solide avec un diplôme en Génie Informatique et Statistique axé sur l'ingénierie des systèmes et des réseaux, l'ingénierie logicielle et l'ingénierie financière de Polytechnique Lille.\n\nJ'ai précédemment travaillé pour la SNCF pendant 4 ans, et avant cela pour Capgemini pendant 2 ans et demi.",
    company: "Axa France",
    jobTitle: null,
    photoUrl: "/avatars/thierno-diallo.webp",
    socials: [
      {
        id: "github",
        name: "GitHub",
        link: "thiernodialloAFA",
      },
      {
        id: "twitter",
        name: "Twitter",
        link: "DialloThierno29",
      },
    ],
  },
  {
    id: "RnE1G3B1bJ1nvE82rpKc",
    name: "Thierry Chantier",
    bio: "Une passion née dans les lectures, le monde informatique et électronique m'a happé dès mon ZX Spectrum pour ne jamais me lâcher.\nDéveloppeur de métier, du jeu vidéo au monde du master data management, j'ai aussi touché aux univers de la QA et de la mise en production.\nJe suis maintenant Developer Advocate, chez OVHcloud, jonglant entre technique, communauté et transmission de savoirs.\n\nComme une passion mérite toujours qu'on la transmette, j'ai fondé Mixteen pour essayer d'aider les enfants à appréhender le monde numérique.\nCette envie de transmettre c'est aussi manifestée en m'amenant à prendre part à l'organisation de plusieurs MiXiT puis à cofonder le GDG Lyon.\nDe manière parallèle, j'essaie de partager également par le biais d'articles sur mon blog et de vidéos sur ma chaîne YouTube.\n\nEn résumé : \nhttps://noti.st/titimoby\n\nDans le détail : \nhttps://www.twitch.tv/titimoby\nhttps://mixteen.org/ \nhttps://tontoncodeur.fr/ \nhttps://www.youtube.com/thierrychantier\nhttps://gdg.community.dev/gdg-cloud-and-iot-lyon/",
    company: null,
    jobTitle: null,
    photoUrl: "/avatars/thierry-chantier.webp",
    socials: [
      {
        id: "github",
        name: "GitHub",
        link: "titimoby",
      },
      {
        id: "twitter",
        name: "Twitter",
        link: "titimoby",
      },
    ],
  },
  {
    id: "UJAQ7Y3Mc6srbOnbMbGX",
    name: "Yann Jacquot",
    bio: "Yann is Senior Architect and Coach at Theodo in Paris since 2013.\n\nHe loves developing applications and solving problems, at the same time as much as possible, in domains such as: banking, marketplace, carpooling, insurance, energy, circular economy...\nHis main hobbies are cinema, motorcycles and games of all sorts.",
    company: "Theodo",
    jobTitle: null,
    photoUrl: "/avatars/yann-jacquot.webp",
    socials: [
      {
        id: "github",
        name: "GitHub",
        link: "yannj",
      },
    ],
  },
  {
    id: "XrZhY3jzawmYvQTnmgtS",
    name: "Nicolas Fränkel",
    bio: "Developer Advocate with 15+ years experience consulting for many different customers, in a wide range of contexts (such as telecoms, banking, insurances, large retail and public sector). Usually working on Java/Java EE and Spring technologies, but with focused interests like Rich Internet Applications, Testing, CI/CD and DevOps. Currently working for Hazelcast. Also double as a teacher in universities and higher education schools, a trainer and triples as a book author.",
    company: "Garm Solutions",
    jobTitle: null,
    photoUrl: "/avatars/nicolas-frankel.webp",
    socials: [
      {
        id: "github",
        name: "GitHub",
        link: "nfrankel",
      },
      {
        id: "twitter",
        name: "Twitter",
        link: "nicolas_frankel",
      },
    ],
  },
  {
    id: "Y3lAFNatb8otVTjrxmql",
    name: 'Alexis "Horgix" Chotard',
    bio: 'Alexis "Horgix" Chotard est un ingénieur système et développeur travaillant à PayFit (https://payfit.fr).\n\nDéveloppeur de formation avec une expérience davantage tournée système et infrastructure, se retrouvant naturellement dans tous les sujets "DevOps" au sens large.\n\nPassionné d\'automatisation pour construire des systèmes autonomes, résilients et facilement maintenables.\nEngagé dans l\'écosystème "Cloud Native", amoureux de Rust, partisan de l\'opensource.',
    company: null,
    jobTitle: null,
    photoUrl: "/avatars/alexis-horgix-chotard.webp",
    socials: [
      {
        id: "github",
        name: "GitHub",
        link: "Horgix",
      },
      {
        id: "twitter",
        name: "Twitter",
        link: "Horgix",
      },
    ],
  },
  {
    id: "bkjzYBX2F7jOeQqunlB1",
    name: "Guillaume Blaquiere",
    bio: "Guillaume est Google Developer Expert sur Cloud Platform et travaille chez Carrefour en tant que Architect Data Groupe. \nDéveloppeur Java depuis plus de 15 ans, et malgré des précédents postes à responsabilités, il a toujours conservé son envie de créer, de développer, de découvrir et de tester de nouvelles solutions, notamment dans le Cloud, le machine learning ou les langages Go et Python.\nPassionné d’innovation et certifié 3x Google Cloud, writer et speaker sur son temps libre, il est fasciné par le serverless et les problèmes “traditionnels” qu’il résout.\nPlus généralement, il aime aider les personnes bloquées sur Google Cloud. Vous pouvez le croiser sur Stack Overflow (guillaume-blaquiere), Medium (@guillaume-blaquiere) et Twitter (@gblaquiere)",
    company: "Carrefour",
    jobTitle: null,
    photoUrl: "/avatars/guillaume-blaquiere.webp",
    socials: [
      {
        id: "github",
        name: "GitHub",
        link: "guillaumeblaquiere",
      },
      {
        id: "twitter",
        name: "Twitter",
        link: "gblaquiere",
      },
    ],
  },
  {
    id: "cXI8Zuo4xrLrKneiwnUS",
    name: "Frédéric Bisson",
    bio: "Développeur web le jour, je remonte le temps des technologies pour découvrir comment on en est arrivé là.",
    company: null,
    jobTitle: null,
    photoUrl: "/avatars/frederic-bisson.webp",
    socials: [
      {
        id: "github",
        name: "GitHub",
        link: "zigazou",
      },
      {
        id: "twitter",
        name: "Twitter",
        link: "zigazou",
      },
    ],
  },
  {
    id: "fXaDZxBjPj4yacuhnanS",
    name: "Dorian Lamandé",
    bio: "Dorian, à la fois formateur et leader d'équipe partage avec enthousiasme ses compétences humaines et techniques pour inspirer et guider chacun vers l'exploitation totale de leurs capacités.",
    company: "Octo Technology",
    jobTitle: null,
    photoUrl: "/avatars/dorian-lamande.webp",
    socials: [
      {
        id: "github",
        name: "GitHub",
        link: "dlamande",
      },
    ],
  },
  {
    id: "nhgsisuav0fMV2xC5xAy",
    name: "Cédric Darbon",
    bio: null,
    company: "Agaric IG",
    jobTitle: null,
    photoUrl: "/avatars/cedric-darbon.webp",
    socials: [],
  },
  {
    id: "ovR5jqnKjPV6MSd0sKay",
    name: "Alexandre Ruiz",
    bio: "Passionné de développement depuis l'âge de 15ans, j'ai toujours souhaité aider et améliorer le quotidien des gens grâce aux outils informatiques ! Aujourd'hui, j'accompagne les équipes dans le développement d'outils utilisables par tous !\n\nEt depuis quelques années, je partage cette passion et mon expérience du terrain en occupant le rôle d'enseignant à l'IUT informatique !",
    company: "Apside",
    jobTitle: null,
    photoUrl: "/avatars/alexandre-ruiz.webp",
    socials: [
      {
        id: "twitter",
        name: "Twitter",
        link: "l_lexxx",
      },
    ],
  },
  {
    id: "pHGTjgKtqKoNcNPQS3vp",
    name: "Bertrand Delacrétaz",
    bio: "Bertrand Delacretaz (@bdelacretaz) travaille comme Principal Scientist et Web Platform Advocate pour le groupe R&D de Adobe Research à Bâle, en Suisse, sur des systèmes de gestion de contenu et publication Web à grande échelle. Près de trente ans après avoir pressé ENTER pour la première fois sur un lien hypertexte, Bertrand reste passionné par les technologies du Web. La veille technologique autour du Web est une part importante de son activité, qu'il partage volontiers dans diverses conférences. Bertrand est aussi actif dans l'Open Source et a siégé 14 ans au comité de direction de la fondation Apache (\"Apache Software Foundation\").",
    company: "Adobe & Apache",
    jobTitle: null,
    photoUrl: "/avatars/bertrand-delacretaz.webp",
    socials: [
      {
        id: "github",
        name: "GitHub",
        link: "bdelacretaz",
      },
      {
        id: "twitter",
        name: "Twitter",
        link: "bdelacretaz",
      },
    ],
  },
  {
    id: "rzquAGiqcVkWvMUvT49U",
    name: "Sarah Ghidalia",
    bio: null,
    company: "Laboratoire CIAD",
    jobTitle: null,
    photoUrl: "/avatars/sarah-ghidalia.webp",
    socials: [
      {
        id: "github",
        name: "GitHub",
        link: "Mileem",
      },
    ],
  },
  {
    id: "sIO9sxIUn9xLj7uQJ2Ja",
    name: "Marine du Mesnil",
    bio: "Head of Cybersecurity Tribe @Theodo, Marine du Mesnil s’intéresse tout particulièrement à la sécurité informatique et s’implique au sein de la guilde Sécurité de Theodo pour aider les développeurs à créer des produits conformes en les formant et en intervenant dans les différents projets. \n\nElle suit particulièrement les publications de l’OWASP et s’intéresse tout particulièrement au contrôle d’accès, devenu la cause principale de faille sur les sites internets et placé au Top 1 du nouveau Top 10 de l’OWASP.",
    company: "Theodo",
    jobTitle: null,
    photoUrl: "/avatars/marine-du-mesnil.webp",
    socials: [
      {
        id: "github",
        name: "GitHub",
        link: "marine-mb",
      },
      {
        id: "twitter",
        name: "Twitter",
        link: "marine_mesnil",
      },
    ],
  },
  {
    id: "sTLnsfm7wb1WKt3pmIiZ",
    name: "Jacqueline Rwanyindo",
    bio: "Software Engineer depuis cinq ans, Jacqueline a été plongée dans les pratiques _craft_ depuis sa première mission. Férue de partage, elle est active au sein de communautés tech ([Chtitedev](https://www.linkedin.com/company/chtitedev/), [Software Craft Lille](https://www.linkedin.com/company/software-craft-lille)).",
    company: "Ippon Technologies",
    jobTitle: null,
    photoUrl: "/avatars/jacqueline-rwanyindo.webp",
    socials: [
      {
        id: "github",
        name: "GitHub",
        link: "Ja-R",
      },
      {
        id: "twitter",
        name: "Twitter",
        link: "jacqueline_rwa",
      },
    ],
  },
  {
    id: "t865IUEyepZ0XVkqieoX",
    name: "Julien Creach",
    bio: "Tech lead - futur maitre Jedi du C#\n\nIngénieur en informatique industrielle et système embarqué de formation et en apprentissage dans la défense. Chez Apside depuis 2019 et Tech Lead, fervent défenseur du C# (en formation pour être maitre Jedi), et de la conteneurisation. J'ai à cœur de transmettre ce que j'ai pu apprendre afin d'en faire profiter un maximum mes collègues. Partisan du « c'est pas faux ! » plutôt que transmettre une fausse information. Et pour finir le principal le thé c’est la vie :D\n",
    company: "Apside",
    jobTitle: null,
    photoUrl: "/avatars/julien-creach.webp",
    socials: [
      {
        id: "github",
        name: "GitHub",
        link: "jcreach",
      },
    ],
  },
  {
    id: "xRyLYb1SFLXlVqrPGcoW",
    name: "Julien Libert",
    bio: "Développeur Web depuis plus de 15 ans, j’aime coder, gérer des équipes et faire en sorte de garder une bonne cohérence dans mon code et une architecture de projet élaborée. \nJe passe la majorité de mon quotidien à jongler entre du Laravel, du VueJS, mais aussi de bons gros morceaux de code legacy (PHP, jQuery…). \n\nAprès une formation en informatique générale, c’est toujours le web et ses technos qui m’ont attirées. La véritable révélation s'est faite avec l’arrivée des frameworks (CSS, PHP, JS) qui ont commencé à structurer et donner des lignes directrices pour des projets plus ou moins complexes. Malgré les reproches qu’on peut parfois leur faire, ils permettent aux équipes de développement d’accélérer la production, d’éviter la redite de tâches laborieuses et ainsi se concentrer sur du code à forte valeur ajoutée pour les utilisateurs.\n\nActuellement Lead développeur chez Evoliz, j'ai dû aborder un framework dans un autre domaine : l’agilité dans la réalisation de projets, avec SCRUM. Notre philosophie : on essaie, on échoue, on améliore, on réussit, on améliore encore… Après 6 ans à leurs côtés, je me dis qu’on a tenté pas mal de choses, réussi sur certaines, échoué sur d’autres, et surtout acquis une modeste expérience sur divers sujets. C’est donc tout naturellement que me vient l’envie de partager tout cela avec d’autres",
    company: "Evoliz",
    jobTitle: null,
    photoUrl: "/avatars/julien-libert.webp",
    socials: [],
  },
  {
    id: "y2fW622rJpohDpDPkMQb",
    name: "Alexis Stefanski (Alex Stef)",
    bio: "Tech lead at CircularX, and developer for 8 years, I've worked mainly in start-ups on SaaS projects wishing to expose an API to their customers.\n\n\nPassionate about photography, video and humor, it's above all people and interaction that motivate me.",
    company: "CircularX",
    jobTitle: null,
    photoUrl: "/avatars/alexis-stefanski-alex-stef.webp",
    socials: [
      {
        id: "github",
        name: "GitHub",
        link: "AlexStef",
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
