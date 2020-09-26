require('dotenv'); // Load env configuration

const Discord = require('discord.js');
const client = new Discord.Client();

let eggCount = 0;
let cooldown = 0; // this is the variable used to store the last time a presence was posted
let cooldownAmount = 300000; // this is the number of milliseconds before the presence can be updated

client.on('ready', () => {
    cooldown = Date.now();
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', (msg) => {
    let content = msg.content.toLowerCase();
    if (content.includes('egg')) {
        msg.react('🥚');
        eggCount++;
        updatePresence(eggCount);
    } else if (content.includes('omelette')) {
        msg.react('🍴');
        eggCount--;
        updatePresence(eggCount);
    }
});

client.login(process.env.EGG_BOT_TOKEN);

function updatePresence(eggCount) {
    let now = Date.now(); // this is the current date used to compare with the cooldown
    let expirationTime = cooldown + cooldownAmount;

    if (now < expirationTime) {
        return;
    } // if the presence is attempting to get updated too quickily

    client.user.setPresence({
        activity: {
            name: `${eggCount} 🥚`,
        },
        status: 'online',
    });
    cooldown = now;
}
