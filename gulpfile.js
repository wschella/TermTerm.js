var gulp = require("gulp");
var ts = require("gulp-typescript");
var del = require('del');

var tsProject = ts.createProject("tsconfig.json");

gulp.task('clean:output', function () {
  return del([
    'dist/'
  ]);
});

gulp.task("watch", function(){
    gulp.watch(['**/*.ts'], ["default"], { ignoreInitial: false });
});

gulp.task("compile", function(){
    return tsProject.src()
      .pipe(tsProject())
      .js.pipe(gulp.dest("dist"));
});

gulp.task("default", ['clean:output', 'compile']);