const config = {
  entry: {
    main: [
      './src/index.js'
    ]
  },
  output: {
    filename: './dist/index.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      loader: 'babel-loader'
    }]
  }
}

module.exports = config
