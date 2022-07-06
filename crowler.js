const fs = require('fs');
const { resolve } = require('path/win32');

const search = (dir, files) => {
    if (!files) {
        files = [];
    }
    let list = fs.readdirSync(dir);
    for (let x in list) {
        let stat = fs.statSync(`${dir}\\${list[x]}`);
        files.push(`${dir}\\${list[x]}`)
        if (stat.isDirectory()) {
            search(`${dir}\\${list[x]}`, files)
        }
    }
    return files
}

module.exports = {
    search,
}
