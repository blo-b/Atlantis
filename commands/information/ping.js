// @ts-check // Can be removed, used to check typings and valid actions
const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
  name: 'ping',
  aliases: [],
  permissions: ["SEND_MESSAGES"],
  description: 'Get bot ping.',
  async execute(client, message) {
    let blacklisted = db.get(`blacklist_${message.author.id}`) //here the bot is searching if the person typing  is blacklisted

    if(blacklisted === 1) return message.channel.send(""); //if it is blacklisted then you can return; 
    
    const ping = await getDBPingData();
    const messagePing = Date.now(); // start before message sent
    const msg = await message.channel.send('Loading...');
    const endMessagePing = Date.now() - messagePing; // end of message sent

    const embed = new MessageEmbed() // build message embed
      .setDescription(
        `
        Database ping data:
        - Fetch ping: \`${ping.endGet}ms\`
        - Wright ping: \`${ping.endWright}ms\`
        - Average ping: \`${ping.avarage}ms\`
        Message ping: \`${endMessagePing}ms\`
      `
      )
      .setColor(process.env.MAIN_COLOR)
      .setTimestamp();

    msg.edit({
      content: '',
      embed,
    }); // edit message content
  },
};

async function getDBPingData() {
  // get the fetch data ping
  const startGet = Date.now();
  await db.get('QR=.');
  const endGet = Date.now() - startGet;

  // get the wright data ping
  const startWright = Date.now();
  await db.set('QR=.', Buffer.from(startWright.toString()).toString('base64'));
  const endWright = Date.now() - startWright;

  // avrage ping time
  const avarage = (endGet + endWright) / 2;
  try {
    db.delete('QR=.'); // try deleteing
  } catch (error) {}
  return { endGet, endWright, avarage }; // return the ping data
}