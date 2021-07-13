const db = require("quick.db");
const { MessageEmbed } = require('discord.js');//require the packages

module.exports = {
    name: 'blacklist',
    description: 'Blacklists a user from using the bot',
    aliases: ['block'],
    permissions: ['SEND_MESSAGES'],
    cooldown: 0,
    execute: async (client, message, args, text, prefix) => { //change all this previous lines to your normal parameters
        if(message.author.id != 819659487140773939) return message.channel.send("This can only be ran by the bot owner!") //add your id without quotes
        
        let user;
        if (message.mentions.users.first()) {
          user = message.mentions.users.first();
        } else if (args[0]) {
          user = message.guild.members.cache.get(args[0]).user;
        } 
        
        if(!user) return message.channel.send("You forgot to specify a user!")
        let blacklist = db.get(`blacklist_${user.id}`)
  
        if(blacklist === null) {
            db.set(`blacklist_${user.id}`, 1);
        const embed = new MessageEmbed()
        .setAuthor('Atlantis Bot', client.user.displayAvatarURL())
        .setTitle('Blacklisted!')
        .setColor(process.env.MAIN_COLOR)
        .setDescription('Damn, It looks like you have been blacklisted from Atlantis Bot!')
        .setTimestamp()
        user.send(embed)

        message.channel.send(`${user} is now blacklisted.`)
        } else if(blacklist !== null) {
            message.channel.send(`The person you provided is already blacklisted.`)
        } return;
    }
}