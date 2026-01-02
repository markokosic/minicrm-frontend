
/** @type {import("@ianvs/prettier-plugin-sort-imports").PrettierConfig} */
const config = {
  printWidth: 100,
  singleQuote: true,
  trailingComma: 'es5',
  singleAttributePerLine: true,
  plugins: ['@ianvs/prettier-plugin-sort-imports'],
  importOrder: [
    '.*styles.css$',
    '',
    'dayjs',
    '^react$',
    '^next$',
    '^next/.*$',
    '<BUILTIN_MODULES>',
    '<THIRD_PARTY_MODULES>',
    '^@mantine/(.*)$',
    '^@mantinex/(.*)$',
    '^@mantine-tests/(.*)$',
    '^@docs/(.*)$',
    '^@/.*$',
    '^../(?!.*.css$).*$',
    '^./(?!.*.css$).*$',
    '\\.css$',
  ],
  overrides: [
    {
      files: '*.mdx',
      options: {
        printWidth: 70,
      },
    },
  ],
};

export default config;

// {
//   "printWidth": 120,
//   "useTabs": false,
//   "tabWidth": 2,
//   "trailingComma": "es5",
//   "semi": true,
//   "singleQuote": true,
//   "bracketSpacing": true,
//   "arrowParens": "always",
//   "jsxSingleQuote": false,
//   "bracketSameLine": false,
//   "endOfLine": "lf",
//   "singleAttributePerLine": true
// }
