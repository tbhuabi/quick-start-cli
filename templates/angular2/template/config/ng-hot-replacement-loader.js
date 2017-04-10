function isEntry(path, entry) {
    if (typeof entry === 'string') {
        return path === entry;
    }
    if (Array.isArray(entry)) {
        return entry.indexOf(path) !== -1;
    }
    if (typeof entry === 'object') {
        for (let key in entry) {
            if (entry.hasOwnProperty(key)) {
                if (isEntry(path, entry[key])) {
                    return true;
                }
            }
        }
    }
    return false;
}


module.exports = function (source, sourcemap) {
    this.cacheable && this.cacheable();
    let newSource = source;
    if (isEntry(this.resourcePath, this.options.entry)) {
        newSource = source + `\n
        declare const module: any;
        if (module.hot) {
            module.hot.accept();
        }`;
    }
    if (this.callback) {
        this.callback(null, newSource, sourcemap)
    } else {
        return newSource;
    }
};
