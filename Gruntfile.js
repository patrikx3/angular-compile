const builder = require('corifeus-builder');
module.exports = (grunt) => {

    //node_modules\.bin\webdriver-manager update

    const loader = new builder.Loader(grunt);
    loader.angular2(builder.config.folder.test.angular2Webpack.root);

    grunt.registerTask('run', builder.config.task.run.angular2);

    grunt.registerTask('default',  builder.config.task.build.angular2);

    grunt.config.merge({
        watch: {

        }
    })

    grunt.registerTask('test', (target) => {
        switch(target) {
            case 'protractor':
                grunt.task.run([
                    'connect:cori-angular2',
                    'protractor:cori-angular2-chrome',

                ]);
                break;

            case 'karma':
                grunt.task.run([
                    'karma:cori-angular2-run',
                    'watch:cori-angular2-karma'
                ]);
                break;
        }
    });


}