const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopywebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = (_, argv) => {
    const isDevelopment = argv.mode === 'development';

    return {
        context: __dirname,
        entry: {
            app: './public/app.ts'
        },
        output: {
            filename: '[name].js',
            path: path.resolve(__dirname, 'dist'),
            publicPath: '/',
        },
        module: {
            rules: [
                {
                    test: /\.ts?$/,
                    loader: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.html$/,
                    use: 'html-loader'
                },
                {
                    test: /\.s?[ac]ss$/i,
                    use: [
                        'style-loader',
                        'css-loader',
                        'sass-loader',
                    ],
                },
                {
                    test: /\.(png|gif|jpg|jpeg|svg|xml)$/,
                    use: ['url-loader']
                },
            ]
        },
        resolve: {
            extensions: ['.ts', '.js']
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: 'public/index.html'
            }),
            new CopywebpackPlugin({
                patterns: [
                    {
                        from: 'public/static/img/*',
                        to: 'static/img/[name][ext]',
                    },
                    {
                        from: 'public/static/fonts/*',
                        to: 'static/[name][ext]',
                    },
                ],
            }),
            new webpack.DefinePlugin({
                'process.env.IS_DEVELOPMENT': isDevelopment,
            }),
        ],
        devServer: {
            static: {
                directory: path.join(__dirname, 'public'),
                watch: true,
            },
            historyApiFallback: true,
        },
    }
};
