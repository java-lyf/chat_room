module.exports = {
    transpileDependencies: [
      /\bvue-awesome\b/
    ],
    devServer: {
      //host: "192.168.0.222",
      port: 3000, // 端口号
      https: false,
      open: true //配置自动启动浏览器
    }
  }