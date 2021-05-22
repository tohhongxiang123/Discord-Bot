const sendPostMessage = require('../utils/sendPostMessage')
const getPosts = require('../utils/getPosts')

async function top(msg, args) {
    try {
        const time = args[0] ? args[0] : 'day'
        const limit = args[1] ? parseInt(args[1]) : 1
        const subreddit = msg.channel.name

        msg.reply(`Fetching ${limit} top posts from ${subreddit} (${time})`)
        const posts = await getPosts(subreddit, { type: 'top', time, limit })
        await Promise.all(posts.map(async({ title, subreddit, upvotes, image, permalink, author, thumbnail, date }) => {
            return await sendPostMessage(msg.channel, { title, permalink, author, subreddit, upvotes, thumbnail, image, date })
        }))
    } catch (e) {
        msg.reply(`${e.message}`)
    }
}

module.exports = top