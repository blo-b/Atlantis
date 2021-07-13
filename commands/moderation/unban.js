const db = require('quick.db')
const { MessageEmbed } = require('discord.js');//require the packages
module.exports = {
    name: 'unban',
    aliases: ['ub'],
    cooldown: 60,
    permissions: ["BAN_MEMBERS"],
    description: "This unbans a user from the guild",
    async execute(client, message, args, Discord, cmd) {
        let blacklisted = db.get(`blacklist_${message.author.id}`) //here the bot is searching if the person typing  is blacklisted

        if (blacklisted === 1) return message.channel.send(""); //if it is blacklisted then you can return; 

        const user_id = args[0];
        if (!user_id) return message.channel.send(client.main);
        try {
            client.users.fetch(user_id)
        } catch {
            return message.channel.send(client.noUser);
        }

        const mm = await client.users.fetch(user_id)

        message.guild.members.unban(user_id).then(() => {

            client.userlogs(user_id, message.guild.id, 'unban', message);
            message.channel.send("Send this error to blob#6676")
        }).catch((e) => {
            const embed = new MessageEmbed()
            .setAuthor('Atlantis Bot', client.user.displayAvatarURL())
            .setTitle('Successfully unbanned!')
            .setColor(process.env.ACCEPTED)
            .setDescription(`Successfully unbanned the user provided!`)
            .setTimestamp()
            message.channel.send(embed)
        })
    }
}
