/**
 * Created by vdeapps
 */

// Include plugins
var plugins = require('gulp-load-plugins')(); // tous les plugins de package.json
var gulp = require('gulp');
var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");
var concat = require("gulp-concat");

const autoprefixer = require('gulp-autoprefixer');

/**
 * *********************************** APP ****************************
 */
/*
 Regroupe les JS externes
 */
gulp.task('js', function () {
    return gulp.src([
        'src/**/*.js'
    ])
        .pipe(plugins.concat('vdeapps-scan-interval.js'))
        .pipe(babel())
        .pipe(gulp.dest('dist/js')); //Destination
});

gulp.task('css', function () {
    return gulp.src([
        'src/**/*.?css',
    ])
        .pipe(plugins.sass()) //Compilation des SASS
        .pipe(plugins.csscomb())  // Réordonne les déclarations
        .pipe(autoprefixer({
            browsers: ['last 5 versions']
        })) //prefix des browsers
        .pipe(plugins.concatCss("vdeapps-scan-interval.css"))
        .pipe(gulp.dest('dist/css')); //Destination
});

gulp.task('minify', function () {
	return gulp.src([
        'dist/js/*.js'
    ])
        .pipe(plugins.concat('vdeapps-scan-interval.min.js'))
        .pipe(plugins.uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('clean', function () {
    return gulp.src([
        'dist/*',
    ])
    .pipe(plugins.clean());
});

// Tâche "watch" = je surveille les fichiers
gulp.task('watch', function () {
    gulp.watch(['src/**/*.?css'], ['css']);
    gulp.watch(['src/**/*.js'], ['js']);
});

/**
 * *********************************** BUILD ****************************
 */
// Tache vendors //JS + CSS
gulp.task('dev', ['js', 'css']);

// Tâche "build" //Nos CSS/JS
gulp.task('prod', ['clean', 'dev', 'minify']);

// Tâche par défaut
gulp.task('default', ['dev']);

