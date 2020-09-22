var OFF = 0, WARN = 1, ERROR = 2;

module.exports = exports = {
    "env": {
        "es6": true,
        browser: true,
        node: true,
    },

    "ecmaFeatures": {
        // env=es6 doesn't include modules, which we are using
        "modules": true
    },

    "extends": ['airbnb-base'],

    "rules": {
        'arrow-body-style': [ERROR, 'as-needed'],
        'class-methods-use-this': OFF,
        'comma-dangle': [ERROR, 'always-multiline'],
        'import/imports-first': OFF,
        'import/newline-after-import': OFF,
        'import/no-dynamic-require': OFF,
        'import/no-extraneous-dependencies': OFF,
        'import/no-named-as-default': OFF,
        'import/no-unresolved': OFF,
        'import/no-webpack-loader-syntax': OFF,
        'import/prefer-default-export': OFF,
        "object-curly-spacing": [ERROR, "always"],
        "keyword-spacing": [ERROR, {
          "overrides": {
            "if": { "before": true, "after": true },
            "for": { "before": true, "after": true },
            "while": { "before": true, "after": true }
          }
        }],
        "spaced-comment": [ERROR, "always", {
          "line": {
            "markers": ["/"],
            "exceptions": ["-", "+"]
          },
          "block": {
            "markers": ["!"],
            "exceptions": ["*"],
            "balanced": true
          }
        }],
        "semi": [ERROR, "always", { "omitLastInOneLineBlock": true}],
        indent: [
          ERROR,
          ERROR,
          {
            SwitchCase: WARN,
          },
        ],
        'max-len': OFF,
        'newline-per-chained-call': OFF,
        'no-confusing-arrow': OFF,
        'no-console': WARN,
        'no-use-before-define': OFF,
        'prefer-template': ERROR,
        'no-proto': 0,
    }
};