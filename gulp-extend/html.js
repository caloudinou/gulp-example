/**
 * Created by grizzly on 06/07/2016.
 */

var gulp        = require('gulp');
var htmlmin     = require('gulp-htmlmin');
/**
 * Compress html files
 */
gulp.task('build-minify-html', function() {
    return gulp.src('./app/components/**/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('./prod/src/views/'));
});
/**
 * Compress html files
 */
gulp.task('build-index-html', function() {
    return gulp.src('./app/index.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('./prod/'));
});

/**
 * compile html
 */
gulp.task('build-html',['build-index-html','build-minify-html']);