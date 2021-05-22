const Discord = require('discord.js');

async function sendPostMessage(channel, { title, permalink, author, subreddit, upvotes, thumbnail, image, date }) {
    const embed = new Discord.MessageEmbed()
        .setTitle(title)
        .setURL(permalink)
        .setAuthor(author)
        .setDescription(`${subreddit} - ${upvotes} upvotes`)
        .setThumbnail(thumbnail)
        .setTimestamp(date);

    channel.send(embed);
    if (image) {
        await channel.send(`${image}`);
    }
}

module.exports = sendPostMessage