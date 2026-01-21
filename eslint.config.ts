import { config } from '@slashnephy/eslint-config'

export default config(
  {},
  {
    files: ['entrypoints/*.ts'],
    rules: {
      'import-x/no-default-export': 'off',
    },
  },
)
