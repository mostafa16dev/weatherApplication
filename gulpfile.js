var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var ngAnnotate = require('gulp-ng-annotate-plus');
var uglifycss = require('gulp-uglifycss');


//script paths
var jsDest = 'app/dist/scripts',
    cssDest = 'app/dist/css';



//16 files
var usedJSFiles = [
    'app/assets/jquery.min.js',
    'app/assets/bootstrap.min.js',
    'app/bower_components/angular/angular.js',
    'app/bower_components/angular-route/angular-route.js',
    'app/bower_components/ngGeolocation/ngGeolocation.min.js',
    'app/bower_components/angular-ui-notification/dist/angular-ui-notification.min.js',
    'app/bower_components/chart.js/dist/Chart.min.js',
    'app/bower_components/angular-chart.js/dist/angular-chart.min.js',
    'app/app.js',
    'app/services.js',
    'app/home/home.js',
    'app/navbar/navbar.js',
    'app/dashboard/dashboard.js',
    'app/components/version/version.js',
    'app/components/version/version-directive.js',
    'app/components/version/interpolate-filter.js'
];

//6 files
var usedCSSFiles = [
    'app/bower_components/html5-boilerplate/dist/css/normalize.css',
    'app/bower_components/html5-boilerplate/dist/css/main.css',
    'app/bower_components/angular-ui-notification/dist/angular-ui-notification.min.css',
    'app/app.css',
    'app/css/bootstrap.min.css',
    'app/css/styles.css'
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
