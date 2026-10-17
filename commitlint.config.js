export default {
  extends: ["@commitlint/config-conventional"],
  ignores: [
    (message) => {
      const [subject, ...body] = message.split("\n");
      const commits = body.filter((line) => line.trim() !== "");
      return (
        /\(#\d+\)$/.test(subject) &&
        commits.length > 0 &&
        commits.every((line) =>
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
