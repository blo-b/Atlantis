const cooldowns = new Map();
const db = require('quick.db');
const fs = require('fs');

module.exports = (Discord, client, message) => {
    const prefix = process.env.PREFIX;

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    const command = client.commands.get(cmd) ||
        client.commands.find(a => a.aliases && a.aliases.includes(cmd));


    //If cooldowns map doesn't have a command.name key then create one.
    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }

    const current_time = Date.now();
    const time_stamps = cooldowns.get(command.name);
    const cooldown_amount = (command.cooldown) * 1000;

    //If time_stamps has a key with the author's id then check the expiration time to send a message to a user.
    if (time_stamps.has(message.author.id)) {
        const expiration_time = time_stamps.get(message.author.id) + cooldown_amount;

        if (current_time < expiration_time) {
            const time_left = (expiration_time - current_time) / 1000;

            return message.reply(`Please wait ${time_left.toFixed(1)} more seconds before using ${command.name}`);
        }
    }

    //If the author's id is not in time_stamps then add them with the current time.
    time_stamps.set(message.author.id, current_time);
    //Delete the user's id once the cooldown is over.
    setTimeout(() => time_stamps.delete(message.author.id), cooldown_amount);

    try {
        command.execute(message, args, cmd, client, Discord);
    } catch (err) {
        message.reply("There was an error trying to execute this command!");
        console.log(err);
    }

}

module.exports = (Discord, client, message) => {
    const prefix = process.env.PREFIX


    const { Collection } = require("discord.js");
    client.commands = new Collection();
    client.guildonly = new Discord.Collection()

    //We let the bot read through the 'commands' folder and return an array including all category folders
    const categories = fs.readdirSync('./commands/');

    for (const category of categories) {
        const commandFiles = fs.readdirSync(`./commands/${category}`).filter(File => File.endsWith('.js'));
        //We now enter every sub-folder one by one and filter the files to include .js only, readdirSync() returns an array including the items/files in that directory 

        //We create an intended for loop (notice how the for loops are inside eachother)
        for (const file of commandFiles) {
            const command = require(`../commands/${category}/${file}`);
            //We grab that command-file and it's values, and we push it into the commands collection

            client.commands.set(command.name, command);
        }
    }
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd));

    const validPermissions = [
        "CREATE_INSTANT_INVITE",
        "KICK_MEMBERS",
        "BAN_MEMBERS",
        "ADMINISTRATOR",
        "MANAGE_CHANNELS",
        "MANAGE_GUILD",
        "ADD_REACTIONS",
        "VIEW_AUDIT_LOG",
        "PRIORITY_SPEAKER",
        "STREAM",
        "VIEW_CHANNEL",
        "SEND_MESSAGES",
        "SEND_TTS_MESSAGES",
        "MANAGE_MESSAGES",
        "EMBED_LINKS",
        "ATTACH_FILES",
        "READ_MESSAGE_HISTORY",
        "MENTION_EVERYONE",
        "USE_EXTERNAL_EMOJIS",
        "VIEW_GUILD_INSIGHTS",
        "CONNECT",
        "SPEAK",
        "MUTE_MEMBERS",
        "DEAFEN_MEMBERS",
        "MOVE_MEMBERS",
        "USE_VAD",
        "CHANGE_NICKNAME",
        "MANAGE_NICKNAMES",
        "MANAGE_ROLES",
        "MANAGE_WEBHOOKS",
        "MANAGE_EMOJIS",
    ]

    if (command.permissions.length) {
        let invalidPerms = []
        for (const perm of command.permissions) {
            if (!validPermissions.includes(perm)) {
                return console.log(`Invalid permission(s), ${perm}`);
            }
            
            if (!message.guild) {
                if (message.content.startsWith(prefix)) return;
                }
            if (!message.member.hasPermission(perm)) {
                invalidPerms.push(perm);
            }
        }
        if (invalidPerms.length) {
            return message.channel.send(`You're missing permissions! \`${invalidPerms}\``);
        }
    }



    if (command) command.execute(client, message, args, Discord);
    let blacklisted = db.get(`blacklist_${message.author.id}`) //here the bot is searching if the person typing  is blacklisted

    if (blacklisted === 1) return message.channel.send("Seems like your blacklisted from Atlantis, Contact blob#6676 to appeal."); //if it is blacklisted then you can return; 

}