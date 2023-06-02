import { CommandInteraction } from "discord.js";
import CustomClient from "../models/custom-client";
import { Logger } from "../utils";

const ERROR_MESSAGE = "There was an error while executing this command!";

export default (client: CustomClient, interaction: CommandInteraction) => {
  if (!interaction.isCommand()) return;
  
  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    command.run(client, interaction);
    Logger.log(
      `Command ${command.data.name} executed by ${interaction.user.tag}`,
      "info"
    );
  } catch (error) {
    console.error(error);
    if (interaction.deferred || interaction.replied) {
      interaction.followUp({
        content: ERROR_MESSAGE,
        ephemeral: true,
      });
    } else {
      interaction.reply({
        content: ERROR_MESSAGE,
        ephemeral: true,
      });
    }
  }
};