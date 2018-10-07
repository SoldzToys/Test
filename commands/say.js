const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  
  if(args[0] == "help"){
    message.reply("Usage: -say <words>");
    return;
  }



  let botmessage = args.join(" ");
  message.channel.send(botmessage);
 }

module.exports.help = {
  name: "say"
}
