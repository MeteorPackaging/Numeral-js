var fs = require('fs');

module.exports = function(grunt) {

    var minifiedFiles = {
            'min/numeral.min.js' : [
                'numeral.js'
            ],
            'min/languages.min.js': [
                'languages.js'
            ]
        };

    // all the lang files need to be added manually
    fs.readdirSync('./languages').forEach(function (path) {
        var file = path.slice(0, -3),
            destination = 'min/languages/' + file + '.min.js',
            src = ['languages/' + path];

        minifiedFiles[destination] = src;
    });

    grunt.initConfig({
        nodeunit : {
            all : ['tests/**/*.js']
        },
        uglify: {
            my_target: {
                files: minifiedFiles
            },
            options: {
                preserveComments: 'some'
            }
        },
        concat: {
            languages: {
                src: [
                    'languages/**/*.js'
                ],
                dest: 'languages.js'
            }
        },
        jshint: {
            all: [
                'Gruntfile.js',
                'numeral.js',
                'languages/**/*.js'
            ],
            options: {
                'node': true,
                'browser': true,
                'curly': true,
                'devel': false,
                'eqeqeq': true,
                'eqnull': true,
                'newcap': true,
                'noarg': true,
                'onevar': true,
                'undef': true,
                'sub': true,
                'strict': false,
                'quotmark': 'single'
            }
        },
       // Meteor commands to test and publish package
        exec: {
          'meteor-init': {
            // make sure Meteor is installed to run tests
            command: 'type meteor >/dev/null 2>&1 || { curl https://install.meteor.com/ | sh; }'
          },
          'meteor-cleanup': {
            // remove build files
            command: 'rm -rf .build.* versions.json'
          },
          'meteor-test': {
            command: 'spacejam --mongo-url mongodb:// test-packages ./'
          }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-exec');

    // meteor tasks
    grunt.registerTask('meteor-test', [
        'exec:meteor-init',
        'exec:meteor-test',
        'exec:meteor-cleanup'
    ]);

    grunt.registerTask('default', [
        'test',
        'meteor-test'
    ]);

    grunt.registerTask('test', [
        'jshint',
        'nodeunit'
    ]);

    // P
    grunt.registerTask('build', [
        'jshint',
        'nodeunit',
        'concat',
        'uglify'
    ]);

    // Travis CI task.
    grunt.registerTask('travis', ['test']);

};