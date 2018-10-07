const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let msgping1 = new Date();

    let botping = new Date() - message.createdAt;

    let msgping2 = new Date() - msgping1;

    let pingembed = new Discord.RichEmbed()
        .setColor("#FF8C00")
        .setTitle('🏓 **PONG!**')
        .addField(' API Ping: ', Math.floor(bot.ping) + 'ms')
        .addField(' Bot Ping: ', Math.floor(botping) + 'ms')
        .addField(' Message Ping: ', '~' + Math.round(msgping2) + 'ms')
        .setTimestamp(new Date())
        .setFooter(`Bot Version: 2.3.5, requested by ${message.author.tag}`);
        

        
    return message.channel.send(pingembed);
    
};

module.exports.help = {
    name: "ping",
    category: "Category 2",
    description: "Check the bots ping!"
}