const db = require('quick.db')
const { MessageEmbed } = require('discord.js');//require the packages

module.exports = {
    name: 'serverinfo',
    aliases: ['si'],
    cooldown: 30,
    permissions: ["SEND_MESSAGES"],
    description: "This command shows the info of your server!",
    async execute(client, message, args, Discord, cmd) {
        const owner = message.guild.ownerID
        const botCount = message.guild.members.cache.filter(m => m.user.bot).size;

        let embed = new MessageEmbed()
            .setColor(process.env.MAIN_COLOR)
            .setTitle(`${message.guild.name}`)
            .addField("**Owner:**", `<@${owner}>`, true)
            .addField("Region", message.guild.region, true)
            .addField("Members", message.guild.memberCount - botCount, true)
            .addField('Bots', botCount, true)
            .addField('**Created on**', message.guild.createdAt.toUTCString(), true)
            .setThumbnail(message.guild.iconURL())
            .setFooter(`${message.author.username}`, message.author.displayAvatarURL())
        message.channel.send(embed)
    }
}
