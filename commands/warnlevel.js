const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (bot, message, args) => {
  
  if(!message.member.hasPermission("MANAGE_MESSAGES"))
  return message.reply("You don't have the permissions to manage messasges, you will not be able to do this command.");
  if(args[0] == "help"){
    message.reply("Usage: -warnlevel <user>");
    return;
  }


  if(!message.member.hasPermission("MANAGE_MESSAGES"))
  return message.reply("You need manage messages, sorry.");
  let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  if (!wUser) return message.reply("I couldn't find that user.")
  let warnlevel = warns[wUser.id].warns;

  message.channel.send(`<@${wUser.id}> has ${warnlevel} warnings.`);



}

module.exports.help = {
  name: "warnlevel"
}
