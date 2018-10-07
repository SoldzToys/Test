const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  //~addrole @mitch Dabber x2
  if(!message.member.hasPermission("MANAGE_MESSAGES"))
  return message.reply("You don't have the permissions to manage messasges, you will not be able to do this command.");
  if(args[0] == "help"){
    message.reply("Usage: -addrole <user> <role>");
    return;
  }
  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  if (!rMember) return message.reply("I couldn't find them.");
  let role = args.slice(1).join(" ");
  if(!role) return message.reply("Which role might you want to add?");
  let gRole = message.guild.roles.find(r => r.name === role);
  if (!gRole) return message.reply("I couldn't find them.")
  if(rMember.roles.has(gRole.id))
  return message.reply("They already have this role.");
  await(rMember.addRole(gRole.id));

  try{
    await rMember.send(`You've been gifted the ${gRole.name} role.`)
 }catch(e){
   message.channel.send(`You've been gifted the <@${rMember.id}> ${gRole.name} role. Those DMs aren't opened though.`)

 }
}

module.exports.help = {
  name: "addrole"
}
