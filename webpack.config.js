const {EnvironmentPlugin} = require('webpack');
const {
    WranglerJsCompatWebpackPlugin,
  } = require("wranglerjs-compat-webpack-plugin");

module.exports = env => {
    return {
        target: "webworker",
        devtool: "cheap-module-source-map",
        entry: './index.js',
        mode: "development",
        plugins: [
            new EnvironmentPlugin({
                SOMETHING_ELSE: 'dsjadjisad'
            }),
            // new WranglerJsCompatWebpackPlugin()
        ]
    }
}