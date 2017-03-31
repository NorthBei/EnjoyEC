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
const filter = require('gulp-filter');
const progeny = require('gulp-progeny');
const gutil = require("gulp-util");

const webpack = require("webpack");
const webpackConfig = require("./webpack.config.js");

var workingFolder = "limited_on_sale_entry";
//var workingFolder = "home";

gulp.task('default',['jade','stylus'], function() {
  console.log("default gulp running~");
});

gulp.task('initEnv',['webserver','watch','default','webpack'], function() {
  console.log("gulp init environment~");
});

gulp.task('webserver', function() {
  gulp.src('./build/')
    .pipe(webserver({
      port:2234,
      livereload: true,
      directoryListing: false,
      open: true,
      //fallback: './index.html'
    }));
});

gulp.task('jade', function(){
  return gulp.src('./dev/**/*.jade')
    //only pass changed *main* files and *all* the partials
    .pipe(changed('./build/', {extension: '.html'}))

    //find files that depend on the files that have changed 
    .pipe(jadeInheritance({basedir: './dev/'}))
    .pipe(plumber())
    .on('error', handleError)

    //filter out partials (folders and files starting with "_" ) 
    .pipe(filter(function (file) {
        return !/\/_/.test(file.path) && !/^_/.test(file.relative);
    }))

    //process jade templates
    .pipe(jade({
      //pretty: true
    }))

    .on('error', handleError)

    //save all the files
    .pipe(gulp.dest('./build/'))
});

gulp.task('stylus',['clean:css'], function () {
  return gulp.src('./dev/**/*.styl')
    .pipe(sourcemaps.init())

    //only pass changed *main* files and *all* the partials
    .pipe(changed('./build/', {extension: '.css'}))

    .pipe(progeny())

    //filter out partials (folders and files starting with "_" ) 
    .pipe(filter(function (file) {
        return !/\/_/.test(file.path) && !/^_/.test(file.relative);
    }))

    .pipe(stylus({
            "use": koutoSwiss(),
            // compress: true
            //是否在CSS中保留註解
            //linenos: true
    }).on('error', handleError))

    .on('error', handleError)
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./build'));
});

gulp.task('clean:css', function(){
    var deletedPath = del.sync(['./build/**/*.css','!build/**']);
    //return del.sync(['./build/**/all.css','!build/**']);
    console.log('Files and folders that would be deleted:\n', deletedPath.join('\n'));
    // Return the promise that del produces.
    return deletedPath;

    // del(['tmp/*.js', '!tmp/unicorn.js']).then(paths => {
    // console.log('Deleted files and folders:\n', paths.join('\n'));
    // });
});
/* del with pipe https://www.npmjs.com/package/vinyl-paths*/

gulp.task('watch', function() {
  gulp.watch('./dev/**/*.jade', ['jade'], {initialRun: false});
  gulp.watch('./dev/**/*.styl', ['stylus'], {initialRun: false});
  gulp.watch('./dev/**/*.js', ['webpack'], {initialRun: false});
  //gulp.watch('public/javascripts/*js', ['scripts']);
});

gulp.task("webpack", function(callback) {
  // run webpack
  webpack(webpackConfig, function(err, stats) {
    if(err) throw new gutil.PluginError("webpack", err);
    gutil.log("[webpack]", stats.toString({
      // output options
      colors: true,
      children: false,
      chunks: false
    }));
    callback();
  });
});

//or use it https://www.npmjs.com/package/gulp-webpack

function handleError(err) {
    console.log(err.toString());
    this.emit('end');
}

/*see how to use glob https://amobiz.github.io/2015/11/14/gulp-glob/ */
/*gulp-jade-inheritance https://www.npmjs.com/package/gulp-jade-inheritance */
/* important stylus framework for dev usage with gulp example https://www.npmjs.com/package/fa-stylus */
/* now use this font-awesome with stylus https://www.npmjs.com/package/font-awesome-stylus */