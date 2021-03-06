// Grunt file for ixdlegos
// ranjithkumarr.com
// @mysticpixels

module.exports = function(grunt) {

  grunt.initConfig({

    // reading the package file
    pkg: grunt.file.readJSON('package.json'),

    // adding a neat banner to the top of the source files
    tag: {
      banner: '/*\n' +
              ' Hello world ' +
              ' * <%= pkg.name %>\n' +
              ' * <%= pkg.title %>\n' +
              ' * <%= pkg.url %>\n' +
              ' * @author <%= pkg.author %>\n' +
              ' * @version <%= pkg.version %>\n' +
              ' * Copyright <%= pkg.copyright %>. <%= pkg.license %> licensed.\n' +
              ' */\n'
    },

    // setting up folder structure pointers
    project: {
      dev: 'dev',
      // build: 'build',
      devcss: '<%= project.dev %>/css',
      devjs: '<%= project.dev %>/js',
      // buildcss: '<%= project.build %>/css',
      // buildjs: '<%= project.build %>/js'
    },

    // concatenating all handwritten js to single js file
    // concat: {
    //   options: {
    //     separator: ';'
    //   },
    //   dist: {
    //     src: ['<%= project.devjs %>/*.js'],
    //     dest: '<%= project.buildjs %>/uxdlegos.js'
    //   }
    // },

    // converting scss files to css and saving to relevant folders
    sass: {
      dev: {
        options: {
          style: 'expanded',
          sourcemap: 'none',
          // banner: '<%= tag.banner %>'
          // compass: true
        },
        files: {
          '<%= project.devcss %>/css/ixdlegos.css': '<%= project.devcss %>/scss/ixdlegos.scss'
        }
      }//,
      // dist: {
      //   options: {
      //     style: 'compressed',
      //     sourcemap: 'none'          
      //     // compass: true
      //   },
      //   files: {
      //     '<%= project.buildcss %>/ixdlegos.css': '<%= project.devcss %>/scss/ixdlegos.scss'
      //   }
      // }
    },

    // watching the scss files
    watch: {
      sass: {
        files: ['<%= project.devcss %>/scss/{,*/}*.{scss,sass}'],
        tasks: ['sass:dev', 'sass:dist'],
        option: {
          livereload: true
        }
      }
    },

    // available tasks plugin 
    availabletasks: {
      tasks: {
        options: {
          filter: 'exclude',
          tasks: ['availabletasks', 'tasks']
        }
      }              
    },  

    // bower install
    "bower-install-simple": {
        options: {
            color: true,
            directory: "dev"
        },
          "prod": {
            options: {
                production: true
            }
        },
        "dev": {
            options: {
                production: false
            }
        }
      }
  });

  // loading the plugins
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-banner');
  grunt.loadNpmTasks('grunt-available-tasks');
  grunt.loadNpmTasks("grunt-bower-install-simple");

  // registering the tasks
  grunt.registerTask('default', [/*'concat', */'sass', 'watch', 'bower-install-simple' ]);
  grunt.registerTask('tasks', ['availabletasks']);

};