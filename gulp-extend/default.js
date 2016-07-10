/**
 * Created by grizzly on 03/07/2016.
 */


var gulp        = require('gulp');
var rename      = require('gulp-rename');
var uglify      = require('gulp-uglify');

/**
 * Compress app.js and save it as app.min.js
 */
gulp.task('build-compress-js', function() {
    return gulp.src('./app_prod/src/js/app.js')
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./prod/src/js/'));
});


/**
 * copy translate json file
 */
gulp.task('build-copy-json-translation', function() {
    return gulp.src('app/translation/*.json')
        .pipe(gulp.dest('prod/src/translation/'));
});

/**
 * copy config json file
 */
gulp.task('build-copy-json-config', function() {
    return gulp.src('app/config/*.json')
        .pipe(gulp.dest('prod/src/config/'));
});
gulp.task('build-json',['build-copy-json-translation','build-copy-json-config']);

/**
 * Del the prod
 */
gulp.task('build-clean', function() {
    return gulp.src('prod').pipe(clean());
});

