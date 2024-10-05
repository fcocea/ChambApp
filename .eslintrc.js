const stylistic = require("@stylistic/eslint-plugin");

const customized = stylistic.configs.customize({
  braceStyle: "1tbs",
  commaDangle: "never",
  quotes: "double",
  semi: true
});

module.exports = {
  env: {
    browser: true,
    node: true
  },
  extends: ["eslint:recommended", "expo"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: ["@stylistic", "simple-import-sort"],
  rules: {
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "arrow-body-style": ["warn", "as-needed"],
    "curly": "warn",
    "dot-notation": "warn",
    "eqeqeq": "error",
    "no-else-return": "warn",
    "no-eval": "error",
    "no-implied-eval": "error",
    "no-multi-assign": "warn",
    "no-unused-vars": "warn",
    "no-var": "warn",
    "prefer-arrow-callback": "warn",
    "prefer-const": "warn",
    "yoda": "warn",
    ...customized.rules,
    "@stylistic/arrow-parens": [
      "warn",
      "as-needed",
      { requireForBlockBody: false }
    ],
    "@stylistic/function-call-spacing": "warn",
    "@stylistic/jsx-pascal-case": "warn",
    "@stylistic/no-multi-spaces": ["warn", { ignoreEOLComments: true }],
    "@stylistic/semi-style": "warn"
  },
  overrides: [
    {
      files: ["*.js", "*.jsx", "*.ts", "*.tsx"],
      rules: {
        "simple-import-sort/imports": [
          "error",
          {
            groups: [
              ["^react", "^next", "^@?\\w"],
              ["^(@)(/.*|$)"],
              ["^\\u0000"],
              ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
              ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
              ["^.+\\.?(css)$"]
            ]
          }
        ]
      }
    }
  ]
};
