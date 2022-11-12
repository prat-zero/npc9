import "dotenv/config";
import { Client, GatewayIntentBits } from "discord.js";

declare var process: {
  env: {
    DISCORD_TOKEN: string;
  };
};

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.token = process.env.DISCORD_TOKEN;

client.on("ready", async () => {
  client.application?.commands.set([
    {
      name: "beep",
      description: "Beep boop? Boop beep!",
    }
  ]);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.inGuild() && interaction.isRepliable()) {
    await interaction.reply({ content: "MOBO", ephemeral: true });
    return;
  }
});

client.login();
