import { Client, Collection, GatewayIntentBits, REST, Routes } from 'discord.js';
import dotenv from 'dotenv';
import config from '../config.json' with { type: 'json' };
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


client.once('ready', async () => {
    console.log(`Logged in as ${client.user?.tag}!`);

    const rest = new REST({ version: '10' }).setToken(token);
    try {
        console.log('Started refreshing application (/) commands.');

        const commands = [
            setPingResponseMsg.data.toJSON(),
        ];

        if (client.user) {
            await rest.put(
                Routes.applicationCommands(client.user.id),
                { body: commands }
            );
        }

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
});

// Basic ping-pong message response
client.on('messageCreate', (message) => {
    if (message.content === '!ping') {
        message.reply('Pong!');
    }
});

// Set ping response message slash command
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;
    if (interaction.commandName === 'set-ping-response') {
        await setPingResponseMsg.execute(interaction);
    }
});

client.login(token);