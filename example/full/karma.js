var webpack = require('webpack');
var path = require('path');

module.exports = (config) => {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],

        plugins: [
          require('karma-jasmine'),
          require('karma-webpack'),
          require('karma-jasmine-html-reporter'),
          require('karma-phantomjs-launcher'),
          require('karma-chrome-launcher'),
          require('karma-coverage')
        ],

        files: [
            './node_modules/babel-polyfill/dist/polyfill.js',
            './node_modules/reflect-metadata/Reflect.js',
            // './node_modules/fetch-everywhere/fetch-npm-node.js',
            {
                pattern: 'src/Test/Client/**/*Test.ts',
                watched: false
            },
            {
                pattern: 'src/Test/Client/**/*Test.tsx',
                watched: false
            }
        ],

        // exclude: [
        //     "node_modules"
        // ],
    
        preprocessors: {
            '**/*.ts': [ 'webpack', 'coverage' ],
            '**/*.tsx': [ 'webpack', 'coverage' ]
        },

        // configure the reporter
        coverageReporter: {
          type: 'text'
        },
    
        webpack: {
            mode: 'development',
            output: {
                devtoolModuleFilenameTemplate: info => {
                    if (info.absoluteResourcePath.charAt(0) === '/') {
                        return 'file://' + info.absoluteResourcePath;
                    } else {
                        return 'file:///' + info.absoluteResourcePath;
                    }
                },
                devtoolFallbackModuleFilenameTemplate: info => {
                    if (info.absoluteResourcePath.charAt(0) === '/') {
                        return 'file://' + info.absoluteResourcePath + '?' + info.hash;
                    } else {
                        return 'file:///' + info.absoluteResourcePath + '?' + info.hash;
                    }
                }
            },
            resolve: {
                extensions: ['.ts', '.tsx', '.js'],
                alias: {
                    '~': path.resolve(__dirname, 'src'),
                    'reiso': path.resolve(__dirname, '../../build'),
                    // node_modules: path.resolve(__dirname, 'node_modules')
                },
                // modules: [
                //     path.resolve(__dirname, '../../node_modules'),
                //     path.resolve(__dirname, 'node_modules')
                // ],
                // mainFields: ['browser', 'main', 'module'],
            },
            module: {
                rules: [
                    {
                        test: /\.tsx?$/,
                        exclude: /\/node_modules\//,
                        loaders: [
                            'babel-loader',
                            'ts-loader'
                        ]
                    },
                    {
                        test: /\.js$/,
                        loader: 'babel-loader',
                        exclude: /\/node_modules\//
                    },
                    // {
                    //     test: /\.gql$/,
                    //     loaders: 'graphql-tag/loader'
                    // }
                    // {
                    //     test: /\.json$/,
                    //     loaders: 'json-loader'
                    // },
                    // {
                    //     test: /\.svg$/,
                    //     loaders: 'raw-loader'
                    // }
                ]
            },
            plugins: [
                new webpack.ProvidePlugin({
                    $: 'jquery',
                    jQuery: 'jquery',
                    'window.jQuery': 'jquery'
                }),
                new webpack.EnvironmentPlugin({
                    'MODE': 'client'
                }),
                new webpack.SourceMapDevToolPlugin({
                    filename: null,
                    test: /\.(ts|tsx|js)($|\?)/i,
                    exclude: [ /node_modules/ ]
                })
            ]
        },
    
        webpackMiddleware: {
            // stats: 'errors-only'
        },

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        // browsers: ['PhantomJS'],
        browsers: ['ChromeHeadless'],
        port: 9876,

        customLaunchers: {
            ChromeHeadless: {
                base: 'Chrome',
                flags: [
                    '--headless',
                    '--disable-gpu',
                    '--no-sandbox',
                    '--remote-debugging-port=9222'
                ]
            }
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'coverage'],
        // reporters: ['progress', 'kjhtml'],
        // colors: true,

        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        // logLevel: config.LOG_INFO,

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true,

        // Concurrency level
        // how many browser should be started simultaneous
        // concurrency: Infinity
    })
}