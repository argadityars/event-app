var gulp = require('gulp');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var browserSync = require('browser-sync');

//Compile sass
gulp.task('sass', function() {
	return gulp.src('app/scss/*.sass')
		.pipe(sass({
			includePaths: ['scss'],
			onError: browserSync.notify
		}))
		.pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({stream:true}));
});

//Run BrowserSync
gulp.task('browser-sync', function(){
	browserSync.init(["app/css/*.css", "app/js/*.js"], {
		server: {
			baseDir: "./"
		}
	});
});

//Watch every changes and reload the browser
gulp.task('watch', ['sass', 'browser-sync'], function(){
	gulp.watch(["scss/*.scss", "scss/*.sass"], ['sass']);
	gulp.watch("*.html").on('change', browserSync.reload);
});

//Default task
gulp.task('default', ['browser-sync', 'watch']);