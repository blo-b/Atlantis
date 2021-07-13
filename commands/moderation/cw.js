const db = require('quick.db')
const { MessageEmbed } = require('discord.js');//require the packages

module.exports = {
    name: 'clearw',
    aliases: ['cw'],
    cooldown: 20,
    permissions: ["MANAGE_MESSAGES"],
    description: "Clears all warnings for a user.",
    async execute(client, message, args, Discord, cmd) {

        const user = message.mentions.members.first()

        if (!user) {
            return message.channel.send("Please provide a user.")
        }
        if (message.mentions.users.first().bot) {
            return message.channel.send("Bots aren't allowed to have warnings.")
        }
        if (message.author.id === user.id) {
            return message.channel.send("You aren't allowed to reset your own warnings.")
        }
        let warnings = db.get(`warnings_${message.guild.id}_${user.id}`)
        if (warnings === null) {
            return message.channel.send(`${message.mentions.users.first().username} doesn't have any warnings.`)
        }
        const embed = new MessageEmbed()
        .setAuthor('Atlantis Bot', client.user.displayAvatarURL())
        .setTitle('Warnings Reset')
        .setColor(process.env.ACCEPTED)
        .setDescription(`Successfully reseted all warnings from ${message.mentions.users.first().username}!`)
        .setTimestamp()
        const embed2 = new MessageEmbed()
        .setAuthor('Atlantis Bot', client.user.displayAvatarURL())
        .setTitle('Warnings Reset')
        .setColor(process.env.ACCEPTED)
        .setDescription(`Your warnings have been set to 0 by ${message.author.id}!`)
        .setTimestamp()
        db.delete(`warnings_${message.guild.id}_${user.id}`)
        user.send(embed2)
        message.channel.send(embed)
    }
}