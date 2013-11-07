grunt-resource-linker
=====================

A grunt plugin that links js-files and css-files to a html-file.

## Motivation

- My index.html had different js and css references for development and production.
- I got tired of manually adding references to new js files in my index.html. Grunt (with watch and this plugin) can do it automatically.

## Getting started

If you haven’t used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. 

To use this plugin, run
```npm install git+https://github.com/janneri/grunt-resource-linker --save-dev```


## Example

Check out the Gruntfile.js and the tests for details..

Running
``` grunt linkresources ```

With Gruntfile.js:
```
...
        'linkresources': {
            'default': {
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

  ...

    grunt.loadNpmTasks('grunt-resource-linker');
```

And files:
```
── fixtures
    ├── css
    │   ├── test-1.css
    │   └── test-2.css
    ├── js
    │   ├── test-1.js
    │   ├── test-2.js
    │   └── test-3.js
    └── test-1-src.html
```

And a source file:
```
  <!-- css start -->
  <link rel="stylesheet" type="text/css" href="css/devstyle.css">
  <!-- css end -->

  <!-- js start -->
  <script src="js/content-does-not-matter.js"></script>
  <script src="js/controllers.js"></script>
  <!-- js end -->
```

Creates a dest file:
```
  <!-- css start -->
  <link rel="stylesheet" type="text/css" href="css/test-1.css">
  <link rel="stylesheet" type="text/css" href="css/test-2.css">
  <!-- css end -->

  <!-- js start -->
  <script src="js/test-1.js"></script>
  <script src="js/test-2.js"></script>
  <script src="js/test-3.js"></script>
  <!-- js end -->
```

## Configuration

```
'options': {
      // required:
      'srcFile': 'src.html',
      'destFile': 'dest.html',
      'jsFiles': 'js/*.js',
      'cssFiles': 'css/*.css',
      // By default the resources have a path relative to the gruntfile.. You probably want these:
      jsPathToRemove: '',
      cssPathToRemove: '',
      
      // optional with default values:
      cssStart: '<!-- css start -->',
      cssEnd: '<!-- css end -->',
      jsStart: '<!-- js start -->',
      jsEnd: '<!-- js end -->',

      jsTmpl: '<script src="%s"></script>',
      cssTmpl: '<link rel="stylesheet" type="text/css" href="%s">',
      
      jsPathToAdd: '',
      cssPathToAdd: '' 
}
```
