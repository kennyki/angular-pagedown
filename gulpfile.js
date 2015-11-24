var gulp = require('gulp'); 

var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var minifyCss = require('gulp-minify-css');
var browserSync = require('browser-sync').create();

gulp.task('lint', function() {
    return gulp.src(['*.js', '!*.min.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('scripts', function() {
    return gulp.src(['*.js', '!*.min.js'])
        .pipe(rename('.min.js'))
        .pipe(uglify());
});

gulp.task('styles', function() {
  return gulp.src(['*.css', '!*.min.css'])
    .pipe(rename('.min.css'))
    .pipe(minifyCss({compatibility: 'ie8'}));
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
    gulp.watch(['*.js', '!*.min.js'], ['lint', 'scripts']);
    gulp.watch(['*.css', '!*.min.css'], ['styles']);
    gulp.watch(['demo/*.html', '*.js', '!*.min.js', '*.css', '!*.min.css']).on("change", browserSync.reload);
});

gulp.task('default', ['lint', 'scripts', 'styles', 'watch']);
gulp.task('serve', ['lint', 'scripts', 'styles', 'browser-sync', 'watch']);