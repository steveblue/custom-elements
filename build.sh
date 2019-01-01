#!/bin/bash

if [[ ! -e dist ]]; then
    mkdir dist
fi

if [[ ! -e dist/style ]]; then
    mkdir dist/style
fi

cp src/index.html dist/index.html

node_modules/.bin/postcss src/style/main.css --output dist/style/main.css

if [[ $NODE_ENV == 'prod' ]]; then
    node_modules/.bin/rollup -c rollup.config.prod.js
else
    node_modules/.bin/rollup -c rollup.config.js
fi