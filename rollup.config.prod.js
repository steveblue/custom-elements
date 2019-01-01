import typescript from 'rollup-plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import resolve from 'rollup-plugin-node-resolve';
import minifyHTML from 'rollup-plugin-minify-html-literals';
import inlineCSS from './rollup.cssnano-plugin';

export default [
    {
        input: 'src/polyfill.ts',
        plugins: [
            resolve(),
            typescript(),
            terser()
        ],
        onwarn: ( warning, next ) => {
            if ( warning.code === 'THIS_IS_UNDEFINED' ) return;
            next( warning );
        },
        output: {
            name: 'window',
            file: 'dist/polyfill.js',
            format: 'iife',
            sourcemap: true,
            extend: true
        }
    },
    {
        input: 'src/vendor.ts',
        plugins: [
            resolve(),
            typescript(),
            terser()
        ],
        onwarn: ( warning, next ) => {
            if ( warning.code === 'THIS_IS_UNDEFINED' ) return;
            next( warning );
        },
        output: {
            name: 'window',
            file: 'dist/vendor.js',
            format: 'iife',
            sourcemap: true,
            extend: true
        }
    },
    {
        input: 'src/main.ts',
        plugins: [
            resolve(),
            minifyHTML(),
            inlineCSS(),
            typescript(),
            terser()
        ],
        onwarn: ( warning, next ) => {
            if ( warning.code === 'THIS_IS_UNDEFINED' ) return;
            next( warning );
        },
        output: {
            name: 'app',
            file: 'dist/main.js',
            format: 'iife',
            sourcemap: true
        }
    }];