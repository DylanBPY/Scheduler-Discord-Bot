import { Client, Collection, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
import config from '../config.json' with { type: 'json' };
import path from 'node:path/win32';
import setPingResponseMsg from './commands/util/setPingResponseMsg.js';

dotenv.config();
const token = config.DISCORD_TOKEN;
//const commandFiles = path.join(__dirname, 'commands', 'util');


const comm = new Collection();

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

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;
    if (interaction.commandName === 'set-ping-response') {
        await setPingResponseMsg.execute(interaction);
    }
});

client.login(token);
