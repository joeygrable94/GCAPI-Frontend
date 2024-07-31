import eslint from '@eslint/js';
import gcSolidJsLinter from '@getcommunity/config-eslint/solid';
import { resolve } from 'path';
import process from 'process';
import tseslint from 'typescript-eslint';

const tsProject = resolve(process.cwd(), 'tsconfig.json');

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...gcSolidJsLinter,
  {
    languageOptions: {
      parserOptions: {
        parser: '@typescript-eslint/parser',
        project: tsProject,
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  }
);
