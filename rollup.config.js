import typescript from 'rollup-plugin-typescript';
import resolve from 'rollup-plugin-node-resolve';
import minifyHTML from 'rollup-plugin-minify-html-literals';
import inlineCSS from './rollup.cssnano-plugin';

export default {
    input: 'src/main.ts',
    plugins: [
        resolve(),
        minifyHTML(),
        inlineCSS(),
        typescript()
    ],
    onwarn: ( warning, next ) => {
        if ( warning.code === 'THIS_IS_UNDEFINED' ) return;
        next( warning );
    },
    output: {
        file: process.env.NODE_ENV === 'prod' ? 'dist/bundle.js' : 'dist/main.js',
        format: 'esm',
        sourcemap: true
    }
};