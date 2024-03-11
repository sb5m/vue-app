const { defineConfig } = require('@vue/cli-service')
// module.exports = {
//   publicPath: process.env.NODE_ENV === 'production'
//     ? '/vue-app/'
//     : '/'
// }

module.exports = defineConfig({transpileDependencies: true,publicPath: '/vue-app/'})