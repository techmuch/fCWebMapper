// Node modules
var fs = require('fs'), vm = require('vm'), merge = require('deeply'), chalk = require('chalk'), es = require('event-stream');

// Gulp and plugins
var gulp = require('gulp'), rjs = require('gulp-requirejs-bundler'), concat = require('gulp-concat'), clean = require('gulp-clean'),
    replace = require('gulp-replace'), uglify = require('gulp-uglify'), htmlreplace = require('gulp-html-replace');

// Config
var requireJsRuntimeConfig = vm.runInNewContext(fs.readFileSync('src/app/require.config.js') + '; require;');
var strIncludes = fs.readFileSync('src/app/startup.js').toString();
    
    strIncludes = strIncludes.replace(/^\s*\/\/.*\n/gm, '===');
    //console.log(strIncludes);
    arrIncludes = strIncludes.match(/'((?:\w|-)+\/(?:\w|-)+)+'/gm);
    for (var i = 0; i < arrIncludes.length; i++) {
        arrIncludes[i] = arrIncludes[i].replace(/'/g,"");
    };
    //console.log(arrIncludes);
    requireJsOptimizerConfig = merge(requireJsRuntimeConfig, {
        out: 'scripts.js',
        baseUrl: './src',
        name: 'app/startup',
        paths: {
            requireLib: 'bower_modules/requirejs/require'
        },
        include: ['requireLib'].concat(arrIncludes),
        insertRequire: ['app/startup'],
        bundles: {
            // If you want parts of the site to load on demand, remove them from the 'include' list
            // above, and group them into bundles here.
            // 'bundle-name': [ 'some/module', 'another/module' ],
            // 'another-bundle-name': [ 'yet-another-module' ]
        }
    });

// Discovers all AMD dependencies, concatenates together all required .js files, minifies them
gulp.task('js', function () {
    return rjs(requireJsOptimizerConfig)
        .pipe(uglify({ preserveComments: 'some' }))
        .pipe(gulp.dest('./dist/'));
});

// Concatenates CSS files, rewrites relative paths to Bootstrap fonts, copies Bootstrap fonts
gulp.task('css', function () {
    var bowerCss = gulp.src('src/bower_modules/components-bootstrap/css/bootstrap.min.css')
            .pipe(replace(/url\((')?\.\.\/fonts\//g, 'url($1fonts/')),
        appCss = gulp.src('src/css/*.css'),
        combinedCss = es.concat(bowerCss, appCss).pipe(concat('css.css')),
        fontFiles = gulp.src('./src/bower_modules/components-bootstrap/fonts/*', { base: './src/bower_modules/components-bootstrap/' });
    return es.concat(combinedCss, fontFiles)
        .pipe(gulp.dest('./dist/'));
});

// Copies index.html, replacing <script> and <link> tags to reference production URLs
gulp.task('html', function() {
    return gulp.src('./src/index.html')
        .pipe(htmlreplace({
            'css': 'css.css',
            'js': 'scripts.js'
        }))
        .pipe(gulp.dest('./dist/'));
});

// Removes all files from ./dist/
gulp.task('clean', function() {
    return gulp.src('./dist/**/*', { read: false })
        .pipe(clean());
});


gulp.task('default', ['html', 'js', 'css'], function(callback) {
    callback();
    console.log('\nPlaced optimized files in ' + chalk.magenta('dist/\n'));
});

gulp.task('build', ['default'], function(){
    console.log('\nStarting node-webkit app compilation using files from ' + chalk.magenta('dist/\n'));

    var getPackageJson = function () {
        return JSON.parse(fs.readFileSync('./src/package.json', 'utf8'));
    };
    var getCurrentVersion = function () {
      return JSON.parse(fs.readFileSync('./package.json', 'utf8')).version;
    };
    var setPackageJson = function (config) {
      return fs.writeFileSync('./dist/package.json', JSON.stringify(config), 'utf8');
    };

    var pkg = getPackageJson()
    pkg.version = getCurrentVersion()
    setPackageJson(pkg)

    var NwBuilder = require('node-webkit-builder');
    var nw = new NwBuilder({
        files: './dist/**/**', // use the glob format
        //platforms: ['win32', 'win64', 'osx32', 'osx64', 'linux32', 'linux64']
        platforms: ['win32', 'win64'],
        buildDir: './build'
    });

    //Log stuff you want

    nw.on('log',  console.log);

    // Build returns a promise
    nw.build().then(function () {
        console.log('\nPlaced build files in ' + chalk.cyan('build/\n'));
        console.log(chalk.green('all done!'));
    }).catch(function (error) {
        console.error(chalk.red(error));
    });
});

gulp.task('push', ['default'], function(){
    
    var getManifestJson = function () {
        return JSON.parse(fs.readFileSync('./src/manifest.json', 'utf8'));
    };
    var getCurrentVersion = function () {
      return JSON.parse(fs.readFileSync('./package.json', 'utf8')).version;
    };
    var setManifestJson = function (config) {
      return fs.writeFileSync('./dist/manifest.json', JSON.stringify(config), 'utf8');
    };

    var man = getManifestJson()
    man.version = getCurrentVersion()
    setManifestJson(man)

    var releasePath = function(man){
        var host = 'https://huddle2.asdl.ae.gatech.edu'
        return host + '/data/' + man.project_id + '/apps/' + man.app_folder
    }

    var path = releasePath(man);

    console.log('\nPulling files from ' + chalk.magenta('dist/\n'));

    var options = {
        local_base: "./dist",
        remote_base: path
    };
    var sync = (require('webdav-sync'))(options);

    console.log('\nPushing files to ' + chalk.magenta('path\n'));
    sync.start();
});