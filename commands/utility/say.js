const db = require('quick.db');

module.exports = {
    name: "say",
    aliases: ["s"],
    permissions: ["MANAGE_MESSAGES"],
    description: "Says something as the bot",

    async execute (client, message, args){  
        let blacklisted = db.get(`blacklist_${message.author.id}`) //here the bot is searching if the person typing  is blacklisted

        if(blacklisted === 1) return message.channel.send(""); //if it is blacklisted then you can return; 

        if (message.content.includes("@everyone") || (message.content.includes("@here"))) return// if the message content includes @everyone OR ( || means or in js) @here, stop running the code. 
 
        if(!message.member.permissions.has('MANAGE_MESSAGES')) return // if the user running the command doesn't have permissions to mannage messages, stop running the code. ! means no or doesn't in js.

        let textChannel = message.mentions.channels.first() // the first channel that you tag
        if(!args[1]) return message.channel.send('Provide a channel for me to send the message in!'); // args are words or numbers after the command. The first word is args[0], and then args[1], and so on and so on.
        if(!args[0]) return message.channel.send('Provide a message to say!');
        if (!message.guild.channels.cache.has(textChannel.id)) return; // here we're checking if the textChannel id provided is in the server where the message is being sent.
        message.delete() // deleting the command message

            msg = args.slice(1).join(" "); // everything including and after args[1]
            textChannel.send(msg) // sending the message in the text channel provided

        }
    }