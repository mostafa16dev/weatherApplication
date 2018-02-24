var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var ngAnnotate = require('gulp-ng-annotate-plus');
var uglifycss = require('gulp-uglifycss');


//script paths
var jsDest = 'myDist/scripts',
    cssDest = 'myDist/css';



//16 files
var usedJSFiles = [
    'assets/jquery.min.js',
    'assets/bootstrap.min.js',
    'bower_components/angular/angular.js',
    'bower_components/angular-route/angular-route.js',
    'bower_components/ngGeolocation/ngGeolocation.min.js',
    'bower_components/angular-ui-notification/dist/angular-ui-notification.min.js',
    'bower_components/chart.js/dist/Chart.min.js',
    'bower_components/angular-chart.js/dist/angular-chart.min.js',
    'app.js',
    'services.js',
    'home/home.js',
    'navbar/navbar.js',
    'dashboard/dashboard.js',
    'components/version/version.js',
    'components/version/version-directive.js',
    'components/version/interpolate-filter.js'
];

//6 files
var usedCSSFiles = [
    'bower_components/html5-boilerplate/dist/css/normalize.css',
    'bower_components/html5-boilerplate/dist/css/main.css',
    'bower_components/angular-ui-notification/dist/angular-ui-notification.min.css',
    'app.css',
    'css/bootstrap.min.css',
    'css/styles.css'
];

//I just use this for everthing for the css files
gulp.task('css', function () {
  gulp.src(usedCSSFiles)
  .pipe(concat('styles.css'))
  .pipe(gulp.dest(cssDest))
  .pipe(rename('styles.min.css'))
  .pipe(uglifycss({
    "uglyComments": true
  }))
  .pipe(gulp.dest(cssDest));
});

//I just use this for everthing for the js files
gulp.task('scripts', function() {
  return gulp.src(usedJSFiles)
      .pipe(ngAnnotate())
      .pipe(concat('scripts.js'))
      .pipe(gulp.dest(jsDest))
      .pipe(rename('scripts.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest(jsDest));
});


gulp.task('default',['css', 'scripts']);
