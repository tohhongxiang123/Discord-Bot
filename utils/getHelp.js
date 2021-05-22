const { validTimes } = require('./constants')

const helpMessage = `
\`\`\`
/hot <limit>
/top <time> <limit>
/random <limit>
\`\`\`

\`time\`: One of ${validTimes.map(t => `\`${t}\``).join(', ')}, default: day
\`limit\`: Positive integer, default: 1

Example: \`/random 5\` \`/top year 20\`
`

function getHelp(message) {
    message.reply(helpMessage)
}

module.exports = getHelp