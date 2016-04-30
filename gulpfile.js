'use strict';

var fs = require('fs');
var del = require('del');
var gulp = require('gulp');
var gulpIf = require('gulp-if');
// var md5File = require('md5-file');
// var replace = require('gulp-replace');
// //var buffer = require('gulp-buffer');
// //var revHash = require('rev-hash');

var newer = require('gulp-newer');
var notify = require('gulp-notify');

var sass = require('gulp-sass');
// var minifyCss = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');
// var spritesmith = require('gulp.spritesmith');
var autoprefixer = require('gulp-autoprefixer');
// var modifyCssUrls = require('gulp-modify-css-urls');
var cssImageDimensions = require('gulp-css-image-dimensions');

var watch = require('gulp-watch');
var server = require('gulp-server-livereload');

// var htmlmin = require('gulp-htmlmin');
var fileinclude = require('gulp-file-include');

// var gutil = require('gulp-util');
// var webpack = require('webpack');
// var webpackConfig = require('./webpack.config.js');

var isDevelopment = process.env.NODE_ENV !== 'prod' ? true : false;

var destFolder = isDevelopment ? 'dev' : 'public';

gulp.task('clean', function() {
	return del(['public', 'dev']);
});

// STYLES
gulp.task('sass', function () {

	const date = new Date().getTime();

	return gulp.src('src/sass/style.scss')
		.pipe(sass({outputStyle: 'expanded'})) 
		.on('error', notify.onError())
		.pipe(autoprefixer({
			browsers: ['> 1%'],
			cascade: false
		}))
		.pipe(cssImageDimensions())
		.on('error', notify.onError())
		.pipe(gulp.dest(destFolder + '/assets/css'));  
});

// ASSETS
gulp.task('assets-files', function(){
	return gulp.src(['src/assets/**/*.*', '!src/assets/favicon.ico'], {since: gulp.lastRun('assets-files')})
		.pipe(newer(destFolder + '/assets'))
		.pipe(gulp.dest(destFolder + '/assets'))
});
gulp.task('favicon', function(){
	return gulp.src(['src/assets/favicon.ico'], {since: gulp.lastRun('favicon')})
		.pipe(newer(destFolder))
		.pipe(gulp.dest(destFolder))
});

gulp.task('assets', gulp.parallel('assets-files', 'favicon'));

//JS
gulp.task('js', function(){
	return gulp.src(['src/js/**/*.*'], {since: gulp.lastRun('js')})
		.pipe(newer(destFolder + '/js'))
		.pipe(gulp.dest(destFolder + '/js'))
});


gulp.task('sprite', function(callback) {

	var spriteData = 
		gulp.src('src/assets/sprite/*.png') // путь, откуда берем картинки для спрайта
		.pipe(spritesmith({
			imgName: 'sprite.png',
			cssName: '_sprites.scss',
			imgPath: '../images/sprite.png'
		}))
		.on('error', notify.onError())
		

	spriteData.img
		.pipe(gulp.dest(destFolder + '/assets/images/'))

	spriteData.css.pipe(gulp.dest('src/sass/'));

	setTimeout( callback, 2000);
	
});




// HTML
gulp.task('html', function() {

	return gulp.src(['src/html/*.html'])
		.pipe(fileinclude({
			prefix: '@@',
			basepath: '@file',
			indent: true
		}))
		.on('error', notify.onError())
		.pipe(gulp.dest(destFolder));
});

gulp.task('php', function() {

	return gulp.src(['src/html/*.php'])
		.on('error', notify.onError())
		.pipe(gulp.dest(destFolder));
});




// BUILD
gulp.task('server', function () {
	gulp.src(destFolder)
	.pipe(server({
		livereload: true,
		directoryListing: false,
		open: false,
		port: 9000
	}));
})

gulp.task('watch', function(){
	gulp.watch('src/sass/**/*.scss', gulp.series('sass'));
	gulp.watch('src/assets/**/*.*', gulp.series('assets'));
	gulp.watch('src/js/**/*.js', gulp.series('js'));
	gulp.watch('src/html/**/*.html', gulp.series('html'));
});

gulp.task('build', 
	gulp.series(
		'clean', 
		gulp.parallel('assets', 'js', 'sass', 'html', 'php')
	)
);

gulp.task('prod', gulp.series('build'));

gulp.task('default', gulp.series( 'build', gulp.parallel('server', 'watch')));



