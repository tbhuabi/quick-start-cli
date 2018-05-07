module.exports = function cssTest(language) {
    switch (language) {
        case 'sass':
            return /\.s?css$/;
        case 'less':
            return /\.(less|css)$/;
        case 'stylus':
            return /\.(styl(us)?|css)$/;
    }
};