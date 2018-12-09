import typescript from 'rollup-plugin-typescript';
import resolve from 'rollup-plugin-node-resolve';
// import { uglify } from 'rollup-plugin-uglify';

export default {
    input: 'src/main.ts',
    plugins: [
        resolve(),
        typescript()
    ],
    onwarn: ( warning, next ) => {
        if ( warning.code === 'THIS_IS_UNDEFINED' ) return;
        next( warning );
    },
    output: {
        file: 'dist/bundle.js',
        format: 'iife',
        sourcemap: true
    }
};