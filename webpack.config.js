const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const devMode = process.env.NODE_ENV !== "production";

module.exports = {
    entry: { index: path.resolve(__dirname, "src/", "main.js") },
    output: {
        path: path.resolve(__dirname, "build"),
        assetModuleFilename: "assets/[hash][ext][query]",
    },

    devServer: {
        port: 9000,
        open: true,
        hot: true,
        watchFiles: ["src/*"],
    },

    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    devMode ? "style-loader" : MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                    "sass-loader",
                ],
            },

            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },

            {
                test: /\.(html)$/,
                use: ["html-loader"],
            },

            {
                test: /\.(png|svg|jpe?g|gif)$/,
                type: "asset/resource",
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: "asset/resource",
            },
        ],
    },

    plugins: [
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, "src", "index.html"),
        }),
    ].concat(
        devMode
            ? []
            : [
                  new MiniCssExtractPlugin({
                      filename: "style.css",
                  }),
              ]
    ),
};
