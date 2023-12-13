module.exports = {
  extends: ["stylelint-config-standard-scss"],
  plugins: ["stylelint-prettier", "stylelint-scss"],
  rules: {
    "at-rule-no-unknown": null,
    "scss/at-rule-no-unknown": true,
    "scss/at-mixin-pattern": null,
    "prettier/prettier": true,
    "no-invalid-position-at-import-rule": null,
    "selector-class-pattern": null,
    "no-descending-specificity": null,
  },
};
