node_modules/.bin/rollup -c rollup.library.js
node_modules/.bin/terser --compress --mangle --output dist/webx.min.js -- dist/webx.js