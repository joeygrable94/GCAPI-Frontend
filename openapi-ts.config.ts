import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  base: 'http://localhost:8888',
  client: '@hey-api/client-fetch',
  input: 'http://localhost:3333/api/docs/openapi.json',
  output: {
    format: 'prettier',
    lint: 'eslint',
    path: './src/shared/api-client'
  },
  types: {
    enums: 'javascript'
  }
});
