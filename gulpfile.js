'use strict';

const gulp = require('gulp');
const jsdoc = require('gulp-jsdoc3');

gulp.task('docs',() => {
   //return gulp.src(['controllers/*.js','envs/*.js','filters/*.js','lib/*.js','prototypes/*.js','routes/*.js','sorting/*.js','tests/*.js'])
   return gulp.src(['./filters/*.js','./sorting/*.js','./routes/*.js','./controllers/*.js'])
    .pipe(jsdoc('./docs'));
});

gulp.task('default',['docs']);