var util = require('util');


var endsWith = function(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
};

var takeChars = function(char, num) {
	var result = [];
	for (var i = 0; i < num; i++) {
		result.push(char);
	}
	return result.join('');
};

var countCharsBefore = function(string, fromIndex, expectedChar) {
	var i = fromIndex;
	while (i > 0 && string[i] === expectedChar) {
		--i;
	}
	return fromIndex - i;
};

module.exports = function(grunt) {

	grunt.registerMultiTask('linkscripts', 'Interpolate template files with any data you provide and save the result to another file.', function() {

		var options = this.options({
	        cssStart: '<!-- css start -->',
	        cssEnd: '<!-- css end -->',
	        jsStart: '<!-- js start -->',
	        jsEnd: '<!-- js end -->',

	        jsTmpl: '<script src="%s"></script>',
	        cssTmpl: '<link rel="stylesheet" type="text/css" href="%s">',
	        jsPathToRemove: '',
	        jsPathToAdd: '',
	        cssPathToRemove: '',
	        cssPathToAdd: '',
	        destFile: 'tmp/dest.html',
	        srcFile: 'tests/fixtures/test-1.html',
	        jsFiles: 'tests/fixtures/js/*.js',
	        cssFiles: 'tests/fixtures/css/*.css'
	        
		});

		var createElement = function(filename) {
			var isCss = endsWith(filename, "css");
		    var tmpl = isCss ? options.cssTmpl : options.jsTmpl;
		    var pathToRemove = isCss ? options.cssPathToRemove : options.jsPathToRemove;
		    var pathToAdd = isCss ? options.cssPathToAdd : options.jsPathToAdd;

			return util.format(tmpl, pathToAdd + filename.substr(pathToRemove.length));
		};

		var replaceContentBetweenStrings = function(src, injectedContent, startString, endString) {
			var prefix = src.substr(0, src.indexOf(startString) + startString.length) + grunt.util.linefeed;
			var indentation = countCharsBefore(src, src.indexOf(startString) - 1, ' ');
			var suffix = grunt.util.linefeed + takeChars(' ', indentation) + src.substr(src.indexOf(endString));
			return prefix + injectedContent + suffix;
		};
		
		console.log("js files %j", grunt.file.expand(options.jsFiles));
		console.log("css files %j", grunt.file.expand(options.cssFiles));
		
		var srcContent = grunt.file.read(options.srcFile);
		var indentation = countCharsBefore(srcContent, srcContent.indexOf(options.jsStart) - 1, ' ');

		var jsTags = grunt.file.expand(options.jsFiles)
			//.filter(grunt.file.exists)
			.map(createElement)
			.map(function(tag) { return takeChars(' ', indentation) + tag; })
			.join(grunt.util.linefeed);
		
		var cssTags = grunt.file.expand(options.cssFiles)
			//.filter(grunt.file.exists)
			.map(createElement)
			.map(function(tag) { return takeChars(' ', indentation) + tag; })
			.join(grunt.util.linefeed);


		var jsReplaceResult = replaceContentBetweenStrings(
			srcContent, jsTags, options.jsStart, options.jsEnd);

		result = replaceContentBetweenStrings(
			jsReplaceResult, cssTags, options.cssStart, options.cssEnd);

		grunt.file.write(options.destFile, result);

		grunt.log.writeln('File `' + options.destFile + '` created.');

	});

};
