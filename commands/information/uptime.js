const ms = require('ms')

module.exports = {
    name: 'uptime',
    aliases: ['ut'],
    cooldown: 10,
    permissions: ["SEND_MESSAGES"],
    description: "Shows how long the bot has been online",
    async execute(client, message, args, Discord, cmd) {
        message.channel.send('Fetching uptime..').then((m) => {
            m.edit(`Uptime is: \`${ms(client.uptime)}\``)
        })
    }
}
