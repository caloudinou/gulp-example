/**
 * Created by grizzly on 03/07/2016.
 * @author Pascal Navière <pascalou@gmail.com>
 */

'use strict';

var gulp        = require('gulp');


require('./gulp-extend/bower');
require('./gulp-extend/test-route');
require('./gulp-extend/scss-to-css');
require('./gulp-extend/concat');
require('./gulp-extend/watch-files');
require('./gulp-extend/launch-server');
require('./gulp-extend/concat');
require('./gulp-extend/html');
require('./gulp-extend/default');


/**
 * default task
 * cmd : gulp
 */
gulp.task('default', function () {
    gulp.start('build-concat-js', 'default-css', 'build-html', 'build-json');
});