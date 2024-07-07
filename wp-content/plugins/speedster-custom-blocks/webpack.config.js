const path = require("path");
const fs = require("fs");

// Function to generate entries from 'Components' subfolders
function generateEntries(baseDir) {
  const entries = {};
  fs.readdirSync(baseDir).forEach((subDir) => {
    const fullPath = path.join(baseDir, subDir, "index.js");
    if (fs.existsSync(fullPath)) {
      entries[subDir] = fullPath;
    }
  });
  return entries;
}

const componentsDir = path.resolve(__dirname, "Components");
const entries = generateEntries(componentsDir);

module.exports = {
  entry: entries,
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg|gif)$/,
        type: "asset/resource",
        generator: {
          filename: "assets/[name][ext]",
        },
      },
    ],
  },
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
    "@wordpress/blocks": ["wp", "blocks"],
    "@wordpress/i18n": ["wp", "i18n"],
    "@wordpress/editor": ["wp", "editor"],
    "@wordpress/components": ["wp", "components"],
    "@wordpress/block-editor": ["wp", "blockEditor"],
  },
};
