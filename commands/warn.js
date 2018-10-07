const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (bot, message, args) => {

  
  if(!message.member.hasPermission("MANAGE_MESSAGES"))
  return message.reply("You don't have the permissions to manage messasges, you will not be able to do this command.");
  if(args[0] == "help"){
    message.reply("Usage: -warn <reason>");
    return;
  }

  //~warn @mitch <reason>
  if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("Hell no.");
  let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  if (!wUser) return message.reply("I couldn't find that user.")
  if (wUser.hasPermission("MANAGE_MESSAGES")) return message.reply("This user cannot be warned.")

  let reason = args.slice(1).join(" ") || "None";
  


  if(!warns[wUser.id]) warns[wUser.id] = {
    warns: 0
  };

  warns[wUser.id].warns++;

  fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
    if (err) console.log(err);
 });
 
let warnEmbed = new Discord.RichEmbed()
.setDescription("Warns")
.setAuthor(message.author.username)
.setColor("#FF8C00")
.addField("Warned User", wUser.user.tag)
.addField("Warned In", message.channel)
.addField("Number of Warnings", warns[wUser.id].warns)
.addField("Reason", reason);

let warnchannel = message.guild.channels.find(c => c.name === "logs");
if(!warnchannel) return message.reply("This channel is nowhere to be seen.");

warnchannel.send(warnEmbed);

if(warns[wUser.id].warns == 3){
  let muterole = message.guild.roles.find(`name`, "muted");
  if(!muterole){
    try{
    muterole = await message.guild.createRole({
      name: "muted",
      color: "#23272a",
      permission: []
    })
    message.guild.channels.forEach(async (channel, id) => {
      await channel.overwritePermissions(muterole, {
        SEND_MESSAGES: false,
        ADD_REACTIONS: false
      });
    });
  
    }catch(e){
      console.log(e.stack);
    }
  }
  if(!muterole) return message.reply("That role should have been created by now.");

  let mutetime = "5m";
  await(wUser.addRole(muterole.id));
  message.channel.send(`${wUser.user.tag} has been freaking muted!`);

  setTimeout(function(){
    wUser.removeRole(muterole.id)
    message.reply(`${wUser.tag} has been unmuted.`)
  }, ms(mutetime))
}
if(warns[wUser.id].warns == 5){
  message.guild.member(wUser).kick(reason);
  message.channel.send(`${wUser} has gotten kicked!`)
}
}
module.exports.help = {
  name: "warn"
}
