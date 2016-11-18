// Load plugins
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    jade = require('gulp-jade'),
    minifycss = require('gulp-minify-css'),
    //jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    //imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
//    livereload = require('gulp-livereload'),
//    lr = require('tiny-lr'),
//    server = lr(),
	connect = require('gulp-connect');

gulp.task('connect', function() {
	connect.server({
		root: 'dist',
		livereload: true
	});
});

//HTML
gulp.task('jade', function() {
	return gulp.src('src/tmpl/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload())
    .pipe(gulp.dest('dist'));
});

// Styles
gulp.task('styles', function() {
  return gulp.src('src/styles/*.scss')
    .pipe(sass({ style: 'expanded'}))
    .pipe(concat('main.css'))
    .pipe(gulp.dest('dist/styles'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(connect.reload())
    .pipe(gulp.dest('dist/styles'));
});

// Scripts
gulp.task('scripts', function() {
  return gulp.src('src/scripts/**/*.js')
    //.pipe(jshint('.jshintrc'))
    //.pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/scripts'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(connect.reload())
    .pipe(gulp.dest('dist/scripts'));
});

// Images
gulp.task('images', function() {
  return gulp.src('src/images/**/*')
    .pipe(connect.reload())
    .pipe(gulp.dest('dist/images'));
});

// Clean
gulp.task('clean', function() {
  return gulp.src(['dist/styles', 'dist/scripts', 'dist/images'], {read: false})
    .pipe(clean());
});

// Default task
gulp.task('default', ['clean'], function() {
    gulp.run('styles', 'scripts', 'images', 'jade');
});

// Watch
gulp.task('watch', function() {
	gulp.watch(['src/scripts/**/*'], ['scripts']);
	gulp.watch(['src/styles/**/*'], ['styles']);
	gulp.watch(['src/tmpl/**/*'], ['jade']);
	gulp.watch(['src/images/**/*'], ['images']);
});
gulp.task('serve', ['connect', 'watch']);