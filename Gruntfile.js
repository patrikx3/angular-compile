const builder = require('corifeus-core-builder');
module.exports = (grunt) => {

    const loader = new builder.Loader(grunt);
    loader.angular2(builder.config.folder.test.angular2.root);

    grunt.registerTask('run', builder.config.task.continuous.angular2);
    grunt.registerTask('default', 'karma', builder.config.task.build.angular2);
    grunt.registerTask('test', 'karma');
}