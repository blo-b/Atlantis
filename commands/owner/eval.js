const { Client, Message, MessageEmbed, MessageAttachment } = require("discord.js");
const { inspect } = require("util");

module.exports = {
    name: 'eval',
    aliases: [],
    cooldown: 0,
    permissions: ["ADMINISTRATOR"],
    description: "executes stuff",
    async execute(client, message, args, Discord, cmd) {
        if(message.author.id != 819659487140773939) return message.channel.send("This can only be ran by the bot owner!") //add your id without quotes
        if (!args[0]) return message.channel.send(client.main);
        let code = args.join(' ')
        code = code.replace(/[""]/g, '"').replace(/['']/g, "'")

        let evaled;
        try {
            const start = process.hrtime()
            evaled = eval(code);
            if (evaled instanceof Promise) {
                evaled = await eval
            }
            const stop = process.hrtime(start);
            let response = [
                `**OutPut: \`\`\`js\n${(inspect(evaled, { depth: 0 }))}\n\`\`\``
                //, `**Type:** \`\`\`ts\n${new Type(evaled).is}\n\`\`\``
                , `**Time taken: \`\`\`${(((stop[0] * 1e9) + stop[1])) / 1e6}ms \`\`\``
            ]
            const res = response.join('\n')
            if (res.length < 2000) {
                await message.channel.send(res)
            } else {
                const output = new MessageAttachment(Buffer.from(res), 'output.txt');
                await message.channel.send(output);

            }
        } catch (error) {
            message.reply(`An error has occured \n \n \`${error}\``)
        }
    }
}