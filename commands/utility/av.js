const db = require('quick.db');

module.exports = {
    name: 'avatar',
    aliases: ['icon', 'pfp', 'av'],
    permissions: ["SEND_MESSAGES"],
    description: 'Return a user(s) avatar picture!',
    //Use your own execute parameters
    execute(client, message, cmd, args) {
        let blacklisted = db.get(`blacklist_${message.author.id}`) //here the bot is searching if the person typing  is blacklisted

        if(blacklisted === 1) return message.channel.send(""); //if it is blacklisted then you can return; 

        if (!message.mentions.users.size) {
            return message.channel.send(`**Your Avatar: ** ${message.author.displayAvatarURL({ dynamic: true })}`);
        }

        const avatar_list = message.mentions.users.map(user => {
            return `**${user.username}'s Avatar: ** ${user.displayAvatarURL({ dynamic: true })}`;
        });

        message.channel.send(avatar_list);
    }
}