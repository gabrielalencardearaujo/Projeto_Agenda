const path = require('path'); //CommonJS <- NodeJS usa esse sistema de modules para lidar com arquivos

module.exports = {
  mode: 'production', // Usado para mimificar o codigo, pois nao sera necessario ser legivel. Pode ser usado no mode development
  entry: './frontend/main.js',
  output: {
    path: path.resolve(__dirname, 'public', 'assets', 'js'), //Pasta que sera criado o arquivo bundle.js
    filename: 'bundle.js' //Nome do arquivo bundle.
  },
  module: {
    rules: [{
      exclude: /node_modules/, //Pede ao webpack nao analisar a pasta node_modules
      test: /\.js$/, //Indica ao webpack que o arquivo que deve analisar tem extensao .js
      use: {
        loader: 'babel-loader', //Para utilizar o babel
        options: {
          presets: ['@babel/env']
        }
      }
    }, 
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }]
  },
  devtool: 'source-map' //Mapeamento do bundle. Necessario para debug.
}