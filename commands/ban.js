const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission("MANAGE_MESSAGES"))
    return message.reply("You don't have the permissions to manage messasges, you will not be able to do this command.");
    if(args[0] == "help"){
      message.reply("Usage: ~ban <user> <reason>");
      return;
    }
  
  
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send("I couldn't the find user.");
    let bReason = args.slice(1).join(" ") || "None";
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You don't have the permissions to manage messasges, you will not be able to do this command.");
    if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("This user can't be banned! They are either the same rank or higher then you.");
  
    let banEmbed = new Discord.RichEmbed()
    .setDescription("Ban Report")
    .setColor("#000000")
    .addField("Banned User", `${bUser} with ID ${bUser.id}`)
    .addField("Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Banned In", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", bReason)
    .setThumbnail(bUser.user.displayAvatarURL)
    .setTimestamp(new Date());
  
    let banChannel = message.guild.channels.find(c => c.name === `<#${logchannel}>`);
    if(!banChannel) return message.channel.send("I can't find logging channel.");
  
    message.guild.member(bUser).ban(bReason);
    banChannel.send(banEmbed);
  
    return message.channel.send(`${bUser} has been launched back out into space! BANNED!!!`)
  }

module.exports.help = {
  name: "ban"
}
  