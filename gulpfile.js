const gulp = require('gulp'),
    concat = require('gulp-concat'),
    del = require('del'), // rm -rf
    uglify = require('gulp-uglify'),
    gutil = require('gulp-util');

gulp.task('delete', function() {
    return del.sync(['dist/ws-binary-browser.min.js']);
});

gulp.task('scripts', function() {
    var js = [
        './node_modules/bytebuffer/dist/bytebuffer.js',
        './src/js/ws-binary.js'
    ];

    return gulp
        .src(js)
        .pipe(concat('ws-binary-browser.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/'));
});

gulp.task('build', ['delete', 'scripts']);

gulp.task('default', ['build']);
