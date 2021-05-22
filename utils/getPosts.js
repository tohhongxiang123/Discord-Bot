require('dotenv').config()

const snoowrap = require('snoowrap');
const r = new snoowrap({
    userAgent: "Reddit fetcher by tohhongxiang",
    clientId: process.env.REDDIT_CLIENT_ID,
    clientSecret: process.env.REDDIT_CLIENT_SECRET,
    username: process.env.REDDIT_USERNAME,
    password: process.env.REDDIT_PASSWORD
});

const { validTimes } = require('./constants')

/**
 * 
 * @param {string} subreddit 
 * @param {'hot' | 'top' | 'random'} type 
 * @param {'all' | 'hour' | 'day' | 'week' | 'month' | 'year'} time 
 * @param {number} limit 
 */
async function getPosts(subreddit, { type = 'hot', time = 'day', limit = 1 }) {
    checkValidArguments({ type, time, limit, subreddit })
    let posts = []
    const fetcher = subreddit === 'hot' ? r : r.getSubreddit(subreddit)

    if (type === 'random') {
        posts = [await fetcher.getRandomSubmission()]
    } else if (type === 'top') {
        posts = await fetcher.getTop({ limit, time })
    } else {
        posts = await fetcher.getHot({ limit })
        posts = posts.slice(posts.length - limit, posts.length)
    }

    return posts.map(post => {
        const title = post.title
        const subreddit = post.subreddit_name_prefixed
        const upvotes = post.ups
        const permalink = `https://www.reddit.com${post.permalink}`
        const author = post.author.name
        const date = post.created_utc * 1000
        let image = null
        let thumbnail = null

        if (post.url.startsWith('http')) {
            image = post.url
        } else if (post.thumbnail.startsWith('http')) {
            image = post.thumbnail
            thumbnail = post.thumbnail
        } else if (post.is_video) {
            image = post.media.reddit_video.fallback_url
        }
        image = image.replace('gifv', 'gif')

        return {
            title,
            subreddit,
            upvotes,
            image,
            permalink,
            author,
            image,
            thumbnail,
            date
        }
    })
}

function checkValidArguments({ time, limit, subreddit }) {
    if (!validTimes.includes(time)) throw new Error(`Invalid time: \`${time}\`, must be one of ${validTimes.map(t => `\`${t}\``).join(', ')}`)

    if (isNaN(limit)) throw new Error(`Invalid limit: \`${limit}\`, must be number`)
    if (typeof subreddit !== 'string') throw new Error(`Invalid subreddit: must be a string`)
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

module.exports = getPosts