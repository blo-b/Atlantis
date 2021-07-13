const db = require('quick.db');
const { MessageEmbed } = require('discord.js');//require the packages

module.exports = {
    name: 'warnings',
    aliases: ['ws'],
    cooldown: 10,
    permissions: ["MANAGE_MESSAGES"],
    description: "Checks the warnings for a user",
    async execute(client, message, args, Discord, cmd) {
        const user = message.mentions.members.first() || message.author
        let warnings = db.get(`warnings_${message.guild.id}_${user.id}`)
        if(warnings === null) warnings = 0;
        const embed = new MessageEmbed()
        .setAuthor('Atlantis Bot', client.user.displayAvatarURL())
        .setTitle('Warnings')
        .setColor(process.env.MAIN_COLOR)
        .setDescription(`${user} have **${warnings}** warns.`)
        .setTimestamp()
        message.channel.send(embed)
    }
}