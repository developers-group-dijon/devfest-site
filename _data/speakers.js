/**
 * Inspiré des données JSON de OpenPlanner.fr
 * Chemin : speakers
 * Modifications :
 * - Télécharger et faire une version optimisée des photos
 * - Ajuster les bio (Markdown possible)
 * - Compléter jobTitle
 *
 * Cette donnée sera parsée/complétée pour avoir une donnée "speakers"
 */

/**
 * @type {import('./types').Speaker[]}
 */
const speakers = [
  {
    id: "aurelie-vache",
    name: "Aurélie Vache",
    jobTitle: null,
    bio: 'Aurélie est DevRel chez OVHcloud. Elle est GDE (Google Developer Expert) pour les technologies Cloud, Docker Captain, CNCF Ambassador, GitPod Hero & Women Techmakers Ambassador). Elle travaille en tant que Développeur et Ops depuis plus de 17 ans. Elle a construit, déployée et exploitée de nombreuses applications dans différentes architectures et environnements. Elle est une passionnée de Cloud et prône les bonnes pratiques DevOps/Cloud/Golang.\n\nElle est organisatrice de conférences et de meetups depuis 2016. Elle est également rédactrice technique (dev.to/aurelievache), sketchnoter et speaker.\n\nElle adore faire du mentoring et aider les autres.\n\nElle a créé une nouvelle façon visuelle pour les gens d\'apprendre et de comprendre les technologies Cloud : "Understanding Kubernetes/Istio/Docker in a visual way" dans des sketchnotes, livres et des vidéos illustrés.',
    company: "OVHcloud",
    companyLogoUrl: null,
    photoUrl:
      "https://lh5.googleusercontent.com/-Jx8n2dYA8Ss/AAAAAAAAAAI/AAAAAAAAYLA/oDqXfvM9CfY/photo.jpg",
    socials: [
      {
        id: "twitter",
        name: "Twitter",
        link: "@aurelievache",
      },
      {
        id: "github",
        link: "scraly",
        name: "GitHub",
      },
    ],
  },
  {
    id: "aurelien-coget",
    name: "Aurelien Coget",
    jobTitle: null,
    bio: "https://www.linkedin.com/in/aurelien-coget/",
    company: "R2Devops",
    companyLogoUrl: null,
    photoUrl:
      "https://pbs.twimg.com/profile_images/1515336693641003013/DwikKth9_400x400.jpg",
    socials: [],
  },
  {
    id: "bertrand-keller",
    name: "Bertrand Keller",
    jobTitle: null,
    bio: null,
    company: null,
    companyLogoUrl: null,
    photoUrl: "https://avatars2.githubusercontent.com/u/1500301?v=4",
    socials: [],
  },
  {
    id: "christophe-breheretgirardin",
    name: "Christophe Breheret-Girardin",
    jobTitle: null,
    bio: "Coach craft, formateur, auteur et conférencier, Christophe partage avec enthousiasme ses connaissances, afin d’inspirer et de guider chacun vers son plein potentiel",
    company: "Octo Technology",
    companyLogoUrl: null,
    photoUrl:
      "https://sessionize.com/image/c09f-400o400o2-sLCpqttppyCsKCTSiMcBfy.jpg",
    socials: [
      {
        name: "Twitter",
        id: "twitter",
        link: "@ChristopheB_G",
      },
    ],
  },
  {
    id: "elaine-dias-batista",
    name: "Elaine Dias Batista",
    jobTitle: null,
    bio: "Elaine has been working with mobile apps development for the past 6 years. Since the launch of the Google Assistant, she has been following the developments around that area. She truly believes that interacting with technology using natural language will define the future of computing. Born and raised in Brazil, she's been living in France since 2004 and loves everything multicultural. She's a GDE for the Google Assistant.",
    company: "SFEIR",
    companyLogoUrl: null,
    photoUrl:
      "https://lh6.googleusercontent.com/-qVmPBdEhaxE/AAAAAAAAAAI/AAAAAAAAAKM/_L59FcAo-S4/photo.jpg",
    socials: [
      {
        link: "@elainedbatista",
        id: "twitter",
        name: "Twitter",
      },
      {
        link: "elainedb",
        id: "github",
        name: "GitHub",
      },
    ],
  },
  {
    id: "gaetan-eleouet",
    name: "gaetan eleouet",
    jobTitle: null,
    bio: "Dans mes jeunes années être geek n’était pas un métier et pourtant je suis audayd’hui développeur depuis 15 ans. \nAnimé par des convictions fortes sur l’impact des développeurs sur le monde, je transmets et j’enseigne dans le cadre d’atelier de code et en vacation en école d’ingénieur. \nAu-delà de mon métier, c’est aussi une passion : je code pour le plaisir dans des projets personnels et lors de compétition de programmation.",
    company: "Meritis",
    companyLogoUrl: null,
    photoUrl: "https://blog.egaetan.me/extern/photo.png",
    socials: [
      {
        id: "twitter",
        link: "@egaetan",
        name: "Twitter",
      },
      {
        id: "github",
        name: "GitHub",
        link: "@geleouet",
      },
    ],
  },
  {
    id: "guillaume-poittevin",
    name: "Guillaume Poittevin",
    jobTitle: null,
    bio: "Senior Solutions Architect chez Capgemini\n\nAvec plus de 15 ans d'experience, je suis spécialisé dans les solutions de gestion de contenu (CMS) et le e-Commerce.\n\nTechnos : PHP, Javascript, NodeJS, React, NextJS, Symfony, Docker, CI/CD, Jenkins, Gitlab, Gerrit, DevOps, Puppet, Ansible, Python, Pentaho Data Integration, Talend, Salesforce Commerce Cloud, Magento, Drupal, PostgreSQL, MongoDB, MySQL, Elasticsearch, Nexus3, ...",
    company: "Capgemini",
    companyLogoUrl: null,
    photoUrl:
      "https://lh3.googleusercontent.com/a/AAcHTtew_PUMfeeUNMEnSbtoGZqadvp3uR1eAR2q8IKFRA=s96-c",
    socials: [
      {
        link: "TheGuit",
        name: "Twitter",
        id: "twitter",
      },
      {
        link: "TheGuit",
        id: "github",
        name: "GitHub",
      },
    ],
  },
  {
    id: "henry-francois",
    name: "HENRY Francois",
    jobTitle: null,
    bio: null,
    company: "Talan",
    companyLogoUrl: null,
    photoUrl: "https://avatars.githubusercontent.com/u/15220667?v=4",
    socials: [
      {
        id: "github",
        name: "GitHub",
        link: "budhimself",
      },
    ],
  },
  {
    id: "julien-topcu",
    name: "Julien Topçu",
    jobTitle: null,
    bio: "Tech Coach chez Shodo, j'accompagne le développement de logiciels à forte valeur métier en usant de techniques issues du Domain-Driven Design, le tout propulsé en Xtreme Programming dans la philosophie Kanban #NoEstimates. Membre de la fondation OWASP, je sensibilise sur les techniques de sécurité applicative afin d'éviter de se faire hacker bien comme il faut.",
    company: "Shodo",
    companyLogoUrl: null,
    photoUrl:
      "https://fr.gravatar.com/userimage/123188453/975870a140996b955ead02165d002e51.png?size=500",
    socials: [
      {
        link: "@JulienTopcu",
        id: "twitter",
        name: "Twitter",
      },
      {
        link: "julien-topcu",
        id: "github",
        name: "GitHub",
      },
    ],
  },
  {
    id: "marine-du-mesnil",
    name: "Marine du Mesnil",
    jobTitle: null,
    bio: "Head of Cybersecurity Tribe @Theodo, Marine du Mesnil s’intéresse tout particulièrement à la sécurité informatique et s’implique au sein de la guilde Sécurité de Theodo pour aider les développeurs à créer des produits conformes en les formant et en intervenant dans les différents projets. \n\nElle suit particulièrement les publications de l’OWASP et s’intéresse tout particulièrement au contrôle d’accès, devenu la cause principale de faille sur les sites internets et placé au Top 1 du nouveau Top 10 de l’OWASP.",
    company: "Theodo",
    companyLogoUrl: null,
    photoUrl:
      "https://blog.theodo.com/static/06a2df4ebd046800bc37854198768b56/marinemb.png",
    socials: [
      {
        name: "Twitter",
        link: "marine_mesnil",
        id: "twitter",
      },
      {
        name: "GitHub",
        id: "github",
        link: "marine-mb",
      },
    ],
  },
  {
    id: "matthieu-vincent",
    name: "Matthieu Vincent",
    jobTitle: null,
    bio: "* TechAdvocate @ Sopra Steria \n* Internal Developer Platform leader @ Sopra Steria\n* Co-Founder of Volcamp IT Conference @ Clermont-Fd (https://volcamp.io)\n* Speaker @ Devoxx, Snowcamp, Breizhcamp, ...\n* GitLab Hero\n* R2devops Ambassador\n* Owner of svn2git tool (https://github.com/yodamad/svn2git) & gitlab-emoji (https://github.com/yodamad/gitlab-emoji)",
    company: "Sopra Steria",
    companyLogoUrl: null,
    photoUrl:
      "https://pbs.twimg.com/profile_images/1557123789510565888/KZWPgWHI_400x400.jpg",
    socials: [
      {
        name: "Twitter",
        link: "yodamad03",
        id: "twitter",
      },
      {
        name: "GitHub",
        id: "github",
        link: "yodamad",
      },
    ],
  },
  {
    id: "sylvain-coudert",
    name: "Sylvain Coudert",
    jobTitle: null,
    bio: "Dev .NET depuis 2008, Freelance depuis 2018, Crafter devant l'éternel et debugger de l'infini!\nJ'aime apprendre, transmettre et découvrir.\nChanteur rockeur circassien intermittent et papa à temps plein, j'aime également prendre le temps de regarder le vent agiter les feuilles d'un arbre.",
    company: "Freelance",
    companyLogoUrl: null,
    photoUrl:
      "https://lh3.googleusercontent.com/-ZtVSNeAJBDA/AAAAAAAAAAI/AAAAAAAAAAA/AKxrwcZp3iWQkGBz1RSRQToqhYmNnVaGdQ/mo/photo.jpg",
    socials: [
      {
        id: "twitter",
        link: "https://twitter.com/sylv_coud",
        name: "Twitter",
      },
    ],
  },
  {
    id: "thomas-jouve",
    name: "Thomas Jouve",
    jobTitle: null,
    bio: "Développeur depuis ... longtemps, un peu touche à tout de l'infra à l'algorithmie. J'adore bricoler, démonter, réparer des trucs ce qui me prends beaucoup de temps mais qui me permet aussi de découvrir beaucoup de choses ;-)\n\nComme l'informatique est une passion pour moi, j'aime beaucoup partager  ce que j'ai appris.\n\n\nhttps://www.linkedin.com/in/thomas-jouve-723ba394",
    company: "Sopra Steria",
    companyLogoUrl: null,
    photoUrl:
      "https://lh3.googleusercontent.com/a-/AOh14Gi4g0J64DKPucH3aD7O_aXXvPp9ukX0jwynq775Lg",
    socials: [
      {
        link: "@farunty",
        id: "twitter",
        name: "Twitter",
      },
      {
        id: "github",
        name: "GitHub",
        link: "tJouve",
      },
    ],
  },
  {
    id: "william-petit",
    name: "William Petit",
    jobTitle: null,
    bio: "Après un rapide passage dans le monde du game design je suis revenu dans le domaine du développement informatique et de l'administration système par le biais du monde en éternelle mutation qu'est le Web, encore audayd'hui mon principal terrain de jeu.\n\nAu cours de ma carrière, j'ai effectué des missions diverses, pour des acteurs publics ou privés. Entre autres:\n\n- Conception, développement et maintenance de projets numériques multi-plateformes;\n- Intégration et maintenance sur des systèmes GNU/Linux;\n- Audits de sécurité d'applicatifs web;\n- Animation de formations professionnelles ou initiales...\n\nMon sujet de prédilection est audayd'hui le développement à la frontière entre le web et le système, et plus précisément sur des appareils autonomes diffusant des services numériques sur des réseaux locaux, autonomes ou non vis à vis d'Internet.",
    company: "SCOP Cadoles",
    companyLogoUrl: null,
    photoUrl:
      "https://media.licdn.com/dms/image/C5603AQHIFctsdqGubA/profile-displayphoto-shrink_800_800/0/1611048649927?e=1700697600&v=beta&t=IU67M83UfNNwU8yZ3-MlaWVZA9xanHyNxvQVj4v8TFY",
    socials: [
      {
        link: "bornholm",
        name: "GitHub",
        id: "github",
      },
    ],
  },
  {
    id: "yann-schepens",
    name: "Yann Schepens",
    jobTitle: null,
    bio: "Originellement développeur PHP, je suis devenu avec le temps expert technique, Architecte, Évangéliste, Coach technique ; en résumé : Tech Lead.\n\nMes domaines de prédilection ?\n\n* La POO\n* L'automatisation\n* La qualité\n* Le process DevOps\n* Le coaching technique\n* Le PHP\n* Le Numérique responsable\n\nPour faire plus long\n==============\n\nOnePoint - le perfectionnement\n---------------------------------------------\nTech Lead chez OnePoint depuis juillet 2019, je continue à développer mes compétences dans ce type de poste, en étendant mes connaissances dans des technos et domaines autres que l’écosystème PHP  et ayant une vision de plus haut niveau dans le SI.\n\nOAB - la montée en compétence\n------------------------------------------------\nPendant 5 ans tout de même, en parallèle des différents projets clients, j'ai veillé à la montée en compétences de notre équipe (normalisation des pratiques, qualité du code, mise en place d'outils de contrôle dont l'intégration continue), en gardant pour objectif de fournir un produit correspondant au besoin et la demande client, tout en respectant les bonnes pratiques.\n\nCe poste m'a permis de développer et approfondir de nombreuses compétences, de l'agilité à la mouvance DevOps tout en révisant mes classiques (conception SOLID, PHP, Symfony, et autres).\n\nAvant\n---------\n\nBen deux-trois jobs qui m'ont permis d'apprendre à aimer le dev, mais pour plus de détails, LinkedIn est fait pour ça ;)",
    company: "OnePoint ",
    companyLogoUrl: null,
    photoUrl:
      "https://fr.gravatar.com/userimage/53109171/d8a0f916632451e7768cc6cac1875089.png?size=200",
    socials: [
      {
        link: "YannSchepens",
        name: "Twitter",
        id: "twitter",
      },
      {
        id: "github",
        link: "yannschepens",
        name: "GitHub",
      },
    ],
  },
];

module.exports = speakers;
