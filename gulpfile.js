var gulp = require('gulp')
    , nodemon = require('gulp-nodemon')
    , gulpMocha = require("gulp-mocha")
    , env = require("gulp-env")
    , supertest = require("supertest")
    ;

gulp.task('default', function () {
    nodemon({
        script: 'app.js',
        ext: 'js',
        env: {
            PORT: 8000
        },
        ignore: ['./node_modules/**']
    }).on('restart', function () {
        console.log('REstarting');
    });

});

gulp.task("test", function () {
    env({ vars: { ENV: "Test" } });
    gulp.src("Tests/*.js", { read: false })
        .pipe(gulpMocha({ reporter: "nyan" }));
});

