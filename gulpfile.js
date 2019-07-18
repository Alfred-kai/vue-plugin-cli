var gulp = require("gulp");
var preprocess = require("gulp-preprocess");
var workingDir = process.cwd();

gulp.task("replace", () => {
  return gulp
    .src(["./template/*"])
    .pipe(
      preprocess({
        context: {
          BASE_URL: "wangkai"
        }
      })
    )
    .pipe(gulp.dest(workingDir + "/mayi"));
});
