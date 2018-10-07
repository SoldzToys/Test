const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
  if(message.author.id != "483336846739505163") return;
  message.react("😏");

}

module.exports.help = {
  name: "react"
}
