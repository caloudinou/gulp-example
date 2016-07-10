/**
 * Created by grizzly on 03/07/2016.
 */


var gulp        = require('gulp');
var webserver   = require('gulp-webserver');

/**
 * lunch server to localhost:6969 and
 * reload when the file app_prod change
 */

gulp.task('webserver', function() {
    var stream = gulp.src('./prod')
        .pipe(webserver({
            port: 6969,
            livereload: true,
            fallback: 'index.html',
            open: true
        }));
    stream.emit('kill');
    return stream;
});
