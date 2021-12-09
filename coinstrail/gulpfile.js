var gulp = require('gulp'),
	gulpIf = require('gulp-if'),
	sass = require('gulp-sass'),
	cleancss = require('gulp-clean-css'),
	browserSync = require('browser-sync').create(), //Подключаем browser-sync-пакет
	svgSprite = require('gulp-svg-sprites'),
	svgmin = require('gulp-svgmin'),
	cheerio = require('gulp-cheerio'),
	replace = require('gulp-replace'),
	// gutil = require( 'gulp-util' ),
	// ftp = require('gulp-ftp'),
	autoprefixer = require('gulp-autoprefixer'),
	del = require('del'),
	sourcemaps = require('gulp-sourcemaps');
	// uncss = require('gulp-uncss');
	fileinclude = require('gulp-file-include'),
	htmlbeautify = require('gulp-html-beautify');;






//----------------------Синхронизация браузера, отслеживание изменений в SCSS и в HTML файлах-------------------------
//----------------------Синхронизация браузера, отслеживание изменений в SCSS и в HTML файлах-------------------------
gulp.task('serve', function(done) {  // task sass выполняется первым (перед  task serve) так как записан в квадратных скобках
	browserSync.init({
		server: "src/",  // Остлеживаем всё в папке site
	});
	gulp.watch("src/media/**/*", gulp.series('clear-img', 'img-src', 'svgSpriteBuild'));
	gulp.watch("src/js/**/*").on('change', browserSync.reload);
	gulp.watch("src/sass/**/*", gulp.series('clear-css', 'sass', 'css-src')); // Остлеживаем в папке site папку sass  и все файлы .scss
	gulp.watch(["src/html/*.html", "src/components/*.html"], gulp.series('html-src')).on('change', browserSync.reload); // при изменении html в папке site перезагружается браузер
	done();
});
gulp.task('sass',  function(done){ //Создаём таск "sass"
	gulp.src(['src/sass/**/*.sass','src/sass/**/*.scss']) //Берём источник
		.pipe(sourcemaps.init())
		.pipe(sass({outputStyle:'compressed'}).on('error',sass.logError)) //Преобразуем Sass в Css
		// .pipe(uncss({
  //           html: ['src/filter-industrial-tires.html']
  //       }))

		.pipe(autoprefixer(['last 2 versions', /*'> 1%',*/ /*'ie 8', 'ie 7'*/], { cascade: true }))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('src/css')) //Выгружаем результат в папку "css"
		.pipe(browserSync.stream()); //все изменения впиливаются в браузер без перезагрузки
	done();
});





//---------------------Минимизация монохромных SVG-картинок и создание спрайта---------------------------------------
//---------------------Минимизация монохромных SVG-картинок и создание спрайта---------------------------------------
gulp.task('svgSpriteBuild', function (done) {
	gulp.src('./src/media/svg-mono/**/*.svg')
		.pipe(svgmin({			// минимизируем svg
			js2svg: {
				pretty: true	// удаляет все посторонние пробелы
			},
			plugins: [{
				removeTitle: true
			}]
		}))
		.pipe(cheerio({
			run: function ($) {		// удаляет все ненужные атрибуты
				$('[fill]').removeAttr('fill');
				$('[style]').removeAttr('style');
				$('[title]').removeAttr('title');
			},
			parserOptions: { xmlMode: true }
		}))
		.pipe(replace('&gt;', '>'))	// cheerio преобразует '>' в '&gt;', заменяем.
		.pipe(gulp.dest('src/svg'));
	done();
});



//---------------------Минимизация цветных SVG-картинок---------------------------------------------------------------
//---------------------Минимизация цветных SVG-картинок---------------------------------------------------------------
gulp.task('sprite', function (done) {
	gulp.src('./src/svg/*.svg')
		.pipe(svgSprite({
				mode: "symbols",
				preview: false,
				svg: {
					symbols: './global-sprite.html'
				}
			}
		))
		.pipe(gulp.dest('src/img'));
	gulp.src('./src/svg/continents/*.svg')
		.pipe(svgSprite({
				mode: "symbols",
				preview: false,
				svg: {
					symbols: './continents-sprite.html'
				}
			}
		))
		.pipe(gulp.dest('src/img'));
	done();
});


gulp.task('html-src', function (done) {
	gulp.src('./src/html/*.html').pipe(fileinclude()).pipe(htmlbeautify({indentSize: 2, "preserve_newlines": false})).pipe(gulp.dest('./src'));
	done();
});
gulp.task('css-src', function (done) {
	gulp.src('./src/sass/**/*.css').pipe(gulp.dest('./src/css/'));
	done();
});
gulp.task('img-src', function (done) {
	gulp.src(['./src/media/*.*', './src/media/global/*.*']).pipe(gulp.dest('./src/img/'));
	gulp.src(['./src/media/webp/*.*']).pipe(gulp.dest('./src/img/webp/'));
	gulp.src(['./src/media/svg-color/**/*.*']).pipe(gulp.dest('./src/svg/'));
	done();
});



gulp.task('clear-css', function (done) {
	done();
	del(['./src/css/*.*', './src/css/global/*.*']);
});
gulp.task('clear-img', function (done) {
	del(['./src/img/*']);
	del(['./src/svg/*']);
	done();
});







gulp.task('default', gulp.series('html-src', 'css-src', 'img-src', 'svgSpriteBuild', 'sass', 'serve'));
























