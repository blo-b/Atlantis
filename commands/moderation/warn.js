const db = require(`quick.db`)
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'warn',
    aliases: ['w'],
    cooldown: 0,
    permissions: ["MANAGE_MESSAGES"],
    description: "This command allows you to warn members in the guild.",
    async execute(client, message, args, Discord, cmd) {
        const user = message.mentions.members.first()

        if (!user) {
            return message.channel.send("Please provide the person to who you want to warn!")
        }

        if (message.mentions.users.first().bot) {
            return message.channel.send("You aren't able to warn bots.")
        }

        if (message.author.id === user.id) {
            return message.channel.send("You aren't able warn yourself.")
        }

        const reason = args.slice(1).join(" ")

        if (!reason) {
            return message.channel.send("Please provide reason to warn.")
        }

        let warnings = db.get(`warnings_${message.guild.id}_${user.id}`)

        const mw = 5
        if (warnings === 5) {
            return message.channel.send(`${message.mentions.users.first().username} has already reached the limit with ${mw} warnings!`)
        }

        if (warnings === null) {
            db.set(`warnings_${message.guild.id}_${user.id}`, 1)
        } else if(warnings !== null) {
            db.add(`warnings_${message.guild.id}_${user.id}`, 1)

            const embed = new MessageEmbed()
            .setAuthor('Atlantis Bot', client.user.displayAvatarURL())
            .setTitle('Warned!')
            .setColor(process.env.DENIED)
            .setDescription(`You have been warned from **${message.guild.name}** for "${reason}"`)
            .setTimestamp()
            user.send(embed)

            const embed2 = new MessageEmbed()
            .setAuthor('Atlantis Bot', client.user.displayAvatarURL())
            .setTitle('Successfully warned!')
            .setColor(process.env.ACCEPTED)
            .setDescription(`You have successfully warned **${message.mentions.users.first().username}** for "${reason}".`)
            .setTimestamp()
            message.channel.send(embed2)
        }
    }
}
