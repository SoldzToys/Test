const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  //~removerole @mitch Dabber x2
  if(!message.member.hasPermission("MANAGE_MESSAGES"))
  return message.reply("You don't have the permissions to manage messasges, you will not be able to do this command.");
  if(args[0] == "help"){
    message.reply("Usage: -removerole <user> <role>");
    return;
  }
  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  if (!rMember) return message.channel.send("I couldn't find that role.");
  let role = args.join(" ").slice(22);
  if(!role) return message.reply("Which role might you want to remove?");
  let gRole = message.guild.roles.find(`name`, role);
  if (!gRole) return message.reply("I couldn't find that role.");

  if(!rMember.roles.has(gRole.id)) return message.reply("They don't got that role to be taken away.");
  await(rMember.removeRole(gRole.id));

  try{
    await rMember.send(`The ${gRole.name} role has been removed!`)
 }catch(e){
   message.channel.send(`<@${rMember.id}> ${gRole.name} role has been removed!`)

 }
}

module.exports.help = {
  name: "removerole"
}
