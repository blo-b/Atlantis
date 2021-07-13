const { Channel } = require("discord.js")
const db = require('quick.db')
const { MessageEmbed } = require('discord.js');//require the packages

module.exports = {
  name: 'kick',
  aliases: ['k'],
  cooldown: 60,
  permissions: ["KICK_MEMBERS"],
  description: "Kicks a member from the guild",
  execute(client, message, args, Discord, cmd) {
    let blacklisted = db.get(`blacklist_${message.author.id}`) //here the bot is searching if the person typing  is blacklisted

    if (blacklisted === 1) return message.channel.send(""); //if it is blacklisted then you can return; 
    const embed = new MessageEmbed()
    const user = message.mentions.members.first()
    // If we have a user mentioned
    if (user) {
      // Now we get the member from the user
      const member = message.guild.member(user);
      // If the member is in the guild
      if (member) {
        /**
         * Kick the member
         * Make sure you run this on a member, not a user!
         * There are big differences between a user and a member
         */
        member
          .kick('Kicked by Atlantis Bot')
          .then(() => {
            // We let the message author know we were able to kick the person
            message.channel.send("Successfully kicked the user!")
          })
          .catch(err => {
            // An error happened
            // This is generally due to the bot not being able to kick the member,
            // either due to missing permissions or role hierarchy
            message.reply('I was unable to kick the member');
            // Log the error
            console.error(err);
          });
      } else {
        // The mentioned user isn't in this guild
        message.reply("That user isn't in this guild!");
      }
      // Otherwise, if no user was mentioned
    } else {
      message.reply("You didn't mention the user to kick!");
    }
  }
}