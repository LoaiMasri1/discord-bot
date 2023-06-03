import { movieCategoriesChoices } from "../../constants";
import { Command } from "../../models";
import {
  ActionRowBuilder,
  ApplicationCommandOptionType,
  ButtonBuilder,
  ButtonStyle,
  CollectorFilter,
  CommandInteraction,
  StringSelectMenuInteraction,
} from "discord.js";
import CustomClient from "../../models/custom-client";
import { getMoviesByGenre } from "../../features/movie/movieService";
import { moviesMapper } from "../../utils";

export default {
  data: {
    name: "movie-recommendation",
    description: "Get a movie recommendation based on a category",
    options: [
      {
        name: "category",
        description: "Get a movie category",
        type: ApplicationCommandOptionType.String,
        required: true,
        choices: movieCategoriesChoices,
      },
    ],
  },
  run: async (client: CustomClient, interaction: CommandInteraction) => {
    await interaction.deferReply();
    const categoryId = interaction.options.get("category")?.value as string;
    const movies = await getMoviesByGenre(categoryId);
    const myEmbeds = moviesMapper(movies);
    const maxPages = myEmbeds.length;
    let currentPage = 0;

    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setCustomId("previous")
        .setLabel("Previous")
        .setStyle(ButtonStyle.Primary)
        .setDisabled(true),
      new ButtonBuilder()
        .setCustomId("next")
        .setLabel("Next")
        .setStyle(ButtonStyle.Primary)
        .setDisabled(false)
    );

    const message = await interaction.editReply({
      embeds: [myEmbeds[currentPage]],
      components: [row],
    });

    const filter: CollectorFilter<any> = (i: StringSelectMenuInteraction) =>
      i.customId === "previous" || i.customId === "next";

    const collector = message.createMessageComponentCollector({
      filter,
      time: 60000,
    });

    collector.on("collect", async (i: StringSelectMenuInteraction) => {
      if (i.customId === "previous") {
        currentPage--;
        if (currentPage === 0) {
          row.components[0].setDisabled(true);
        }
        row.components[1].setDisabled(false);
      } else if (i.customId === "next") {
        currentPage++;
        if (currentPage === maxPages - 1) {
          row.components[1].setDisabled(true);
        }
        row.components[0].setDisabled(false);
      }
      await i.update({
        embeds: [myEmbeds[currentPage]],
        components: [row],
      });
    });

    collector.on("end", async () => {
      await message.edit({
        components: [],
      });
    });
  },
} as Command;
