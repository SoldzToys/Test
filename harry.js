const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const mysql = require("mysql");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();
let palette = botconfig.palette;

fs.readdir("./commands/", (err, files) => {

  if (err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded up!`)
    bot.commands.set(props.help.name, props);
  });

});



bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);
  bot.user.setActivity("Universe Sandbox (-help)");

});

let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "ThisisabotpassworDDrowssaptobisishT",
    database: "harry"
  });
  
  con.connect(err => {
    if(err) throw err;
    console.log("Plugged into the database!");
    con.query("SHOW TABLES", console.log);
  });
//addRole?
bot.on('guildMemberAdd', async member => {
  let guild = member.guild;
  let server = member.guild.name;
  member.addRole(`496801148607397890`);
  var logs = guild.channels.find(c => c.name === 'logs');
  if (!logs) return console.log("I can't find logs channel.")
  const gembed = new Discord.RichEmbed()
      .setTitle("Member Enterance")
      .setColor("#FF8C00")
      .setDescription(`Welcome ${member}, to **${server}**, glad you made a safe landing here.`)
      .setTimestamp(new Date())
  logs.send(gembed);
});

bot.on('guildMemberRemove', async member => {
    let guild = member.guild;
    var logs = guild.channels.find(c => c.name === 'logs');
    if (!logs) return console.log("I can't find logs channel.")
    const gembed = new Discord.RichEmbed()
        .setTitle("Member Departure")
        .setColor("#FF8C00")
        .setDescription(`${member}, sorry to see you take off back to where you came from. Have a safe trip!`)
        .setTimestamp(new Date())
    logs.send(gembed);
});

  bot.on('messageDelete', async message => {
    var logs = message.guild.channels.find(c => c.name === 'logs');
    if (!logs) return console.log("I can't find logs channel.");
    const dembed = new Discord.RichEmbed()
        .setTitle("Message Deleted")
        .setColor("#000000")
        .setDescription(`A message sent by ${message.author} was deleted in ${message.channel}`)
        .addField("Message:", `${message.cleanContent}`)
        .setTimestamp(new Date());
    logs.send(dembed);
});

bot.on("messageUpdate", function (oldMessage, newMessage, channel) {
    if (newMessage.channel.type == 'text' && newMessage.cleanContent != oldMessage.cleanContent) {
        var logs = newMessage.guild.channels.find(c => c.name === 'logs');
        
        if (!logs) return console.log("I can't find logs channel.");
        const eembed = new Discord.RichEmbed()
            .setTitle("Message Edit")
            .setColor("#000000")
            .setDescription(`A message sent by ${newMessage.author} was edited in ${newMessage.channel}`)
            .addField(`Old message:`, `${oldMessage.cleanContent}`)
            .addField(`New Message:`, `${newMessage.cleanContent}`)
            .setTimestamp(new Date())
        logs.send(eembed);
    }
});


bot.on("channelCreate", async channel => {
  var logs = channel.guild.channels.find(c => c.name === 'logs');
  if (!logs) return console.log("I can't find logs channel.");
  const cembed = new Discord.RichEmbed()
      .setTitle("Channel Created")
      .setColor("#FF8C00")
      .setDescription(`A **${channel.type} channel**, by the name of **${channel.name}**, was just created!`)
      .setTimestamp(new Date());
  logs.send(cembed)
});

bot.on("channelDelete", async channel => {
  var logs = channel.guild.channels.find(c => c.name === 'logs');
  if (!logs) return console.log("I can't find logs channel.");
  const cembed = new Discord.RichEmbed()
      .setTitle("Channel Deleted")
      .setColor("#FF8C00")
      .setDescription(`A **${channel.type} channel**, by the name of **${channel.name}**, was just deleted!`)
      .setTimestamp(new Date())
  logs.send(cembed)
});



bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;


let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));



if(!prefixes[message.guild.id]){
  prefixes[message.guild.id] = {
    prefixes: botconfig.prefix
  };
}

let prefix = prefixes[message.guild.id].prefixes;
console.log(prefix);
//let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ")
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if (!message.content.startsWith(prefix)) return;
    if(commandfile) commandfile.run(bot, message, args, con, prefix)
   

    
   


  if(cmd === `${prefix}hello`){
    return message.channel.send("How are you today citizen?");
  }
  
  if(!message.member.hasPermission("MANAGE_SERVER"))
  return message.reply("You don't have the permissions to manage the server, you will not be able to do this command.");
  if(args[0] == "help"){
    message.reply("Usage: ~loghelp");
    return;
  }
  
  if(cmd === `${prefix}loghelp`){
    return message.channel.send("Far as logs, you will need to make a channel named #logs. This will help you with all of the logs for the server.");
  }

  if(cmd == `${prefix}setlogs`){
let logchannel = message.mentions.channels.first().id || message.guild.channels.find(c => c.name === args.join(' '))
if(!logchannel) return message.channel.send('Can\'t find the log channel!')
con.query(`update guild set logs = ${logchannel} where id = ${message.guild.id}`) 
//problem?
return message.channel.send(`Log channel has been set to: <#${logchannel}>`)
}



});

bot.login(botconfig.token);
  
