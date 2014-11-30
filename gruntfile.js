module.exports = function (grunt) {
    var srcDir = 'src/main/webapp/WEB-INF/';
    var lessDir = srcDir + 'less/';
    var jsDir = srcDir + 'js/';
    var imgDir = srcDir + 'images/';

    var bowerDir = 'bower_components/';

    var dstDir = 'src/main/webapp/public/';
    var dstCssDir = dstDir + 'css/';
    var dstJsDir = dstDir + 'js/';
    var dstImgDir = dstDir + 'images/';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            files: [
                jsDir + '**',
                lessDir + '**',
                imgDir + '**'
            ],
            tasks: 'dev'
        },

        copy: {
            images: {
                expand: true,
                cwd: imgDir,
                src: [ '**/*' ],
                dest: dstImgDir
            }
        },

        uglify: {
            dist: {
                options: {
                    compress: true,
                    report: 'min'
                },
                src: [
                    bowerDir + 'angular/angular.js',
                    jsDir + '*.js',
                    jsDir + '**/*.js'
                ],
                dest: dstJsDir + 'all.js'
            },
            dev: {
                options: {
                    beautify: true,
                    compress: false,
                    report: 'min'
                },
                src: '<%= uglify.dist.src %>',
                dest: '<%= uglify.dist.dest %>'
            }
        },

        less: {
            dist: {
                options: {
                    compress: true,
                    yuicompress: true,
                    optimization: 2,
                    report: 'min'
                },
                src: [
                    lessDir + '*.less',
                    lessDir + '**/*.less'
                ],
                dest: dstCssDir + 'all.css'
            },

            dev: {
                options: {
                    compress: false,
                    yuicompress: false,
                    report: 'min'
                },
                src: '<%= less.dist.src %>',
                dest: '<%= less.dist.dest %>'
            }
        },

        compress: {
            dist: {
                options: {
                    mode: 'gzip'
                },
                files: [
                    { expand: true, cwd: dstJsDir, src: [ '*.js', '**/*.js'], dest: dstJsDir, ext: '.js.gz' },
                    { expand: true, cwd: dstCssDir, src: [ '*.css', '**/*.css'], dest: dstCssDir, ext: '.css.gz' }
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-compress');

    grunt.registerTask('default', ['uglify:dist', 'less:dist', 'copy', 'compress']);
    grunt.registerTask('dev', ['uglify:dev', 'less:dev', 'copy', 'compress']);
};