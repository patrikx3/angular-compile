const builder = require('corifeus-core-builder');
module.exports = (grunt) => {

    const loader = new builder.Loader(grunt);
    loader.angular2(builder.config.folder.test.angular2.root);

    grunt.registerTask('default', builder.config.task.continuous.angular2);
}