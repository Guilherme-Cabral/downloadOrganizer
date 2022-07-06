const fs = require('fs');
const os = require('os');
const path = require('path/win32');
const { resolve } = require('path/win32');
const { search } = require('./crowler');
const { move } = require('./move');


const user = os.homedir();
const download = resolve(user, 'Downloads');

const check = (x, y) => {
    for (let i = 0; i < y.length; i++) {
        if (x.includes(y[i])) {
            return true
        }
    }
}

const run = async () => {
    console.clear()
    let dirs = ['executables', 'pdfs', 'docs', 'images', 'videos', 'compressed', 'programming', 'office', 'others', 'directories']

    console.log('creating pastes....\n\n')
    for (dir of dirs) {
        if (!fs.existsSync(resolve(download, dir))) {
            fs.mkdirSync(resolve(download, dir));
        }
    }
    const files = search(download);
    try {
        console.log('verifying files and extensions...')
        for (file of files) {
            if (check(file, dirs) || file.toLowerCase().includes('desktop.ini')) continue
            if (fs.lstatSync(file).isDirectory() && !check(file, dirs)) {
                await move(file, resolve(download, dirs.at(-1)))
            }
            let extension = path.extname(file).toLowerCase();
            switch (extension) {
                case ".exe":
                case ".bin":
                case ".bat":
                case ".apk":
                case ".com":
                case ".jar":
                case ".msi":
                case ".py":
                case ".ps1":
                case ".wsf":
                    await move(file, resolve(download, dirs[0]))
                    break;

                case ".pdf":
                    await move(file, resolve(download, dirs[1]))
                    break;

                case ".docx":
                case ".txt":
                case ".docm":
                case ".doc":
                case ".dotx":
                case ".odp":
                case ".rtf":
                case ".wpd":
                case ".docb":
                case ".wll":
                case ".wwl":
                case ".ooxml":
                    await move(file, resolve(download, dirs[2]))
                    break;
                case ".jpg":
                case ".png":
                case ".jfif":
                case ".jpeg":
                case ".ai":
                case ".bmp":
                case ".ico":
                case ".psd":
                case ".svg":
                case ".tif":
                case ".gif":
                case ".tiff":
                    await move(file, resolve(download, dirs[3]))
                    break;
                case ".mkv":
                case ".mp4":
                case ".ogg":
                case ".flv":
                case ".gifv":
                case ".avi":
                case ".mov":
                case ".wmv":
                case ".mpg":
                case ".mpeg":
                    await move(file, resolve(download, dirs[4]))
                    break;
                case ".rar":
                case ".7z":
                case ".tar.gz":
                case ".zip":
                case ".iso":
                    await move(file, resolve(download, dirs[5]))
                    break;
                case ".c":
                case ".cpp":
                case ".cgi":
                case ".class":
                case ".cs":
                case ".h":
                case ".php":
                case ".sh":
                case ".swift":
                case ".vb":
                case ".js":
                case ".pl":
                    await move(file, resolve(download, dirs[6]))
                    break;
                case ".ods":
                case ".ppt":
                case ".pptx":
                case ".xls":
                case ".xlsm":
                case ".xlsx":
                case ".xltx":
                case ".xltm":
                case ".xlsb":
                case ".xlw":
                case ".ppt":
                case ".pptx":
                case ".potx":
                case ".pptm":
                case ".ppsx":
                case ".sldx":
                case ".ppsx":
                case ".potm":
                case ".ppam":
                case ".pa":
                case ".one":
                case ".pub":
                    await move(file, resolve(download, dirs[7]))
                    break;
                default:
                    if (fs.lstatSync(file).isDirectory()) continue;
                    await move(file, resolve(download, dirs[8]))
                    console.log(`arquivo: ${file}\nMovido para a pasta:${dirs[8]}`)
                    break;
            }
        }
        console.log('all files moved organized pastes 😉')
    } catch (e) {
        console.log(`Error: ${e.code}\nMessage: ${e.message}\nOnFile: ${e.fileName}`)
    }
    
}

run()
