require('dotenv').config()

const { validCategory } = require('../utils/constants')

const Discord = require('discord.js');
const getPosts = require('../utils/getPosts');
const sendPostMessage = require('../utils/sendPostMessage');
const client = new Discord.Client();

client.on('ready', async() => {
    let channelsToSendTo = client.channels.cache.array().filter(channel => channel.parentID === validCategory).map(c => c.id)

    await Promise.all(channelsToSendTo.map(async c => {
        const channel = client.channels.cache.get(c)
        const posts = await getPosts(channel.name, { type: 'top', time: 'day', limit: 5 })
        return await Promise.all(posts.map(async post => await sendPostMessage(channel, post)))
    }))

    client.destroy()
})

client.login(process.env.DISCORD_SECRET);