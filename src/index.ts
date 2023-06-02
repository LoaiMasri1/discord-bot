import path from "path";
import { readdirSync } from "fs";
import { GatewayIntentBits, REST, Routes } from "discord.js";
import dotenv from "dotenv";
dotenv.config();
import CustomClient from "./models/custom-client";
import { Logger } from "./utils";
import { Command } from "./models";

const { BOT_TOKEN, GUILD_ID, CLIENT_ID } = process.env;

const client = new CustomClient({
  intents: [GatewayIntentBits.Guilds],
});

readdirSync(path.join(__dirname, "events")).forEach((file) => {
  client.on(file.split(".")[0], async (...args) =>
    (await import(`./events/${file}`)).default(client, ...args)
  );
  Logger.log(`Loaded event ${file.split(".")[0]}`, "event");
});

readdirSync(path.join(__dirname, "commands")).forEach((dir) => {
  readdirSync(path.join(__dirname, `commands/${dir}`)).forEach(async (file) => {
    const command = (await import(`./commands/${dir}/${file}`)).default as Command;
    if (!command || !command.data) return;
    client.commands.set(command.data.name, command);
    Logger.log(`Loaded command ${command.data.name}`, "cmd");
  });
});

const rest = new REST().setToken(BOT_TOKEN!);

(async () => {
  try {
    Logger.log(
      `Started refreshing ${client.commands.size} application (/) commands.`,
      "info"
    );

    await rest.put(Routes.applicationGuildCommands(CLIENT_ID!, GUILD_ID!), {
      body: client.commands.map((command) => JSON.stringify(command)),
    });
    
    Logger.log(
      `Successfully reloaded ${client.commands.size} application (/) commands.`,
      "info"
    );
  } catch (error) {
    Logger.log(error as string, "error");
  }
})();

client.login(BOT_TOKEN);
