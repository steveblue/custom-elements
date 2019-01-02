import typescript from 'rollup-plugin-typescript';
import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

export default [{
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
        file: 'packages/@webx/core/fesm2015/core.js',
        format: 'esm',
        sourcemap: false
    }
},
{
    input: 'src/index.ts',
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
        file: 'packages/@webx/core/fesm2015/core.min.js',
        format: 'esm',
        sourcemap: true
    }
},
{
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
        file: 'packages/@webx/core/bundles/core.js',
        format: 'cjs',
        sourcemap: true
    }
},
{
    input: 'src/index.ts',
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
        file: 'packages/@webx/core/bundles/core.min.js',
        format: 'cjs',
        sourcemap: true
    }
}];