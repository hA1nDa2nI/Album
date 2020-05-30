const webpack = require('webpack')

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views'
      },
      extensions: ['.js', '.vue', '.json']
    },
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery"
      })
    ]
  },
  devServer: {
    open: true, //是否自动弹出浏览器页面
    host: "localhost", 
    port: '8080',
    https: false,
    hotOnly: false, 
    proxy: {
      '/api': {
        target: 'http://localhost:3000', //API服务器的地址
        ws: true,  //代理websockets
        changeOrigin: true, // 虚拟的站点需要更管origin
        pathRewrite: {   //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
          '^/api': ''
        }
      }
    }
  },
  publicPath: './',//打包后的位置(如果不设置这个静态资源会报404)
  outputDir: 'dist',//打包后的目录名称
  assetsDir: 'static'//静态资源目录名称
}
