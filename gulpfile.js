var gulp = require('gulp')
  , bower = require('gulp-bower')
  ;

gulp.task('bower', function() {
  return bower('client/bower_components')
    .pipe(gulp.dest('client/lib/'))
})

gulp.task('default', ['bower']);
