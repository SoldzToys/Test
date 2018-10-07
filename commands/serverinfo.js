const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    let sicon = message.guild.iconURL;
    let server = message.guild.name;
    let serverembed = new Discord.RichEmbed()
    .setTitle("Server Information")
    .setDescription(`Infomration on ${server}:`)
    .setThumbnail() 
    .setColor("#FF8C00")
    .addField('Server ID', message.guild.id, true)
    .addField('Server Name', message.guild.name, true)
    .addField('Server Owner', message.guild.owner, true)
    .addField('Server Channel Total', message.guild.channels.size, true)
    .addField('Server Member Total', message.guild.memberCount, true)
    .addField('Server Role Total', message.guild.roles.size, true)
    .addField('Server Region', message.guild.region, true)
    .addField('Server Made', message.guild.createdAt.toLocaleDateString(), true)
    .setThumbnail(sicon) 
    .setTimestamp(new Date());
    message.channel.send(serverembed);
  }

module.exports.help = {
  name: "serverinfo"
}