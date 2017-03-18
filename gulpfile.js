const gulp = require('gulp');
const jade = require('gulp-jade');
const jadeInheritance = require('gulp-jade-inheritance');
const stylus = require('gulp-stylus');
const koutoSwiss = require( "kouto-swiss" );
const autoprefixer = require('gulp-autoprefixer');
const del = require('del');
const sourcemaps = require('gulp-sourcemaps');
const webserver = require('gulp-webserver');
const changed = require('gulp-changed');
const plumber = require('gulp-plumber');


gulp.task('default',['jade','stylus'], function() {
  console.log("default gulp running~");
});

gulp.task('webserver', function() {
  gulp.src('./build/')
    .pipe(webserver({
      port:1234,
      livereload: true,
      directoryListing: false,
      open: true,
      fallback: './test/test.html'
    }));
});

gulp.task('jade', function(){
  return gulp.src('./dev/**/*.jade')
    //only pass changed *main* files and *all* the partials
    .pipe(changed('./build/', {extension: '.html'}))

    //find files that depend on the files that have changed 
    .pipe(jadeInheritance({basedir: './dev/'}))

    //process jade templates
    .pipe(jade({
      //pretty: true
    }))

    .on('error', handleError)

    //save all the files
    .pipe(gulp.dest('./build/'))
});

gulp.task('stylus', function () {
  return gulp.src('./dev/**/*.styl')
    .pipe(sourcemaps.init())

    //only pass changed *main* files and *all* the partials
    .pipe(changed('./build/', {extension: '.css'}))

    .pipe(stylus({
            "use": koutoSwiss(),
            //compress: true
            //是否在CSS中保留註解
            //linenos: true
          }))
    .on('error', handleError)
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./build'));
});

gulp.task('clean:build', function(){
    return del('./build/**', {force:true}).then(paths => {
      console.log('Files and folders that would be deleted:\n', paths.join('\n'));
    });;
});

gulp.task('watch', function() {
    gulp.watch('public/javascripts/*js', ['scripts']);
});

function handleError(err) {
    console.log(err.toString());
    this.emit('end');
}

/*see how to use glob https://amobiz.github.io/2015/11/14/gulp-glob/ */
/*gulp-jade-inheritance https://www.npmjs.com/package/gulp-jade-inheritance */