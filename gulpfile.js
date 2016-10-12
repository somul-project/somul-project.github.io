'use strict';

var gulp = require('gulp'),
	gutil = require('gulp-util'),
	rename = require('gulp-rename'),
	sass = require('gulp-sass'),
	cleanCSS = require('gulp-clean-css'),
	uglify = require('gulp-uglify'),
	autoprefixer = require('gulp-autoprefixer'),
	browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    sourcemaps = require('gulp-sourcemaps');

const dirs = {
	src: 'src',
	dest: 'dist'
};

gulp.task('styles', function() {
	return gulp.src(dirs.src + '/sass/*.{css,scss}')
		.pipe(sourcemaps.init())
		.pipe(sass.sync().on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(sourcemaps.write('.'))
		.pipe(rename('bundle.min.css'))
		.pipe(gulp.dest(dirs.dest));
});

gulp.task('scripts', function() {
    return browserify({entries: dirs.src + '/js/app.js'})
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
		// .pipe(uglify({
  //           compress: {
		// 		global_defs: {
		// 			DEBUG: false
		// 		}
  //           }
  //       })).on('error', gutil.log)
        .pipe(sourcemaps.write('.'))
		.pipe(rename('bundle.min.js'))
		.pipe(gulp.dest(dirs.dest));
});

gulp.task('watch', function() {
	gulp.watch(dirs.src + '/js/*.js', ['scripts']);
	gulp.watch(dirs.src + '/sass/*.{css,scss}', ['styles']);
});

gulp.task('default', ['styles', 'scripts']);