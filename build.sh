#!/bin/bash

cp src/index.html dist/index.html
cp src/style/main.css dist/style/main.css

# parcel src/index.html
# node_modules/.bin/tsc -p tsconfig.json

node_modules/.bin/rollup -c rollup.config.js