/**
 * Created by grizzly on 03/07/2016.
 */


var gulp        = require('gulp');
var routes      = require('./gulp-app-routes');

/**
 * Watch to new project directory
 */
gulp.task('watch', function(){
    gulp.watch([routes.base+'**/*.scss',routes.base+'**.scss'],['default-css']);
    gulp.watch([routes.base+'**/*.js',routes.base+'**.js'],['build-concat-js']);
});

/**
 * server Watch
 */
gulp.task('watching',['watch','webserver']);