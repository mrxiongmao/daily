var gulp = require('gulp');
//var sass = require('gulp-sass');
var sass = require('gulp-ruby-sass');
var sourcemaps = require('gulp-sourcemaps');
var livereload = require('gulp-livereload');



//发布CSS，用于生成环境
gulp.task('scss', function () {
    return sass('./scss/*.scss', {
            sourcemap: true,
            style: 'expanded'
        })
        .on('error', sass.logError)
        .pipe(sourcemaps.write('../scss-maps'))
        .pipe(gulp.dest('./css'));
});

//自动监视LESS文件并LiveReload页面
gulp.task('scss-watch', function () {
    livereload.listen();
    gulp.watch('./scss/*.scss', ['scss']);
    gulp.watch('./css/*.css').on('change', livereload.changed);
});