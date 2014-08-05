var gulp = require('gulp');
var concat = require('gulp-concat');
var minifyJS = require('gulp-uglify');
var minifyHTML = require('gulp-htmlmin');

gulp.task('js', function(){
  //Gerar javascript das libs (angular, bootstrap e etc)
  gulp.src([
    'app/bower_components/jquery/dist/jquery.min.js',
    'app/bower_components/bootstrap/dist/js/bootstrap.min.js',
    'app/bower_components/angular/angular.min.js',
    'app/bower_components/angular-route/angular-route.min.js',
    'app/bower_components/angular-resource/angular-resource.min.js'
    ])
  .pipe(concat('libs.min.js'))
  .pipe(minifyJS())
  .pipe(gulp.dest('app/js'))
})

gulp.task('css', function(){
  //Gerar CSS
  gulp.src([
    'app/bower_components/bootstrap/dist/css/bootstrap.min.css'
    ])
  .pipe(concat('css.min.css'))
  .pipe(gulp.dest('app/css'))
})

gulp.task('fonts', function(){
  //Gerar fonts
  gulp.src([
    'app/bower_components/bootstrap/dist/fonts/**'
    ])
  .pipe(gulp.dest('app/fonts'))
})

gulp.task('app', function(){
  //Gerar javascript do app
  // gulp.src([
  //   'app/app.js',
  //   'app/controllers/**'
  //   ])
  gulp.src([
    'app/modules/core.js',
    'app/modules/services.js',
    'app/modules/controllers.js',
    'app/modules/directives.js',
    'app/modules/custom/**'
    ])
  .pipe(concat('app.min.js'))
  .pipe(minifyJS())
  .pipe(gulp.dest('app/js'))
})

gulp.task('html', function(){
  //Gerar HTML
  var options = {collapseWhitespace: true, minifyJS: true};

  gulp.src([
    'app/views/index.html'
    ])
  .pipe(minifyHTML(options))
  .pipe(gulp.dest('app/'))

  gulp.src([
    'app/views/*.html'
    ])
  .pipe(minifyHTML(options))
  .pipe(gulp.dest('app/views/min'))
})

gulp.task('build', ['js', 'css', 'fonts', 'html', 'app']);

gulp.task('watch', function(){
  gulp.watch('app/modules/**', ['build']);
})