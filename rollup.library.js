import typescript from 'rollup-plugin-typescript';
import resolve from 'rollup-plugin-node-resolve';
import cleanup from 'rollup-plugin-cleanup';
import { terser } from 'rollup-plugin-terser';

const clean = {
    comments: ['none'],
    extensions: ['ts', 'js']
};

export default [{
    input: 'src/index.ts',
    plugins: [
        resolve(),
        typescript(),
        cleanup(clean)
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
        cleanup(clean),
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
        typescript(),
        cleanup(clean)
    ],
    onwarn: ( warning, next ) => {
        if ( warning.code === 'THIS_IS_UNDEFINED' ) return;
        next( warning );
    },
    output: {
        file: 'packages/@webx/core/bundles/core.js',
        format: 'cjs',
        sourcemap: false
    }
},
{
    input: 'src/index.ts',
    plugins: [
        resolve(),
        typescript(),
        cleanup(clean),
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