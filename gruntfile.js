var
	SERVER_PORT     = 9000,
	LIVERELOAD_PORT = 35729,
	SERVER_HOST     = 'localhost';
  
module.exports = function (grunt)
{
	require("matchdep").filterDev("grunt-*").forEach( grunt.loadNpmTasks );
	
	grunt.initConfig(
	{
		pkg: grunt.file.readJSON('package.json'),
		connect: {
			dev: {
				options: {
					hostname: SERVER_HOST,
					port: SERVER_PORT,
					open: true,
					livereload: LIVERELOAD_PORT,
					//keepalive: true,
					base: {
						path: './src',
						options: {
							index: 'index.html',
							maxAge: 300000
						}
					}
				}
			}
		},
		copy: {
			dev: {
				files : []				
			}
		},
		clean : {
			dev : {
				src : [  ]
			}
		},
		watch: {
			dev: {
				files : [ './src/**/**' ],
				tasks: [],
				options: {
					livereload: {
						host: SERVER_HOST
					},
					nospawn: false
				}
			}
		}
	});
	
	/*grunt.event.on('watch', function(action, filepath, target) 
	{
		var dest = require( 'path' ).join( './dist', filepath.replace( /app[\/\\]+/, "" ) );
		
		if( action === "changed" && target === "dev" )
		{
			grunt.file.copy( filepath, dest );
			grunt.log.writeln( ">> "+filepath+" has been copied to "+dest );
		}
	});*/
	
	grunt.registerTask( 'default', [ 'connect:dev', 'watch:dev' ] );
};