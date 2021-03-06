const path = require('path');
const paths = require('./config/paths');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const getClientEnvironment = require('./config/env');
const eslintFormatter = require('react-dev-utils/eslintFormatter');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const webpack = require('webpack');
const publicUrl = '';
const env = getClientEnvironment(publicUrl);

const outputDirectory = 'dist';
process.env.NODE_ENV = 'development';
process.env.BABEL_ENV = 'development';
module.exports = {

    target: 'web',
    entry: ['babel-polyfill', './src/client/index.js',require.resolve('react-dev-utils/webpackHotDevClient')],
    output: {
        // Next line is not used in dev but WebpackDevServer crashes without it:
        path: path.join(__dirname, outputDirectory),
        // Add /* filename */ comments to generated require()s in the output.
        //pathinfo: true,
        // This does not produce a real file. It's just the virtual path that is
        // served by WebpackDevServer in development. This is the JS bundle
        // containing code from all our entry points, and the Webpack runtime.
        filename: 'bundle.js',
        publicPath: '/',
        // There are also additional JS chunk files if you use code splitting.
        //chunkFilename: 'static/js/[name].chunk.js',
        // Point sourcemap entries to original disk location (format as URL on Windows)
        devtoolModuleFilenameTemplate: info => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            enforce: 'pre',
            use: [
                {
                    options: {
                        formatter: eslintFormatter,
                        eslintPath: require.resolve('eslint'),

                    },
                    loader: require.resolve('eslint-loader'),
                },
            ],
            include: paths.appSrc,
        },
            {
                // "oneOf" will traverse all following loaders until one will
                // match the requirements. When no loader matches it will fall
                // back to the "file" loader at the end of the loader list.
                oneOf: [
                    // "url" loader works like "file" loader except that it embeds assets
                    // smaller than specified limit in bytes as data URLs to avoid requests.
                    // A missing `test` is equivalent to a match.
                    {
                        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                        loader: require.resolve('url-loader'),
                        options: {
                            limit: 10000,
                            name: 'static/media/[name].[hash:8].[ext]',
                        },
                    },
                    // Process JS with Babel.
                    {
                        test: /\.(js|jsx)$/,
                        include: paths.appSrc,
                        loader: require.resolve('babel-loader'),
                        options: {

                            // This is a feature of `babel-loader` for webpack (not Babel itself).
                            // It enables caching results in ./node_modules/.cache/babel-loader/
                            // directory for faster rebuilds.
                            cacheDirectory: true,
                        },
                    },
                    // "postcss" loader applies autoprefixer to our CSS.
                    // "css" loader resolves paths in CSS and adds assets as dependencies.
                    // "style" loader turns CSS into JS modules that inject <style> tags.
                    // In production, we use a plugin to extract that CSS to a file, but
                    // in development "style" loader enables hot editing of CSS.
                    {
                        test: /\.css$/,
                        use: [
                            require.resolve('style-loader'),
                            {
                                loader: require.resolve('css-loader'),
                                options: {
                                    importLoaders: 1,
                                },
                            },
                            {
                                loader: require.resolve('postcss-loader'),
                                options: {
                                    // Necessary for external CSS imports to work
                                    // https://github.com/facebookincubator/create-react-app/issues/2677
                                    ident: 'postcss',
                                    plugins: () => [
                                        require('postcss-flexbugs-fixes'),
                                        autoprefixer({
                                            browsers: [
                                                '>1%',
                                                'last 4 versions',
                                                'Firefox ESR',
                                                'not ie < 9', // React doesn't support IE8 anyway
                                            ],
                                            flexbox: 'no-2009',
                                        }),
                                    ],
                                },
                            },
                        ],
                    },
                    {
                        test: /\.js$/,
                        include: [
                            /\/mongoose\//i,
                            /\/kareem\//i
                        ],
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015']
                        }
                    },
                    {
                        test: /\.scss$/,
                        include: [paths.appSrc, paths.appNodeModules],
                        use: [
                            {
                                loader: require.resolve('style-loader'),
                                options: {
                                    sourceMap: true
                                }
                            },
                            {
                                loader: require.resolve('css-loader'),
                            },
                            require.resolve('resolve-url-loader'),
                            {
                                loader: require.resolve('sass-loader'),
                                options: {
                                    sourceMap: true
                                }
                            }
                        ]
                    },
                    // "file" loader makes sure those assets get served by WebpackDevServer.
                    // When you `import` an asset, you get its (virtual) filename.
                    // In production, they would get copied to the `build` folder.
                    // This loader don't uses a "test" so it will catch all modules
                    // that fall through the other loaders.
                    {
                        // Exclude `js` files to keep "css" loader working as it injects
                        // it's runtime that would otherwise processed through "file" loader.
                        // Also exclude `html` and `json` extensions so they get processed
                        // by webpacks internal loaders.
                        exclude: [/\.js$/, /\.html$/, /\.json$/],
                        loader: require.resolve('file-loader'),
                        options: {
                            name: 'static/media/[name].[hash:8].[ext]',
                        },
                    },

                ],
            },
        ]
    },
    resolve: {
        modules: ['node_modules', paths.appNodeModules].concat(
            // It is guaranteed to exist because we tweak it in `env.js`
            process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
        ),
        extensions: ['.web.js', '.js', '.json', '.web.jsx', '.jsx'],
        alias: {
            'react-native': 'react-native-web',
            widgets: path.resolve('src/client/widgets')
        },
        plugins: [
            new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson]),
        ],
    },
    devServer: {
        port: 3000,
        //overlay:true,
        open: true,
        contentBase: paths.appPublic,
       // contentBase: {target: 'http://localhost:3000'},
       //contentBase: path.join(__dirname, outputDirectory),
       historyApiFallback: true,
        //hot: true,
       proxy: {
           '/api': 'http://localhost:8080'
       }
    },
    plugins: [
       new CleanWebpackPlugin({
            cleanAfterEveryBuildPatterns: [outputDirectory]
        }),
        new HtmlWebpackPlugin({
            inject: true,
            template: paths.appHtml,
            favicon:  path.join(paths.appPublic, "favicon.ico"),
        }),
        new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw),
        new CaseSensitivePathsPlugin(),
        new ManifestPlugin()
        //new webpack.HotModuleReplacementPlugin(),
    ],
    node: {
        dgram: 'empty',
        dns: 'empty',
        fs: 'empty',
        module: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty',

    },
    // Turn off performance hints during development because we don't do any
    // splitting or minification in interest of speed. These warnings become
    // cumbersome.
    performance: {
        hints: false,
    },
};
