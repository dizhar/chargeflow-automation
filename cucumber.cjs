module.exports = {
  default: {
    import: ["src/steps/**/*.ts", "src/support/**/*.ts"],
    format: [
      "progress",
      "html:reports/cucumber-report.html",
      "json:reports/cucumber-report.json",
    ],
    paths: ["src/features/**/*.feature"],
    publishQuiet: true,
    retry: 1,
  },
};
