const utils = require('corifeus-utils');
const path = require('path')
const fs = require('fs').promises

module.exports = (grunt) => {

    const builder = require(`corifeus-builder`);
    const loader = new builder.loader(grunt);
    loader.js({
        replacer: {
            type: 'p3x',
            npmio: true,
        },
    });


    grunt.registerTask('publish', async function () {
        const done = this.async();

        try {
            await builder.utils.spawn({
                grunt: grunt,
                gruntThis: this,
            }, {
                cmd: 'npm',
                args: [
                    'run',
                    'build-lib',
                ]
            });
            done()
        } catch (e) {
            done(e)
        }

    });


    const defaultTask = ['cory-raw-npm-angular'].concat(builder.config.task.build.js.concat(['cory-angular-hook-lib']))
    grunt.registerTask('default', defaultTask );


}
