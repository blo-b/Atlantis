// ---------------------[    REQUIRED MODULES    ]--------------------- \\

const Discord = require("discord.js");
const client = new Discord.Client();
const { MessageEmbed } = require('discord.js');//require the packages
require('dotenv').config();

// ---------------------[    COMMAND HANDLER    ]--------------------- \\

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler => {
  require(`./handlers/${handler}`)(client, Discord);
})

// ---------------------[    COMMAND HANDLER    ]--------------------- \\

// ---------------------[    USER/SERVER CUSTOMIZATION    ]--------------------- \\
const dm = new MessageEmbed()
.setAuthor('Atlantis Bot') //message.channel.send(message.author.avatarURL({ dynamic:true }));
.setColor('EA4825')
.setTitle(`Failed to execute.`)
.setDescription(`You sent a DM to Atlantis, so your command failed to execute.`)
.setTimestamp()

client.on('guildMemberAdd', guildMember => {
  let welcomeRole = guildMember.guild.roles.cache.find(role => role.name === 'new role');

  guildMember.roles.add(welcomeRole);
  guildMember.guild.channels.cache.get('864039945194831932').send(`<@${guildMember.user.id}> has connected to the server.`)
    .then(wlc => {
      console.log(`Member has joined`)
    })
    .catch(err => {
      console.log(err)
    })

});

client.on('message', message => {
  if (message.author.bot) return
  if (message.channel.type == "dm") {
    message.channel.send(dm)
    .then(() => {
      console.log(`Failed to execute command. type: DM`)
    })
    .catch(err => {
      console.log(err)
    })
  }
})

client.on('ready', () => {
  console.log(`${client.user.tag} has successfully connected to status! This is coming from ./index.js/`)
  client.user.setActivity('>help', ({ type: "PLAYING" }))
    .catch(err => {
      console.log(err)
    })
})

// ---------------------[    USER/ SERVER CUSTOMIZATION    ]--------------------- \\

client.login(process.env.DISCORD_TOKEN)


// ---------------------[    END OF INDEX.JS    ]--------------------- \\