var gulp = require('gulp');
var csso = require('gulp-csso');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var ngAnnotate = require('gulp-ng-annotate');
var uncss = require('gulp-uncss');

gulp.task('css', function() {
  gulp.src('src/css/*.css')
    .pipe(plumber())
    .pipe(uncss({
            html: ['src/tpl/*.html', 'src/tpl/**/*.html', 'src/*.html']
        }))
    .pipe(csso())
    .pipe(concat('app.min.css'))
    .pipe(gulp.dest('src/css/dist'));
});

/* 
uncss can't see .angular-leaflet-map so that needs to be put in manually

*/

gulp.task('appJS', function() {
  gulp.src(['src/js/*.js', 'src/js/**/*.js'])
    .pipe(concat('app.min.js'))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(gulp.dest('src/js/dist'));
});

gulp.task('randomJS', function() {
  gulp.src(['src/js/filters/*.js',
   'src/js/directives/*.js',
   'src/js/services/*.js'])
    .pipe(concat('randomjs.js'))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(gulp.dest('src/js/dist'));
});

/*
gulp.task('vendorJS', function() {
  gulp.src(['src/vendor/jquery-1.9.0.min.js', 'src/vendor/angular.js', 'src/vendor/*.js', '!src/vendor/*.min.js'])
    .pipe(concat('vendor.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('src/vendor'));
});
*/

// Default Task
gulp.task('default', ['css', 'appJS', 'randomJS']);