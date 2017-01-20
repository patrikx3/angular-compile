const builder = require('corifeus-builder');
module.exports = (grunt) => {

    //node_modules\.bin\webdriver-manager update

    const loader = new builder.Loader(grunt);
    loader.angular2(builder.config.folder.test.angular2Webpack.root);

    grunt.registerTask('run', builder.config.task.run.angular2);

    grunt.registerTask('default',  builder.config.task.build.angular2);

    grunt.registerTask('cori-test', (target) => {
        switch(target) {
            case 'protractor-run':
                grunt.task.run(builder.config.task.build.angular2.concat([
                    'connect:cori-angular2',
                    'protractor:cori-angular2-chrome',

                ]));
                break;
        }
    });


}