module.exports = {
    mode: 'production',
    entry: './src/app.ts',
    output: {
        filename: 'pdf-merger.js',
        path: __dirname + '/dist',
        library: 'PdfMerger',
        libraryTarget: 'umd',
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    target: 'node',
}