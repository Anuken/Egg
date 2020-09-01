const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if(msg.content.includes("egg")){
    msg.react('🥚');
  }
});

client.login(process.env.EGG_BOT_TOKEN);
