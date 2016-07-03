const path = require('path');
const webpack = require('webpack');
const webpackTargetElectronRenderer = require('webpack-target-electron-renderer');

let options = {
    entry: {
        main: path.resolve(__dirname, 'src/entry.jsx')
        // vendors: ['react', 'react-dom', 'react-router', 'material-ui', 'react-tap-event-plugin', 'react-flexbox-grid']
    },
    output: {
        path: __dirname + '/app',
        filename: 'bundle.js'
    },
    target: 'electron',
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loaders: ['babel-loader'],
                exclude: /node_modules/,
                include: path.join(__dirname, 'src')
            },
            {
                test: /\.scss$/,
                loaders: ["style", "css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]", "sass?sourceMap"]
            },
            {
                test: /\.css$/,
                loaders: ['style', 'css?modules'],
                include: /flexboxgrid/,
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": { 
                NODE_ENV: JSON.stringify("production") 
            }
        })
        // new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js', Infinity)
    ]
};

options.target = webpackTargetElectronRenderer(options);

module.exports = options;
