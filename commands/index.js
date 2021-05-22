const path = require('path')
const fs = require('fs')
const files = fs.readdirSync('./commands').filter(filename => filename != path.basename(__filename)).map(file => file.replace('.js', ''))

const commands = {}

for (const file of files) {
    commands[file] = require(`./${file}`)
}

module.exports = commands