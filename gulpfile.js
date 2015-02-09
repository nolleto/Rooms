var gulp = require('gulp')
  , bower = require('gulp-bower')
  , stylus = require('gulp-stylus')
  , shell = require('gulp-shell')
  ;

// Instala as dependências e exporta para a pasta de bibliotecas na distruibuição.
gulp.task('bower', function() {
  return bower('client/bower_components')
    .pipe(gulp.dest('client/dest/lib'))
});

// Task para a compressão dos Styules para CSS e exportá-los para a pasta de distruibuição.
gulp.task('compress-stylus', function() {
  gulp.src('client/stylus/main.styl')
    .pipe(stylus())
    .pipe(gulp.dest('client/dest/css'))
});

// Tarefa para fazer o build do projeto
gulp.task('build', ['bower', 'compress-stylus']);

// Executa o comando no terminal para rodar o servidor
gulp.task('run', shell.task([
  'node app.js'
]));

// Faz o build da aplicação e em seguida roda o app node
gulp.task('serve', ['build', 'run'])

gulp.task('default', ['build']);
