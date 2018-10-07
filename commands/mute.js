const Discord = require("discord.js")
const ms = require("ms");

module.exports.run = async (bot, message, args) => {

  if(!message.member.hasPermission("MANAGE_MESSAGES"))
  return message.reply("You don't have the permissions to manage messasges, you will not be able to do this command.");
  if(args[0] == "help"){
    message.reply("Usage: -mute <user> <reason>");
    return;
  }



let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
if(!tomute) return message.reply("I couldn't find that user.");
if(tomute.hasPermission("MANAGE_MESSAGES"))
return message.reply("This user cannot be muted.");
let muterole = message.guild.roles.find(`name`, "muted");
//start of role
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
//end of role
let mutetime = args[1];
if(!mutetime) return message.reply("You didn't put a time-limit!")

await(tomute.addRole(muterole.id));
message.channel.send(`<@${tomute.id}> just got themselves muted for ${ms(ms(mutetime))}`);

setTimeout(function(){
  tomute.removeRole(muterole.id)
  message.channel.send(`<@${tomute.id}> has been unmuted!`);
}, ms(mutetime));

//end of module
}

module.exports.help = {
  name: "mute"
}
