const sendPostMessage = require('../utils/sendPostMessage')
const getPosts = require('../utils/getPosts')

async function hot(msg, args) {
    try {
        const limit = args[0] ? parseInt(args[0]) : 1
        const subreddit = msg.channel.name

        msg.reply(`Fetching ${limit} hot posts from ${subreddit}`)
        const posts = await getPosts(subreddit, { type: 'hot', limit })
        await Promise.all(posts.map(async({ title, subreddit, upvotes, image, permalink, author, thumbnail, date }) => {
            return await sendPostMessage(msg.channel, { title, permalink, author, subreddit, upvotes, thumbnail, image, date })
        }))
    } catch (e) {
        msg.reply(`${e.message}`)
    }
}

module.exports = hot