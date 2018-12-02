const util = require('util');
const spawn = require('child_process').spawn;
const chokidar = require('chokidar');
const log = console.log.bind(console);

const watcher = chokidar.watch('src/**/*.*', {
    persistent: true
});

watcher
    .on('change', path => {
        log(`File ${path} has changed`);
        spawn('./build.sh', {stdio:'inherit'});
    });

spawn('./build.sh', {stdio:'inherit'});
spawn('live-server',  ['dist/'], {stdio:'inherit'});