const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
var resolve = (dir) =>{
  return path.join(__dirname,'..',dir);
}

module.exports = {
  resolve:{
    alias:{
      '@':resolve('src'),
    }
  },
  entry:{
      index:'./src/index.js',
      test:'./src/test.js',
  },
  output:{
    filename:'[name].bundle.js',
    path:path.resolve(__dirname,'../dist')
  },
  module:{
    rules:[
      {
        test:/\.js$/,
        loader:'babel-loader'
      },{
        test:/\.css$/,
        use:[
          'style-loader',
          'css-loader'
        ]
      },{
        test:/\.(png|svg|jpg|gif)$/,
        use:[
          'file-loader'
        ],
        // loader:'url-loader',
        // options:{
        //   limit:10000,
        //   name:path.resolve(__dirname,'../dist/static/img/[name].[hash:7].[ext]')
        // }
      }
    ]
  },
  plugins:[
    //引入html,将html复制到dist，并且将js注入
    new HtmlWebpackPlugin({
      filename:path.resolve(__dirname,'../dist/index.html'),
      template:'index.html',
      inject:true, //是否将js注入到html中
      chunks:["index"]
    }),
    new HtmlWebpackPlugin({
      filename:path.resolve(__dirname,'../dist/test.html'),
      template:'test.html',
      inject:true, //是否将js注入到html中
      chunks:["test"],//注入到html的js
      minify:{          //html压缩选项
        removeComments:true,   //去掉注释
        collapseWhitespace:true,
        removeAttributeQuotes:true
      },
      chunksSortMode:'dependency'
    }),
    // new ExtractTextPlugin({
    //   filename:path.resolve(__dirname,'../dist/static/css/[name].[contenthash].css'),
    //   alllChunks:true
    // }),
  ]
}
