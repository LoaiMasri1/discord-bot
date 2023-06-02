import { CommandInteraction } from "discord.js";
import { Command } from "../../models";
import CustomClient from "../../models/custom-client";

export default {
  data: {
    name: "ping",
    description: "Replies with pong!",
  },
  run: async (client: CustomClient, interaction: CommandInteraction) => {
    await interaction.reply(`🐱‍🏍 Pong! ${client.ws.ping}ms`);
  },
} as Command;
