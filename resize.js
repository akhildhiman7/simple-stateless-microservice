const fs = require('fs')
const sharp = require('sharp')
var transform = sharp()

module.exports = function resize(path, format, width, height) {
    var readStream = fs.createReadStream(path)
    transform = transform.toFormat(format)
    transform = transform.resize(width, height)
    return readStream.pipe(transform)
}
