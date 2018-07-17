module.exports = {
  parser: "babel-eslint",
  extends: [
    "eslint:recommended",
    "standard",
    "prettier",
    "prettier/flowtype",
    "prettier/standard"
  ],
  plugins: ["flowtype"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    "no-console": "warn",
    "no-multi-spaces": "off",
    "comma-dangle": "off",
    "flowtype/define-flow-type": 1,
    "flowtype/use-flow-type": 1,
    "node/no-deprecated-api": [
      "error",
      {
        // To ignore these errors, we need to omit support Node.js < 9.9.x
        ignoreModuleItems: [
          "assert.deepEqual",
          "assert.equal",
          "assert.notDeepEqual",
          "assert.notEqual"
        ]
      }
    ]
  }
};
