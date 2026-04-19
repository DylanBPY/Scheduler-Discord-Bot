import { Client, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
import config from '../config.json' with { type: 'json' };


dotenv.config();
const token = config.DISCORD_TOKEN;

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

client.once('clientReady', () => {
    console.log(`Logged in as ${client.user?.tag}!`);
});

// Basic message response
client.on('messageCreate', (message) => {
    if (message.content === '!ping') {
        message.reply('Pong!');
    }
});

client.login(token);
