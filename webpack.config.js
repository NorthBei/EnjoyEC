// webpack.config.js
var webpack = require('webpack');
// var HtmlWebpackPlugin = require("html-webpack-plugin");
// var ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require("path");
console.log("path:" + __dirname);

module.exports = {
    entry: {
        "home/bundle": "./dev/home/entry.js",
        "limited_on_sale_entry/bundle": "./dev/limited_on_sale_entry/entry.js",
        "new_hot_product/bundle": "./dev/new_hot_product/entry.js",
        "product_intro/bundle": "./dev/product_intro/entry.js"
    },
    output: {
        path: path.resolve(__dirname, 'build'),//__dirname + "/build/" + filePath,
        filename: '[name].js'//"./assets/"+filePath+".js"
    },
    module: {
        //exclude: 'node_modules',
        loaders: [
            //{ test: /\.jade$/, loader: "jade-loader" },
            //{ test: /\.js$/, loader: 'babel-loader'},
            //{ test: /\.css$/, loader: "style!css?url=false" },
            //{ test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader?url=false") },
            //{ test: /\.scss$/, loader: 'style-loader!css-loader?url=false!sass-loader' },
            //don't be inline css in style tag
            //{ test: /\.scss$/, loader: ExtractTextPlugin.extract("style","css?url=false!sass?sourceMap")},
            //這行不會去compile sass
            //{ test: /\.scss$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader?url=false', 'sass-loader?sourceMap') },
            //css-loader?url=false' 是用來讓css loader不要compile css url 內的resource to hash string
            //如果我們找到 scss 檔的話我們就依序載入 style-loader, css-loader, sass-loader 去編譯
            //{ test: /\.(jpe?g|png|gif|svg)$/i, loader: 'url?limit=8192' }
            //{ test: /.(png|jpg)$/, loader: 'url-loader?limit=8192' }
        ]
    },
    externals: {
        jquery: 'jQuery'
    },
    // resolve: {
    //     alias: {
    //         jquery: "./dev/_general/third_part/"
    //     }
    // },
    // sassLoader: {
    //     includePaths: ["./src/_general/style/"]
    // },
    // plugins: [
    //     new webpack.ProvidePlugin({
    //         $: 'jquery',
    //         jQuery: 'jquery',
    //         'window.jQuery': 'jquery',
    //         'root.jQuery': 'jquery'
    //     }),
    //     //new webpack.NoErrorsPlugin(),
    //     // new HtmlWebpackPlugin({
    //     //     filename: "./index.html",
    //     //     //favicon: 'favicon.ico',
    //     //     template: "./src/" + filePath + "/" + filePath + ".jade"
    //     // }),
    //     // new ExtractTextPlugin("./assets/"+filePath+".css")
    // ],
    // devServer: {
    //     contentBase: "./build/" + filePath,
    //     inline: true,
    //     hot: false
    // }
};

//1.
//css-loader用來處理css文件，style-loader用來把css應用到頁面上。
//!style!css!這樣的寫法叫loader管道。loader在應用時從右到左依次調用。//

//2.
//http://localhost:8080/build/
//http://localhost:8080/webpack-dev-server/

//3.
//"dev": "webpack-dev-server --inline" set in webpack.config

//4.
//"dev": "webpack-dev-server --devtool eval --progress --colors --content-base build"
//--devtool eval: 將把 source 加到我的 code.
//--progress 與 --colors 只是反應現在程序執行到哪邊。
//而 --content-base build 將會把 build裡的 index.html 作為你的啟始網頁