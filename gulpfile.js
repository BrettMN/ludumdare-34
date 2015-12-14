var gulp = require('gulp');
var ts = require('gulp-typescript');
var reload = require('gulp-livereload');
var connect = require('gulp-connect');
	
gulp.task('ts', function() {
	return gulp.src('src/**/*.ts')
	.pipe(ts({
		module: 'system'	
	}))
	.pipe(gulp.dest('./app/'))
	.pipe(connect.reload());
});


gulp.task('connect', function() {
  connect.server({
    livereload: true
  });
});



gulp.task('watch', ['ts'], function(){	
	gulp.watch('src/**/*.ts', ['ts']);
})



gulp.task('default', ['connect', 'watch']);