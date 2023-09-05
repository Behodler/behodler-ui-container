// const rewireReactHotLoader = require('react-app-rewire-hot-loader')
const rewirePostCss = require('react-app-rewire-postcss')

module.exports = function override (config, env) {
  config = rewirePostCss(config, true)

    // Add a rule to handle .mjs files
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: 'javascript/auto'
    });
    
  return config
}
