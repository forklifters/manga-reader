const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const MODE = process.env.NODE_ENV || 'development';
const DEV = MODE === 'development';

const copyRules = [
    {
        from: __dirname + '/src/index.html',
        to: __dirname + '/dist/index.html',
    },
    {
        from: __dirname + '/src/assets',
        to: __dirname + '/dist',
    },
];

module.exports = {
    mode: MODE,
    devtool: DEV ? 'inline-source-map' : 'source-map',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    devServer: {
        historyApiFallback: true,
    },
    output: {
        globalObject: 'self',
        filename: '[name].js',
        chunkFilename: '[name].[id].[contenthash].js',
    },
    optimization: {
        minimize: !DEV,
        minimizer: DEV ? [] : [new TerserPlugin()],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                    },
                ],
            },
            {
                test: /\.css$/,
                use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
            },
            {
                test: /\.(ttf|eot|svg)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: 'fonts/[hash].[ext]',
                    },
                },
            },
            {
                test: /\.(woff|woff2)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: 'fonts/[hash].[ext]',
                        limit: 5000,
                        mimetype: 'application/font-woff',
                    },
                },
            },
        ],
    },
    plugins: [new CopyPlugin(copyRules)],
};
