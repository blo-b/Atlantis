module.exports = {
    name: 'docs',
    aliases: ['search'],
    cooldown: 0,
    permissions: ["SEND_MESSAGES"],
    description: "Looks up Discord.js docs",
    async execute(client, message, args, Discord, cmd) {
        const axios = require('axios')
        if (!args.length) return message.channel.send(client.main);
        const uri = `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(args.join(' '))}`;
        axios.get(uri)
        .then(async(embed) => {
            const { data } = embed
            
            if (data && !data.error) {
                const { timeout } = require("reconlx");
                
                const messageToDelete = await message.channel.send({embed: data})
    
                timeout(message, messageToDelete, 5000);
            } else {
                message.reply(new MessageEmbed().setColor(process.env.DENIED).setDescription(`${process.env.DENIED} Couldn't find that query`)); 
            }
        })
        .catch(err => {
            console.log(err)
        }) 
    }
}