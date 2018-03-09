module.exports = (grunt) => {

    grunt.option('cory-loader-off', true);

    //node node_modules/protractor/bin/webdriver-manager update
    const builder = require('corifeus-builder-angular');
/*
 webdriver-manager/selenium/update-config.json
 node_modules/protractor/bin/webdriver-manager update

 */
    const loader = new builder.loader(grunt);
    loader.angular({
        root: builder.config.folder.test.angularWebpack.root,
        replacer: {
            type: 'p3x',
            npmio: true,
        },
        config: {
            clean: {
                'cory-publish': [
                    'dist'
                ]
            }
        }
    });

    grunt.registerTask('run', builder.config.task.run.angular);

    grunt.registerTask('default',  builder.config.task.build.angularAot);

    grunt.registerTask('aot', builder.config.task.build.angularAot);

    grunt.registerTask('aot-jit', builder.config.task.build.angularAotJit);

    grunt.registerTask('aot-test', ['webpack:cory-build-aot', 'cory-test-connect']);

    grunt.registerTask('coverage', 'karma:cory-angular');

    grunt.registerTask('publish', ['cory-replace', 'cory-npm', 'cory-publish-angular']);

   //cori-test:angular-protractor
   // cori-test:angular-karma


}