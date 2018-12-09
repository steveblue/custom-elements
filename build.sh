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

cp node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js dist/lib/custom-elements-es5-adapter.js
cp src/index.html dist/index.html
cp src/style/main.css dist/style/main.css

if [[ $1 == '--prod' ]]; then
node_modules/.bin/rollup -c rollup.prod.js
else
node_modules/.bin/rollup -c rollup.config.js
fi