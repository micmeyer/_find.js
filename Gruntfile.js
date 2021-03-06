/* global module:false */
/* jshint strict:false, camelcase:false */

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON("package.json"),
        banner: "/*! _find.js - v<%= pkg.version %> - <%= grunt.template.today('yyyy-mm-dd') %> */\n",
        concat: {
            options: {
                banner: "<%= banner %>",
                stripBanners: true
            },
            dist: {
                src: ["src/<%= pkg.name %>.js"],
                dest: "dist/<%= pkg.name %>-<%= pkg.version %>.js"
            }
        },
        uglify: {
            options: {
                banner: "<%= banner %>"
            },
            dist: {
                src: "<%= concat.dist.dest %>",
                dest: "dist/<%= pkg.name %>-<%= pkg.version %>.min.js"
            }
        },
        jshint: {
            options: {
                jshintrc: ".jshintrc"
            },
            gruntfile: {
                src: "Gruntfile.js"
            },
            lib_test: {
                src: ["src/**/*.js", "test/**/*.js"]
            }
        },
        qunit: {
            options: {
                "--web-security": "no",
                coverage: {
                    disposeCollector: false,
                    src: ["src/_find.js"],
                    instrumentedFiles: "temp/",
                    htmlReport: "report/coverage",
                    lcovReport: "report/",
                    linesThresholdPct: 85
                }
            },
            all: ["test/**/*.html"]
        },
        coveralls: {
            options: {
                force: false
            },
            main_target: {
                src: "report/lcov.info"
            }
        },
        bump: {
            options: {
                files: ["package.json"],
                updateConfigs: [],
                commit: true,
                commitMessage: "Release v%VERSION%",
                commitFiles: ["package.json"],
                createTag: true,
                tagName: "v%VERSION%",
                tagMessage: "Version %VERSION%",
                push: true,
                pushTo: "origin",
                gitDescribeOptions: "--tags --always --abbrev=1 --dirty=-d"
            }
        },
        watch: {
            gruntfile: {
                files: "<%= jshint.gruntfile.src %>",
                tasks: ["jshint:gruntfile"]
            },
            lib_test: {
                files: "<%= jshint.lib_test.src %>",
                tasks: ["jshint:lib_test", "qunit"]
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-qunit");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-qunit-istanbul");
    grunt.loadNpmTasks("grunt-coveralls");
    grunt.loadNpmTasks("grunt-bump");

    // Default task.
    grunt.registerTask("default", ["jshint", "qunit", "concat", "uglify"]);

    // Travis CI task.
    grunt.registerTask("travis", ["jshint", "qunit", "concat", "uglify"]);
};
