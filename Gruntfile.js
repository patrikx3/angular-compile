const builder = require('corifeus-builder');
module.exports = (grunt) => {

    //node_modules\.bin\webdriver-manager update

    const loader = new builder.Loader(grunt);
    loader.angular2(builder.config.folder.test.angular2Webpack.root);

    const copyReplace = grunt.config.get('cory-replace');
    copyReplace.header = {
        header: true,
        replace: `
[![Build Status](https://travis-ci.org/patrikx3/\${git.repo}.svg?branch=master)](https://travis-ci.org/patrikx3/\${git.repo})
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/patrikx3/\${git.repo}/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/patrikx3/\${git.repo}/?branch=master)
[![Code Coverage](https://scrutinizer-ci.com/g/patrikx3/\${git.repo}/badges/coverage.png?b=master)](https://scrutinizer-ci.com/g/patrikx3/\${git.repo}/?branch=master)  [![Trello](https://img.shields.io/badge/Trello-p3x-026aa7.svg)](https://trello.com/b/gqKHzZGy/p3x)

[![NPM](https://nodei.co/npm/\${pkg.name}.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/\${pkg.name}/)
`,
        files: [
            '*.md'
        ]
    };
    grunt.config.set('cory-replace', copyReplace );

    grunt.registerTask('run', builder.config.task.run.angular2);

    grunt.registerTask('default',  builder.config.task.build.angular2);

   //cori-test:angular2-protractor
   // cori-test:angular2-karma


}