var gulp = require('gulp'),
    nodemon = require('gulp-nodemon')
    env = require('gulp-env');

gulp.task('default',function(){
    nodemon({
        script: 'server.js',
        ext: 'js',
        env:{
            PORT: 8000,
            DB: 'mongodb://admin:admin123@ds151453.mlab.com:51453/rappeler',
            CLOUDAMQP_URL: 'amqp://acahnwtj:uBFYdqU9jWinUF41upLBa7w8Yg51tTYB@mustang.rmq.cloudamqp.com/acahnwtj'
        },
        ignore: ['./node_modules/**']
    })
    .on('restart',function(){
        console.log('Restarting ...'); 
    })
});
