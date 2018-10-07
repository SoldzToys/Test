        const Discord = require("discord.js");

        module.exports.run = async (bot, message, args) => {
            let member = message.mentions.users.first() || message.author
            let player = message.mentions.members.first() || message.member
            let user = message.mentions.users.first();
            let iicon = player.user.displayAvatarURL;
            let roles = message.mentions.members.first().roles.map(role => role).join(" ");
        if(!user) return message.channel.send("I couldn't the find user.");
            let userEmbed = new Discord.RichEmbed()
            .setAuthor(`${user.username}'s Info`, user.displayAvatarURL)
            .setThumbnail(user.displayAvatarURL)
            .setColor('#FF8C00')
            .addField('User ID', user.id, true)
            .addField('Current Tag', user.tag, true)
            .addField('Nickname', `${player.displayName}`, true) 
            .addField('Highest User Role', `${player.highestRole.name}`, true)
            .addField('Roles', `${roles}`)
            .addField('Game/Playing', `${(user.presence.game && user.presence.game && user.presence.game.name) || 'None'}`, true)
            .addField('Status', user.presence.status, true)
            .addField('Bot', user.bot, true)
            .addField('Joined At:', `${player.joinedAt}`)
            .addField('Created At:', `${player.user.createdAt}`)
            .setThumbnail(iicon)
            .setTimestamp();
            message.channel.send(userEmbed)
            }        
        
                module.exports.help = {
                    name: "userinfo"
                }