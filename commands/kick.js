const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

if(!message.member.hasPermission("MANAGE_MESSAGES"))
return message.reply("You don't have the permissions to manage messasges, you will not be able to do this command.");
if(args[0] == "help"){
  message.reply("Usage: -kick <user> <reason>");
  return;
}

let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
if(!kUser) return message.channel.send("I couldn't the find user.");
let kReason = args.slice(1).join(" ") || "None";
if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You don't have the permissions to manage messasges, you will not be able to do this command.");
if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("This user can't be kicked! They are either the same rank or higher then you.");

let kickEmbed = new Discord.RichEmbed()
.setDescription("Kick Report")
.setColor("#000000")
.addField("Kicked User", `${kUser} with ID ${kUser.id}`)
.addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
.addField("Kicked In", message.channel)
.addField("Time", message.createdAt)
.addField("Reason", kReason)
.setThumbnail(kUser.user.displayAvatarURL)
.setTimestamp(new Date());

let kickChannel = message.guild.channels.find(c => c.name === 'logs');
if(!kickChannel) return message.channel.send("I can't find logging channel.");

message.guild.member(kUser).kick(kReason);
kickChannel.send(kickEmbed);

return message.channel.send(`${kUser} has been kicked from the server!`)
}


module.exports.help = {
  name: "kick"
}
  