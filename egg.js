require("dotenv"); // Load env configuration

const Discord = require('discord.js');
const client = new Discord.Client();

let eggCount = 0;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setPresence({
    game: { 
	  name: `${eggCount} eggs.`,
	  type: 'WATCHING'
	},
	status: 'idle'
  })
});

client.on('message', msg => {
  if(msg.content.includes("egg")){
	msg.react('🥚');
	eggCount++;
	client.user.setPresence({
      game: { 
        name: `${eggCount} eggs.`,
        type: 'WATCHING'
      },
      status: 'idle'
    })
  }
});

client.login(process.env.EGG_BOT_TOKEN);
