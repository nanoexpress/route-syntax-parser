import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import { dependencies } from './package.json';

const external = Object.keys(dependencies);

export default {
  input: `./src/analyze.ts`,
  output: [
    {
      format: 'esm',
      file: `./esm/analyze.js`,
      strict: true,
      sourcemap: true,
      exports: 'auto'
    }
  ],
  plugins: [
    resolve({ extensions: ['.ts', '.d.ts'] }),
    typescript({
      rollupCommonJSResolveHack: false,
      clean: true,
      tsconfigOverride: {
        include: ['src'],
        exclude: ['examples', 'utils'],
        compilerOptions: { rootDir: 'src' }
      },
      useTsconfigDeclarationDir: true
    })
  ],
  external
};
