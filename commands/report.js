const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {


  if(args[0] == "help"){
    message.reply("Usage: ~report <user> <reason>");
    return;
  }

  let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!rUser) return message.channel.send("I couldn't find that user.");
  let reason = args.slice(1).join(" ") || "None";
  
  let reportEmbed = new Discord.RichEmbed()
  .setDescription("Reports")
  .setColor("#000000")
  .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
  .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
  .addField("Channel", message.channel)
  .addField("Time", message.createdAt)
  .addField("Reason", reason)
  .setTimestamp(new Date());

  let reportschannel = message.guild.channels.find(c => c.name === 'logs');
  if(!reportschannel) return message.channel.send("I can't find logging channel.");


  message.delete().catch(O_o=>{});
  reportschannel.send(reportEmbed);
return message.reply("Report sucessfully submitted!")
}

module.exports.help = {
  name: "report"
}
