/*global module:false*/
module.exports = function(grunt) {
/**
   * Load required Grunt tasks. These are installed based on the versions listed
   * in `package.json` when you do `npm install` in this directory.
   */
  // load all grunt tasks with matchdep
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  /**
   * This is the configuration object Grunt uses to give each plugin its
   * instructions.
   */
  grunt.initConfig({
    // Metadata.
    /**
     * We read in our `package.json` file so we can access the package name and
     * version. It's already there, so we don't repeat ourselves here.
     */
    pkg: grunt.file.readJSON('package.json'),
    /**
     * The directory to which we throw our compiled project files.
     */
    jsDir: 'src/js',
    buildDir: 'build',
    tempDir: 'src/.tmp',
    libsDir: 'src/libs',
    scssDir: 'src/scss',
    tplsDir: 'src/tpls',
    /**
     * The banner is the comment that is placed at the top of our compiled
     * source files. It is first processed as a Grunt template, where the `<%=`
     * pairs are evaluated based on this very configuration object.
     */
    banner: grunt.template.process(
      grunt.file.read('grunt/templates/banner.template.js'),
      {
        data: {
          "pkg": grunt.file.readJSON('package.json')
        }
      }
    ),
    // Task configuration.
    /**
     * `grunt concat` concatenates multiple source files into a single file.
     */
    concat: {
      options: {
        banner: '<%=banner%>',
        separator: "\n"
      },
      libs: {
        files: {
          '<%=tempDir%>/js/libs.js': [
            '<%=libsDir%>/jquery/jquery.min.js',
            '<%=libsDir%>/underscore/underscore-min.js',
            // '<%=libsDir%>/jquery-resize/jquery.ba-resize.min.js',
            '<%=libsDir%>/angular-unstable/angular.js'
          ]
        }
      },
      components: {
        files: {
          '<%=tempDir%>/js/components.js': [
            // flexibleGrid component files
            '<%=jsDir%>/components/flexiblegrid/flexiblegrid.vars.js',
            '<%=jsDir%>/components/flexiblegrid/directives/flexiblegrid.directive.js',
            '<%=jsDir%>/components/flexiblegrid/directives/main.directive.js',
            '<%=jsDir%>/components/flexiblegrid/directives/border.directive.js',
            '<%=jsDir%>/components/flexiblegrid/directives/handle.directive.js',
            '<%=jsDir%>/components/flexiblegrid/flexiblegrid.app.js',
            // resize component files
            // '<%=jsDir%>/components/resize/resize.vars.js',
            // '<%=jsDir%>/components/resize/directives/resize.directive.js',
            // '<%=jsDir%>/components/resize/resize.app.js'
          ]
        }
      },
      main: {
        files: {
          '<%=tempDir%>/js/main.js': [
            '<%=jsDir%>/main.vars.js',
            '<%=jsDir%>/main.controller.js',
            '<%=jsDir%>/main.app.js'
          ]
        }
      }
    },
    copy: {
      componentsTpls: {
        files: [
          {
            expand: true,
            flatten: true,
            dest: 'src/.tmp/tpls/',
            src: ['src/js/components/flexiblegrid/tpls/*.html']
          }
        ]
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {}
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib_test: {
        src: ['lib/**/*.js', 'test/**/*.js']
      }
    },
    compass: {
      dev: {
        options: {
          sassDir: '<%=scssDir%>',
          cssDir: '<%=tempDir%>/css'
        }
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['default']
      },
      compass: {
        files: ['<%=scssDir%>/*.scss', '<%=jsDir%>/components/**/*.scss'],
        tasks: ['compass']
      },
      libs: {
        files: '<%=libsDir%>/**/*.js',
        tasks: ['concat:libs']
      },
      components: {
        files: '<%=jsDir%>/components/**/*.js',
        tasks: ['concat:components']
      },
      componentsTpls: {
        files: '<%=jsDir%>/components/**/*.html',
        tasks: ['copy']
      },
      main: {
        files: '<%=jsDir%>/*.js',
        tasks: ['concat:main']
      }
    }
  });
  // Default task.
  grunt.registerTask('default', ['compass', 'concat', 'copy']);
};
