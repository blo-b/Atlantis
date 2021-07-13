const db = require('quick.db')
const { MessageEmbed } = require('discord.js');//require the packages

module.exports = {
    name: 'help',
    aliases: ['h'],
    cooldown: 0,
    permissions: ["EMBED_LINKS"],
    description: "Shows available commands.",
    async execute(client, message, args, Discord, cmd) {
        const user = message.mentions.members.first() || message.author
        const help = new MessageEmbed()
        .setAuthor('Atlantis Bot', client.user.displayAvatarURL())
        .setColor(process.env.MAIN_COLOR)
        .setTitle(`Prefix: ` + process.env.PREFIX)
        .addFields({
            name: 'About Atlantis Bot',
            value: 'This is a bot created by blob#6676, mainly for beta-testing.',
        },
        {
            name: 'Fun',
            value: '`8ball`',
        },
        {
            name: 'Information',
            value: '`help` | `ping` | `serverinfo` | `uptime` | `whois`'
        },
        {
            name: 'Moderation',
            value: '`ban` | `cw` | `kick` | `unban` | `warn` | `warnings` | `nickname`',
        },
        {
            name: 'Utility',
            value: '`av` | `say` | `docs`',
        })
        .setTimestamp()
        message.channel.send(help);
    }
}