/**
 * @type {import('./types').Member[]}
 */
const team = [
  {
    id: "john-doe",
    name: "John Doe",
    jobTitle: "My job",
    bio: "…",
    company: "Google",
    companyLogoUrl: null,
    photoUrl: null, // "/team/foo.jpg",
    socials: [
      {
        id: "github",
        link: "john-doe",
        name: "GitHub",
      },
    ],
  },
];

module.exports = team;
