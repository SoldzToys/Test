const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

let helpEmbed = new Discord.RichEmbed()
.setDescription("Help Bar")
.setColor("#b70000")
.addField("Member Commands", "hello, say, botinfo, serverinfo, report, google, and ping ")
.setTimestamp(new Date());

message.channel.send(helpEmbed);


if(message.member.hasPermission("MANAGE_MESSAGES")){
let modEmbed = new Discord.RichEmbed()
.setDescription("Mod Help Bar")
.setColor("#b70000")
.addField("Mod Commands", "addrole, clear, removerole, kick, ban, warn, warnlevel, and mute (For more info on the roles, add help to the end of it. Example: -removerole help).")
.setTimestamp(new Date());

try{
  await message.author.send(modEmbed);
  message.react(message.guild.emojis.get('496720601885573146'))
}catch(e){
  message.reply("Your DMs are locked.")
 }
}

if(message.member.hasPermission("MANAGE_SERVER")){
  let ownerEmbed = new Discord.RichEmbed()
  .setDescription("Owner/Admin Help Bar")
  .setColor("#b70000")
  .addField("Owner/Admin Commands", "loghelp, and prefix")
  .setTimestamp(new Date());
  try{
    await message.author.send(ownerEmbed);
  }catch(e){
    message.reply("Your DMs are locked.")
   }
  }
}

  module.exports.help = {
    name: "help"
}
