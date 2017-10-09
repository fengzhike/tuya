var gulp = require('gulp'),
connect = require('gulp-connect')

gulp.task('default',function(){
	connect.server({
		port:9999
	/*

        root:'./',  
        ip:'192.168.31.110',*/
        // livereload:true
    })
})