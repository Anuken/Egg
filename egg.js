require('dotenv'); // Load env configuration

const Discord = require('discord.js');
const client = new Discord.Client();

let eggCount = 0;

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', (msg) => {
    let content = msg.content.toLowerCase();
    if (content.includes('egg')) {
        msg.react('🥚');
        eggCount++;
        updatePresence(eggCount);
    } else if (content.includes('omlette')) {
        msg.react('🍴');
        eggCount--;
        updatePresence(eggCount);
    }
});

client.login(process.env.EGG_BOT_TOKEN);

function updatePresence(eggCount) {
    client.user.setPresence({
        activity: {
            name: `${eggCount} 🥚`,
        },
        status: 'online',
    });
}
