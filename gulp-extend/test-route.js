'use strict';

var gulp        = require('gulp');
var routes      = require('./gulp-app-routes');

/**
 * methode pour tester les routes
 */
 gulp.task('routes', function () {
        return console.log(routes);
    });
