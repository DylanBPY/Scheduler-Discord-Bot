import { SlashCommandBuilder, userMention, ChatInputCommandInteraction } from 'discord.js';

let user: string | null = null;

const setPingResponseMsg = {
    data: new SlashCommandBuilder()
        .setName('set-ping-response')
        .setDescription('Sets the message that the bot will automatically reply with when you are pinged.')
        .addStringOption((option) =>
            option
                .setName('message')
                .setDescription('The response to reply with.')
                .setRequired(true)
        ),
    async execute(interaction: ChatInputCommandInteraction) {
        user = interaction.user.id;
        await interaction.reply(
            userMention(user) +
                ' Your ping response message has been set to: ' +
                interaction.options.getString('message', true)
        );
    },
};

export default setPingResponseMsg;
