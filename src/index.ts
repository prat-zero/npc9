// imports
import "dotenv/config";
import {
  ApplicationCommandDataResolvable,
  ChatInputCommandInteraction,
  Client,
  GatewayIntentBits,
} from "discord.js";
import { readdirSync } from "fs";
import { join } from "path";
import { slashCommandName } from "./helpers";

// custom process variable
declare var process: {
  env: {
    DISCORD_TOKEN: string;
  };
};

// initialize
const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

// an array of GLOBAL application commands only
const globalCommands: ApplicationCommandDataResolvable[] = [
  {
    name: "github",
    description:
      "Grab the link of the GitHub repo, where the primary development takes place",
  },
];

// create a new map to cache slash command responses
const slashCommandResponses = new Map<
  string,
  (interaction: ChatInputCommandInteraction) => Promise<void> | void
>();

// set the token
client.token = process.env.DISCORD_TOKEN;

// add listeners
client.on("ready", async () => {
  if (!client.user) throw new Error("User not found!");
  console.log(`Logged in as ${client.user.tag}`);

  if (!client.application) throw new Error("Application not found!");
  // await client.application.commands.set(globalCommands);

  readdirSync(join(__dirname, "slashCommands")).forEach((file) => {
    if (!(file.endsWith(".js") || file.endsWith(".ts"))) {
    } else {
      const mod = require(join(__dirname, "slashCommands", file));
      const exec = mod.default || mod.exec;
      slashCommandResponses.set(file.slice(0, -3), exec);
    }
  });

  // print the info
  console.log(`Loaded ${slashCommandResponses.size} slash command responses`);
});

client.on("interactionCreate", async (interaction) => {
  if (interaction.isChatInputCommand()) {
    const exec = slashCommandResponses.get(slashCommandName(interaction));
    if (!exec) throw new Error("Unkwon slash command invoked!");
    if (!interaction.replied) await exec(interaction);
  }
});

// login
client.login();
