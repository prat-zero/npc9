// imports
import { ChatInputCommandInteraction } from "discord.js";

// the exec function
export const exec = async (interaction: ChatInputCommandInteraction) => {
  await interaction.reply({
    content: "https://github.com/prat-zero/npc9",
    ephemeral: true,
  });
};
