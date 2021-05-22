function parseMessage(msg) {
    const args = msg.content.trim().split(/ +/).map(arg => !isNaN(arg) ? parseFloat(arg) : arg)
    const command = args.shift().toLowerCase().slice(1)

    return { args, command }
}

module.exports = parseMessage