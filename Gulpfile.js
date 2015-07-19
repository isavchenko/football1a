var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

var bases = {
	src: 'src/',
	dist: 'dist/'
};

var paths = {
	scripts: ['scripts/**/*.js'],
	libs: ['scripts/libs/jquery/dist/jquery.js', 'scripts/libs/underscore/underscore.js', 'scripts/backbone/backbone.js'],
	styles: ['styles/**/*.css'],
	html: ['index.html', '404.html'],
	images: ['images/**/*.png'],
	extras: ['crossdomain.xml', 'humans.txt', 'manifest.appcache', 'robots.txt', 'favicon.ico'],
};

// watch files for changes and reload
gulp.task('serveprod', function() {
	browserSync({
		port: process.env.PORT || 3000, // localhost:5000
		server: {
			baseDir: './dist'
		}
	});

	gulp.watch(['*.html', 'styles/**/*.css', 'scripts/**/*.js'], {cwd: 'app'}, reload);
});

var ts = require('gulp-typescript');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('ts', function () {
	var tsResult = gulp.src('src/scripts/**/*.ts')
		.pipe(sourcemaps.init()) // This means sourcemaps will be generated
		.pipe(ts({
			sortOutput: true
			// ...
		}));

	return tsResult.js
		.pipe(concat('output.js')) // You can use other plugins that also support gulp-sourcemaps
		.pipe(sourcemaps.write()) // Now the sourcemaps are added to the .js file
		.pipe(gulp.dest('dist/js'));
});

var clean = require('gulp-clean');
// Delete the dist directory
gulp.task('clean', function() {
	return gulp.src(bases.dist)
		.pipe(clean());
});

// Copy all other files to dist directly
gulp.task('copy'/*, ['clean']*/, function() {
	// Copy html
	gulp.src(paths.html, {cwd: bases.src})
		.pipe(gulp.dest(bases.dist));
});

// A development task to run anytime a file changes
gulp.task('watch', function() {
	gulp.watch('src/**/*', ['ts', 'copy']);
});

var bower = require('gulp-bower');

gulp.task('bower', function() {
	return bower({ directory: './src/lib'/*, cwd: './src'*/ })
		.pipe(gulp.dest('./dist/lib/'))
});

gulp.task('build', ['clean', 'ts', 'copy', 'bower']);
