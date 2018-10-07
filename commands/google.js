const Discord = require("discord.js");
const encode = require('strict-uri-encode');

module.exports.run = async (bot, message, args, tools) => {

let question = encode(args.join(' '));

let link = `http://www.lmgtfy.com/?q=${question}`
let linkembed = new Discord.RichEmbed()
.setTitle("Google's Answer")
.setDescription(`**<${link}>**`)
.setColor("#FF8C00")
message.channel.send(linkembed);

}

module.exports.help = {
  name: "google"
}