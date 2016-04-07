'use strict';

const gulp = require('gulp');
const jsdoc = require('gulp-jsdoc3');

gulp.task('docs',() => {
   return gulp.src(['./filters/*.js','./sorting/*.js','./routes/*.js','./controllers/*.js','./lib/*.js','./prototypes/*.js','./*.js'])
    .pipe(jsdoc('./docs'));
});

gulp.task('default',['docs']);