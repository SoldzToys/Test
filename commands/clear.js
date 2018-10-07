const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  if(!message.member.hasPermission("MANAGE_MESSAGES"))
  return message.reply("You don't have the permissions to manage messasges, you will not be able to do this command.");
  if(args[0] == "help"){
    message.reply("Usage: -clear <message_amount>");
    return;
  }
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("No.")
  if(!args[0]) return message.send("No.");
  message.channel.bulkDelete(args[0]).then(() => {
    message.channel.send(`Cleared about ${args[0]} messages!`).then(msg => msg.delete(5000));
 });
}

 module.exports.help = {
   name: "clear"
 }
