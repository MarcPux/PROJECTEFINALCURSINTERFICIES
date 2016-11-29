var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var replace = require('gulp-replace');

gulp.task('disweb', ['minify-css','minify-js']);

gulp.task('reanomena-datatables', function(){
 return gulp.src(['./lib/DataTables/datatables.css'])
    .pipe(replace('DataTables-1.10.12/images/', '../../lib/DataTables/DataTables-1.10.12/images/'))
    .pipe(gulp.dest('./css/'));
});

gulp.task('sass', ['reanomena-datatables'], function () {
  return gulp.src('./scss/principal.scss')
    .pipe(sass())
    .pipe(gulp.dest('./css'));
});

gulp.task('concatena', ['sass'], function() {
  return gulp.src(['./css/principal.css',
                   './css/datatables.css',
	    	   './css/layout.css',
		   './css/main.css'])
    .pipe(concat('all.css'))
    .pipe(gulp.dest('./dist/css'));
});


gulp.task('minify-css', ['concatena'], function() {
  return gulp.src('./dist/css/all.css')
    .pipe(cleanCSS())
    .pipe(rename("all.min.css"))
    .pipe(gulp.dest('./dist/css'));
});


