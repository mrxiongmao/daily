var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var livereload = require('gulp-livereload');
var sourcemaps = require('gulp-sourcemaps');
var spritesmith = require("gulp.spritesmith");
gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('./scss/_sprite.scss', ['sprite']);
    gulp.watch(['./scss/*.scss','!./scss/_sprite.scss'], ['scss']);
    gulp.watch('./css/*.css').on('change', livereload.changed);
});
gulp.task('scss', function() {
    return sass('./scss/*.scss', {
            sourcemap: true,
            style: 'compressed'
        })
        .on('error', sass.logError)
        .pipe(sourcemaps.write('../scss-maps'))
        .pipe(gulp.dest('./css'));
});

gulp.task('sprite', function () {
  var spriteData = gulp.src('images/icon/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: '../scss/_sprite.scss',
    cssFormat : 'css',
    imgPath : '../images/sprite.png',
    padding : 2,
    cssVarMap: function(sprite){
        sprite.name = sprite.name.replace("icon-","");
    }
  }));
  return spriteData.pipe(gulp.dest('images'));
});
