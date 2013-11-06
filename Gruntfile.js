'use strict';

module.exports = function(grunt) {

	grunt.initConfig({

		'clean': {
			'tests': 'tests/fixtures/*dest.html'
		},

		'linkscripts': {
			'test-1': {
				'options': {
			        'srcFile': 'tests/fixtures/test-1-src.html',
					'destFile': 'tests/fixtures/test-1-dest.html',
			        'jsFiles': 'tests/fixtures/js/*.js',
			        'cssFiles': 'tests/fixtures/css/*.css',
			        'jsPathToRemove': 'tests/fixtures/',
			        'cssPathToRemove': 'tests/fixtures/',
				}
			}
		},

		'nodeunit': {
			'tests': ['tests/tests.js']
		}

	});

	grunt.loadTasks('tasks');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-nodeunit');

	grunt.registerTask('test', ['clean', 'linkscripts:test-1', 'nodeunit']);
	grunt.registerTask('default', ['test']);

};
