module.exports = {
    name: 'nickname',
    aliases: ['nn'],
    cooldown: 30,
    permissions: ["MANAGE_NICKNAMES"],
    description: "Changes nickname for the provided user",
    async execute(client, message, args, Discord, cmd) {
        const member = message.mentions.members.last() ? message.mentions.members.last() : args[0];

        let mm;
        try {
            if (member === args[0]) mm = await message.guild.members.fetch(args[0]); else mm = await message.mentions.members.last();
        } catch { }

        if (!mm) return message.channel.send(client.noMember);

        if (mm.id === client.user.id) return message.channel.send(client.main);

        const nickName = args.slice(1).join(' ');
        if (!nickName) return message.channel.send(`kek`);

        if (!mm.manageable) {
            return message.channel.send(client.roleHigher);
        }

        mm.setNickname(nickName).then(() => {

            client.userlogs(mm.id, message.guild.id, 'nickname change', message);
            message.channel.send(`${mm.user.username} nickname is now ${nickName}.`)

        }).catch(() => {
            message.channel.send(`${mm.user.username} nickname is now ${nickName}.`);
        })
    }
}