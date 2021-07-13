const db = require('quick.db')
const { MessageEmbed } = require('discord.js');//require the packages

module.exports = {
    name: 'ban',
    aliases: ['b'],
    cooldown: 0,
    permissions: ["BAN_MEMBERS"],
    guildOnly: ["true"],
    description: "Bans a member from the guild",
    execute(client, message, args, Discord, cmd) {

        let blacklisted = db.get(`blacklist_${message.author.id}`)
        if (blacklisted === 1) return message.channel.send("");

        if(!message.guild) return

        const user = message.mentions.members.first() || message.author
        const embed = new MessageEmbed()
            .setAuthor('Atlantis Bot', client.user.displayAvatarURL())
            .setTitle('Successfully banned!')
            .setColor(process.env.ACCEPTED)
            .setDescription(`Successfully banned ${user.tag}`)
            .setTimestamp()

        const embed2 = new MessageEmbed()
            .setAuthor('Atlantis Bot', client.user.displayAvatarURL())
            .setTitle('You\'ve been banned!')
            .setColor(process.env.DENIED)
            .setDescription(`Banned from Atlantis`)
            .setTimestamp()

        const embed3 = new MessageEmbed()
            .setAuthor('Atlantis Bot', client.user.displayAvatarURL())
            .setColor(process.env.DENIED)
            .setTitle(`Exception Caught! FVCr7P>`)
            .setDescription(`This is generally due to the bot not being able to ban the member, or role hierarchy.`)
            .setTimestamp()
        // If we have a user mentioned
        if (user) {
            // Now we get the member from the user
            const member = message.guild.member(user);
            // If the member is in the guild
            if (member) {
                user.send(embed2)
                /**
                 * Ban the member
                 * Make sure you run this on a member, not a user!
                 * There are big differences between a user and a member
                 * Read more about what ban options there are over at
                 * https://discord.js.org/#/docs/main/master/class/GuildMember?scrollTo=ban
                 */

                member
                    .ban({
                        reason: 'Banned from Atlantis',
                    })
                    .then(() => {
                        // We let the message author know we were able to ban the person
                        message.channel.send(embed)
                    })
                    .catch(err => {
                        // An error happened
                        // This is generally due to the bot not being able to ban the member,
                        // either due to missing permissions or role hierarchy
                        user.send(embed3)
                        console.log('Exception Caught! FVCr7P>')
                        message.channel.send(embed3); return
                        // Log the error
                        console.error(err);
                    });
            } else {
                // The mentioned user isn't in this guild
                message.reply("The user provided isn't in this guild.");
            }
        } else {
            // Otherwise, if no user was mentioned
            message.reply("You didn't provide a user to ban.");
        }
    }
}