var grunt = require('grunt');

/*
	======== A Handy Little Nodeunit Reference ========
	https://github.com/caolan/nodeunit

	Test methods:
		test.expect(numAssertions)
		test.done()
	Test assertions:
		test.ok(value, [message])
		test.equal(actual, expected, [message])
		test.notEqual(actual, expected, [message])
		test.deepEqual(actual, expected, [message])
		test.notDeepEqual(actual, expected, [message])
		test.strictEqual(actual, expected, [message])
		test.notStrictEqual(actual, expected, [message])
		test.throws(block, [error], [message])
		test.doesNotThrow(block, [error], [message])
		test.ifError(value)
*/

exports.linkscripts = {
  setUp: function(done) {
    done();
  },
  "test-1": function(test) {
    var actual = grunt.file.read('tests/fixtures/test-1-dest.html');
    var expected = grunt.file.read('tests/expected/test-1.html');
    test.equal(actual, expected, 'did not create the expected destination file');

    test.done();
  }
};
