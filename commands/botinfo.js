const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setTitle("Bot Information")
    .setColor("#FF8C00")
    .setThumbnail(bicon)
    .addField("Bot Name", bot.user.username, true)
    .addField("Bot Tag", bot.user.tag, true)
    .addField("Created On", bot.user.createdAt, true)
    .addField("Guilds", bot.guilds.size, true)
    .addField("Users", bot.users.size, true)
    .setTimestamp(new Date());
    return message.channel.send(botembed);
  }

module.exports.help = {
  name: "botinfo"
}
  