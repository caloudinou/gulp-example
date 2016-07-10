/**
 * Created by grizzly on 03/07/2016.
 */


var gulp        = require('gulp');
var sass        = require('gulp-sass');
var sourcemaps  = require('gulp-sourcemaps');
var rename      = require('gulp-rename');
var cleancss    = require('gulp-clean-css');
var runSequence = require("run-sequence");
var replace     = require('gulp-replace');

var routes      = require('./gulp-app-routes');

/**
 * covertir le Scss en css
 * minifie en clean et genere le source map dans le fichier style.min.css
 */
gulp.task('build-clean-scss-to-css', function () {

    return gulp.src(routes.base+'**/app.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(cleancss(
            {debug: true}, function(details) {
                console.log(details.name + ': ' + details.stats.originalSize);
                console.log(details.name + ': ' + details.stats.minifiedSize);
            },
            {compatibility: 'ie8'}
        ))
        .pipe(sourcemaps.write())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(routes.prod.css));

});

/**
 * default task css
 */
gulp.task('default-css', null, function(callback){
    runSequence(
        'build-clean-scss-to-css',
        callback
    );
});