'use strict';

const gulp = require('gulp');
const jsdoc = require('gulp-jsdoc3');

gulp.task('docs',() => {
   const config = {
       opts:{
           destination:"./public/docs"
       }
   };

   return gulp.src(['./filters/*.js','./sorting/*.js','./routes/*.js','./controllers/*.js','./lib/*.js','./prototypes/*.js','./*.js'])
    .pipe(jsdoc(config));
});

gulp.task('default',['docs']);