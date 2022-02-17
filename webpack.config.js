/* eslint-disable no-undef */
const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev;

const getFilename = (ext) =>
    isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`;

module.exports = {
    context: path.resolve(__dirname, "src"), // main directory with main js file
    mode: "development",
    entry: "./index.js", // starting file
    output: {
        filename: `./${getFilename("js")}`,
        path: path.resolve(__dirname, "app"), // where to put our build
    },
    devServer: {
        // set up webpack dev server to update js file on save
        historyApiFallback: true,
        open: true,
        compress: true,
        hot: true,
        port: 3000,
    },
    plugins: [
        new HTMLWebpackPlugin({
            // copy html file to "app folder"
            template: path.resolve(__dirname, "./index.html"),
            filename: "index.html",
            minify: {
                collapseWhitespace: isProd,
            },
        }),
        new CleanWebpackPlugin(), // remove unused files in "app" folder
        new MiniCssExtractPlugin({
            // copy css file to "app" folder
            filename: `./${getFilename("css")}`,
        }),
    ],
    module: {
        rules: [{
                test: /\.html$/,
                loader: "html-loader", // update html file on save
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"], // update css file on save
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader", // parse js to old versions for old browsers
                    options: {
                        presets: ["@babel/preset-env"],
                    },
                },
            },
        ],
    },
};