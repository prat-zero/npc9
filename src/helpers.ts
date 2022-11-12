// imports
import {
  ApplicationCommandOptionType,
  ChatInputCommandInteraction,
} from "discord.js";

// export a function to generate the slash command name in a specific format
export const slashCommandName = (
  interaction: ChatInputCommandInteraction
): string => {
  const option1 = interaction.options.data[0];

  if (option1?.type === ApplicationCommandOptionType.SubcommandGroup) {
    return `${interaction.commandName}.${option1.name}.${interaction.options.data[1].name}`;
  }

  if (option1?.type === ApplicationCommandOptionType.Subcommand) {
    return `${interaction.commandName}.${option1.name}`;
  }
  
  else return interaction.commandName;
};
