module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: { node: "current" },
        useBuiltIns: "entry", // alternative mode: "entry"/ "usage"
      },
    ],
    "@babel/preset-typescript",
  ],
};
