var gulp = require('gulp'); 

var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var minifyCss = require('gulp-minify-css');
var browserSync = require('browser-sync').create();

gulp.task('lint', function() {
    return gulp.src('angular-pagedown.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('scripts', function() {
    return gulp.src('angular-pagedown.js')
        .pipe(rename('angular-pagedown.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./'));
});

gulp.task('styles', function() {
  return gulp.src('angular-pagedown.css')
    .pipe(rename('angular-pagedown.min.css'))
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('./'));
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: ["./", "demo"],
            routes: {
                "/bower_components": "bower_components"
            }
        }
    });
});

gulp.task('watch', function() {
    gulp.watch('angular-pagedown.js', ['lint', 'scripts']);
    gulp.watch('angular-pagedown.css', ['styles']);
    gulp.watch(['demo/*.html', 'angular-pagedown.min.js', 'angular-pagedown.min.css']).on("change", browserSync.reload);
});

gulp.task('default', ['lint', 'scripts', 'styles', 'watch']);
gulp.task('serve', ['lint', 'scripts', 'styles', 'browser-sync', 'watch']);