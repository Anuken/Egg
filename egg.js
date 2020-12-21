require("dotenv"); // Load env configuration

const Discord = require('discord.js');
const client = new Discord.Client();

let eggCount = 0;

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
	if(msg.content.toLowerCase().includes("egg")){
		msg.react('🥚');
		eggCount++;
		client.user.setPresence({
			activity: { 
				name: `${eggCount} 🥚`
			},
			status: 'online'
		})
	}
});
client.on('message', msg => {
if(msg.channel.fetchMessage(261323096617779201)){
msg.delete();
}};
client.login(process.env.EGG_BOT_TOKEN);
