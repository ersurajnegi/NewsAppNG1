var gulp = require('gulp');
var concat = require('gulp-concat');
var jsmin = require('gulp-jsmin');
var rename = require('gulp-rename');
var browserSync = require('browser-sync');
var templateCache = require('gulp-angular-templatecache');
 
gulp.task('templates', function () {
  return gulp.src('./src/templates/*.html')
    .pipe(templateCache('templates.js',{
      module : 'newsApp'
    }))
    .pipe(gulp.dest('dist'));
});

// Static server.
gulp.task('server',['minify'], function() {  
  browserSync({
    server: {
      baseDir: './'
    }
  });

  gulp.watch(['app.js','./src/**/*.js','./src/*/*.html','index.html'], ['js-watch']);
});

gulp.task('js-watch', ['minify'], function (done) {
    browserSync.reload();
    done();
});



gulp.task('js', function() {
    console.log("scripts task started");
  return gulp.src(['app.js','./src/**/*.js'])
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./build/'));
    
});

gulp.task('minify',['js'], function () {
    console.log("minify task started");
    return gulp.src('./build/*.js')
        .pipe(jsmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist'));
        
});

gulp.task('run',['server']);