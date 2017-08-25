var gulp = require('gulp')

var concat = require("gulp-concat")

var uglify = require("gulp-uglify")

var del = require("del")

var sass = require("gulp-sass")

var livereload = require("gulp-livereload")

const browserify = require('gulp-browserify');

gulp.task("clean",function(){
    return del(['build'])
})


gulp.task("html",function(){
  return gulp.src("./src/component/**/*.html")
      .pipe(gulp.dest("./dist/page"))
})

gulp.task("sass",function(){
   return gulp.src(
        "./src/scss/**/*.scss"
    ).pipe(sass().on("error",sass.logError)).pipe(gulp.dest("./dist/css"));
});

gulp.task('watch',function(){
  livereload.listen();
  gulp.watch("./src/scss/**/*.scss",['sass']);
  gulp.watch("./src/js/**/*.js",["js"]);
  gulp.watch("./src/component/**/*.html",["html"])

});
gulp.task("js",function(){
    return gulp.src("./src/js/**/*.js")
        .pipe(browserify({
            transform: ['babelify']
        }))
        .pipe(gulp.dest("./dist/js"))
})

gulp.task("default",["js","sass","watch","html"])