import typescript from 'rollup-plugin-typescript';
import resolve from 'rollup-plugin-node-resolve';

export default {
    input: 'src/index.ts',
    plugins: [
        resolve(),
        typescript()
    ],
    onwarn: ( warning, next ) => {
        if ( warning.code === 'THIS_IS_UNDEFINED' ) return;
        next( warning );
    },
    output: {
        file: 'dist/webx.js',
        format: 'esm',
        sourcemap: true
    }
};