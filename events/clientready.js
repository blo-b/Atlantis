const Discord = require("discord.js");
const client = new Discord.Client();

module.exports = () => {
        console.log(`Successfully connected to Discord.Client! This is coming from ./events/clientready.js/`);
}