export default {
  extends: ["@commitlint/config-conventional"],
  ignores: [
    (message) => {
      const [subject, ...body] = message.split("\n");
      // Un squash-merge GitHub ajoute aussi des trailers (`Co-authored-by: …`),
      // un séparateur `---------`, et parfois un sous-commit `* Initial plan`
      // généré automatiquement par l'agent Copilot : on ne les compte pas
      // comme de vrais sous-commits à valider.
      const noiseBullet = /^\* Initial plan$/i;
      const subCommits = body
        .filter((line) => line.trim().startsWith("* "))
        .filter((line) => !noiseBullet.test(line.trim()));
      return (
        /\(#\d+\)$/.test(subject) &&
        subCommits.length > 0 &&
        subCommits.every((line) =>
          /^\* (?:build|chore|ci|docs|feat|fix|perf|refactor|revert|style|test|data): .+/.test(
            line,
          ),
        )
      );
    },
  ],
  rules: {
    "type-enum": [
      2,
      "always",
      // On utilise la liste de config-conventional et on ajoute 'data'
      [
        "build",
        "chore",
        "ci",
        "docs",
        "feat",
        "fix",
        "perf",
        "refactor",
        "revert",
        "style",
        "test",
        "data",
      ],
    ],
  },
};
