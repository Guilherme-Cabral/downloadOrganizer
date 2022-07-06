const { exec } = require('child_process');

const move = (src, dest) => {

    exec(`move "${src}" "${dest}"`, { cwd: '..' }, (err) => {
        if (err) {
            console.log(`Name:${err.name}\nMessage:${err.message}\nStack:${err.stack}`);
        }
    })

}


module.exports = {
    move
}