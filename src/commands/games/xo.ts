import {
  ActionRowBuilder,
  ApplicationCommandOptionType,
  ButtonBuilder,
  ButtonStyle,
  CollectorFilter,
  Colors,
  CommandInteraction,
  EmbedBuilder,
  StringSelectMenuInteraction,
} from "discord.js";
import { Command } from "../../models";
import CustomClient from "../../models/custom-client";

export default {
  data: {
    name: "xo",
    description: "Play a game of tic-tac-toe with a friend.",
    options: [
      {
        name: "user",
        description: "The user you want to play with.",
        type: ApplicationCommandOptionType.User,
        required: true,
      },
    ],
  },
  async run(client: CustomClient, interaction: CommandInteraction) {
    await interaction.deferReply();
    const user = interaction.options.getUser("user");

    if (user === interaction.user) {
      await interaction.editReply({
        embeds: [
          new EmbedBuilder()
            .setTitle("You can't play with yourself!")
            .setColor(Colors.Red)
            .setDescription("You can't play with yourself!"),
        ],
      });
      return;
    }
    if (user?.bot) {
      await interaction.editReply({
        embeds: [
          new EmbedBuilder()
            .setTitle("You can't play with a bot!")
            .setColor(Colors.Red)
            .setDescription("You can't play with a bot!"),
        ],
      });
      return;
    }

    const xEmoji = "❌";
    const oEmoji = "⭕";

    const row1 = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setCustomId("1")
        .setLabel("1")
        .setStyle(ButtonStyle.Primary)
        .setDisabled(false),
      new ButtonBuilder()
        .setCustomId("2")
        .setLabel("2")
        .setStyle(ButtonStyle.Primary)
        .setDisabled(false),
      new ButtonBuilder()
        .setCustomId("3")
        .setLabel("3")
        .setStyle(ButtonStyle.Primary)
        .setDisabled(false)
    );

    const row2 = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setCustomId("4")
        .setLabel("4")
        .setStyle(ButtonStyle.Primary)
        .setDisabled(false),
      new ButtonBuilder()
        .setCustomId("5")
        .setLabel("5")
        .setStyle(ButtonStyle.Primary)
        .setDisabled(false),
      new ButtonBuilder()
        .setCustomId("6")
        .setLabel("6")
        .setStyle(ButtonStyle.Primary)
        .setDisabled(false)
    );

    const row3 = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setCustomId("7")
        .setLabel("7")
        .setStyle(ButtonStyle.Primary)
        .setDisabled(false),
      new ButtonBuilder()
        .setCustomId("8")
        .setLabel("8")
        .setStyle(ButtonStyle.Primary)
        .setDisabled(false),
      new ButtonBuilder()
        .setCustomId("9")
        .setLabel("9")
        .setStyle(ButtonStyle.Primary)
        .setDisabled(false)
    );

    const message = await interaction.editReply({
      content: `Let's play Tic-Tac-Toe! With <@${user?.id}> with <@${interaction.user.id}>! \n\n ${xEmoji} = <@${user?.id}> \n ${oEmoji} = <@${interaction.user.id}>`,
      components: [row1, row2, row3],
    });

    const filter: CollectorFilter<any> = (i: StringSelectMenuInteraction) =>
      i.customId === "1" ||
      i.customId === "2" ||
      i.customId === "3" ||
      i.customId === "4" ||
      i.customId === "5" ||
      i.customId === "6" ||
      i.customId === "7" ||
      i.customId === "8" ||
      i.customId === "9";

    const collector = message.createMessageComponentCollector({
      filter,
      time: 60000,
    });

    const board = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

    let turn = 0;

    collector.on("collect", async (i: StringSelectMenuInteraction) => {
      if (i.user.id === user?.id) {
        if (turn % 2 === 0) {
          board[parseInt(i.customId) - 1] = xEmoji;
          turn++;
        } else {
          await i.reply({
            content: "It's not your turn!",
            ephemeral: true,
          });
          return;
        }
      } else if (i.user.id === interaction.user.id) {
        if (turn % 2 === 1) {
          board[parseInt(i.customId) - 1] = oEmoji;
          turn++;
        } else {
          await i.reply({
            content: "It's not your turn!",
            ephemeral: true,
          });
          return;
        }
      }

      const row1 = new ActionRowBuilder<ButtonBuilder>().addComponents(
        new ButtonBuilder()
          .setCustomId(board[0])
          .setLabel(board[0])
          .setStyle(ButtonStyle.Primary)
          .setDisabled(true),
        new ButtonBuilder()
          .setCustomId(board[1])
          .setLabel(board[1])
          .setStyle(ButtonStyle.Primary)
          .setDisabled(true),
        new ButtonBuilder()
          .setCustomId(board[2])
          .setLabel(board[2])
          .setStyle(ButtonStyle.Primary)
          .setDisabled(true)
      );

      const row2 = new ActionRowBuilder<ButtonBuilder>().addComponents(
        new ButtonBuilder()
          .setCustomId(board[3])
          .setLabel(board[3])
          .setStyle(ButtonStyle.Primary)
          .setDisabled(true),
        new ButtonBuilder()
          .setCustomId(board[4])
          .setLabel(board[4])
          .setStyle(ButtonStyle.Primary)
          .setDisabled(true),
        new ButtonBuilder()
          .setCustomId(board[5])
          .setLabel(board[5])
          .setStyle(ButtonStyle.Primary)
          .setDisabled(true)
      );

      const row3 = new ActionRowBuilder<ButtonBuilder>().addComponents(
        new ButtonBuilder()
          .setCustomId(board[6])
          .setLabel(board[6])
          .setStyle(ButtonStyle.Primary)
          .setDisabled(true),
        new ButtonBuilder()
          .setCustomId(board[7])
          .setLabel(board[7])
          .setStyle(ButtonStyle.Primary)
          .setDisabled(true),
        new ButtonBuilder()
          .setCustomId(board[8])
          .setLabel(board[8])
          .setStyle(ButtonStyle.Primary)
          .setDisabled(true),
        new ButtonBuilder()
          .setCustomId("end")
          .setLabel("End")
          .setStyle(ButtonStyle.Danger)
          .setDisabled(false)
      );

      await i.update({
        content: `Let's play Tic-Tac-Toe! With <@${user?.id}> with <@${interaction.user.id}>! \n\n ${xEmoji} = <@${user?.id}> \n ${oEmoji} = <@${interaction.user.id}>`,
        components: [row1, row2, row3],
      });
    });
  },
} as Command;
