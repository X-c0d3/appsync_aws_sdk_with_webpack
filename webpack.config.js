var path = require('path');

module.exports = {
    entry: {
        main: './src/AppsyncLib.ts'
    },
    externals: [
        // 'library/one',
        // 'aws-appsync',
        // Everything that starts with "library/"
        /^library\/.+$/
    ],
    // context: path.resolve(__dirname, 'app'),
    output: {
        path: path.resolve(__dirname, 'bundle'),
        filename: 'appsync_lib.js',
    },
    mode: process.env.NODE_ENV || 'development',
    performance: {
        hints: process.env.NODE_ENV === 'production' ? "warning" : false
    },
    watchOptions: {
        ignored: /node_modules|dist|\.js/g,
    },
    module: {
        rules: [{
            test: /\.ts|\.tsx$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                    plugins: [
                        require('babel-plugin-transform-async-to-generator'),
                        require('babel-plugin-transform-object-rest-spread')
                    ]
                },
            },
            // include: path.resolve('./src'),
        }]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
        plugins: [],
    },
    stats: {
        colors: true
    },
    optimization: {
        minimize: false,
        sideEffects: false,
    },
    devtool: 'eval-source-map'
};