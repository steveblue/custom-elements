#!/bin/bash

if [[ ! -e dist ]]; then
    mkdir dist
fi

if [[ ! -e dist/style ]]; then
    mkdir dist/style
fi

if [[ ! -e dist/lib ]]; then
    mkdir dist/lib
fi

# if [[ ! -e dist/lib/@webcomponents/webcomponentsjs ]]; then
#     mkdir -p dist/lib/@webcomponents/webcomponentsjs
# fi

# if [[ ! -e dist/lib/@webcomponents/custom-elements ]]; then
#     mkdir -p dist/lib/@webcomponents/custom-elements
# fi

if [[ ! -e  dist/lib/@ungap/custom-elements-builtin ]]; then
    mkdir -p dist/lib/@ungap/custom-elements-builtin
fi

cp node_modules/@ungap/custom-elements-builtin/min.js dist/lib/@ungap/custom-elements-builtin/min.js
# cp node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle.js dist/lib/@webcomponents/webcomponentsjs/webcomponents-bundle.js
# cp node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle.js.map dist/lib/@webcomponents/webcomponentsjs/webcomponents-bundle.js.map
# cp node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js dist/lib/@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js
# cp node_modules/@webcomponents/custom-elements/src/native-shim.js dist/lib/@webcomponents/custom-elements/native-shim.js
# cp node_modules/@webcomponents/custom-elements/custom-elements.min.js dist/lib/@webcomponents/custom-elements/custom-elements.min.js
# cp node_modules/@webcomponents/custom-elements/custom-elements.min.js.map dist/lib/@webcomponents/custom-elements/custom-elements.min.js.map
cp src/index.html dist/index.html
cp src/style/main.css dist/style/main.css

node_modules/.bin/rollup -c rollup.config.js
if [[ $1 == '--prod' ]]; then
# node_modules/.bin/terser --compress --mangle --output dist/main.js -- dist/bundle.js
java -jar node_modules/google-closure-compiler-java/compiler.jar --flagfile closure.conf --js_output_file dist/main.js
fi