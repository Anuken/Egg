require('dotenv'); // Load env configuration

const Discord = require('discord.js');
const client = new Discord.Client();

let eggCount = 0;
let cooldown = 0; // this is the variable used to store the last time a presence was posted
let cooldownAmount = 300000; // this is the number of milliseconds before the presence can be updated
let eggsCreated = 0;

client.on('ready', () => {
    cooldown = Date.now();
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', (msg) => {
    let content = msg.content.toLowerCase();
    if (content.startsWith('🥚?')) {
        return msg.channel.send(`${eggCount}🥚`);
    }
    if (content.startsWith('🥚!')) {
        return msg.channel.send(`${eggsCreated}🥚`);
    }
    if (content.includes('egg')) {
        msg.react('🥚');
        eggCount++;
        eggsCreated++;
    } else if (content.includes('omelette')) {
        // you can remove this if you prefer
        msg.react('🍴');
        eggCount--;
    }
    return updatePresence(eggCount);
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
