const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    let user = message.mentions.users.first();
if(!user) return message.channel.send("I couldn't the find user.");
    let avatarEmbed = new Discord.RichEmbed()
    .setAuthor(`${user.username}`)
    .setImage(user.displayAvatarURL)
    .setColor("RANDOM")
    .setTimestamp(new Date());
    return message.channel.send(avatarEmbed);
}

module.exports.help = {
	name: "avatar"
}