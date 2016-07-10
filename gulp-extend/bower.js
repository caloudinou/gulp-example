/**
 * Created by grizzly on 03/07/2016.
 */


var gulp        = require('gulp');
var bower       = require('gulp-bower');

/**
 * launch bower install with gulp
 */
gulp.task('bower', function() {
    return bower();
});