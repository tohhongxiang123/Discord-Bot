require('dotenv').config()

const Discord = require('discord.js');
const client = new Discord.Client();

const parseMessage = require('./utils/parseMessage')
const { validCategory } = require('./utils/constants')
const commands = require('./commands')

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async msg => {
    if (msg.channel.parentID !== validCategory) return
    if (msg.author.bot) return

    const { args, command } = parseMessage(msg)
    const validCommands = Object.keys(commands)

    if (!validCommands.includes(command)) return

    return commands[command](msg, args)
});

client.login(process.env.DISCORD_SECRET);