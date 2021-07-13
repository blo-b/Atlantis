const db = require("quick.db");//require the packages
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'whitelist',
    description: 'Whitelist a user',
    cooldown: 0,
    permissions: ['SEND_MESSAGES'],
    aliases: ['unblock'],
    execute: async (client, message, args, text, prefix) => {//everyone haves different execute parameters
        if(message.author.id != 819659487140773939) return message.channel.send("This can only be ran by the bot owner!") //add your id without quotes
        
        let user;
        if (message.mentions.users.first()) {
          user = message.mentions.users.first();
        } else if (args[0]) {
          user = message.guild.members.cache.get(args[0]).user;
        } 
        
        if(!user) return message.channel.send("You forgot to specify a user!")
    
        let blacklist = db.get(`blacklist_${user.id}`)
        
        if(blacklist === 0 || blacklist === null) return message.channel.send(`${user} is not blacklisted.`) //here you are checking if the user is already blacklisted
        
        const embed = new MessageEmbed()
        .setAuthor('Atlantis Bot', client.user.displayAvatarURL())
        .setTitle('Whitelisted!')
        .setColor(process.env.MAIN_COLOR)
        .setDescription('Woah, It looks like you have been whitelisted from Atlantis Bot!')
        .setTimestamp()
        user.send(embed)

        message.channel.send(`${user} has been whitelisted!`)
    db.delete(`blacklist_${user.id}`, 1)//here you delete the "blacklist" status from the database
    }
}