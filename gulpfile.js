var gulp = require('gulp')
  , stylus = require('gulp-stylus')
  , compress = require('gulp-compressor')
  , concat = require('gulp-concat')
  , uglify = require('gulp-uglify')
  , shell = require('gulp-shell')
  ;

// -------------- CLIENT --------------

/**
 * Filtra os arquivos do bower e move para a pasta de distribuição.
 * @param extension: a extensão procurada. e.x: "js"; "min.js", sem o primeiro ponto
 */
function buildBowerLibs(extension) {
  gulp.src('bower_components/**/*.' + extension)
    .pipe(gulp.dest('dist/lib'));
}

// Instala as dependências e exporta para a pasta de bibliotecas na distruibuição.
gulp.task('client-libs', function() {
  buildBowerLibs('min.js');
  buildBowerLibs('min.js.map');
});

gulp.task('client-js', function() {
  gulp.src('client/js/**/*.js')
    .pipe(uglify())
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest('dist/js'));
});

// Task para a compressão dos Styles para CSS e exportá-los para a pasta de distruibuição.
gulp.task('stylus', function() {
  gulp.src('client/stylus/**/*.styl')
    .pipe(stylus())
    .pipe(compress())
    .pipe(concat('main.min.css'))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('assets', function() {
  gulp.src('client/assets/**/*.*')
    .pipe(gulp.dest('dist/assets'));
});

gulp.task('client-view', function() {
  gulp.src('client/**/*.html')
    .pipe(gulp.dest('dist'));
});

// Tarefa para fazer o build do projeto
gulp.task('build-client', ['client-libs', 'client-js', 'stylus', 'assets', 'client-view']);


// -------------- SERVER --------------

// Testa o código do servidor
gulp.task('test', shell.task([
  'clear',
  'mocha "server/**/*.js"'
]));

// Executa o comando no terminal para rodar o servidor
gulp.task('run', shell.task([
  'node app.js'
]));

// Faz o build da aplicação e em seguida roda o app node
gulp.task('serve', ['build-client', 'run']);

gulp.task('default', ['serve']);
