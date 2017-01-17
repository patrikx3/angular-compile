const builder = require('corifeus-core-builder');
module.exports = (grunt) => {

    const loader = new builder.Loader(grunt);
    loader.angular2(builder.config.folder.test.angular2.root);

    grunt.registerTask('run', builder.config.task.continuous.angular2);
    grunt.registerTask('default',  builder.config.task.build.angular2.concat(['karma:angular2']));
    grunt.registerTask('test', 'karma:angular2Run');
}