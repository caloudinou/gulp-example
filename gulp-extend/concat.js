/**
 * Created by grizzly on 03/07/2016.
 */


var gulp        = require('gulp');
var concat      = require('gulp-concat');
var routes      = require('./gulp-app-routes');
var uglify      = require('gulp-uglify');

/**
 * Concat all app js files into one file
 */
gulp.task('build-concat-js', function() {
    return gulp.src([
        routes.base+'*.js',
        routes.dev.config+'**/*.js',
        routes.dev.common+'**/*.js',
        routes.dev.components+'**/*.js',
        routes.dev.models+'**/*.js'
    ])
        .pipe(concat('app.js'))
        .pipe(gulp.dest(routes.prod.js));
});