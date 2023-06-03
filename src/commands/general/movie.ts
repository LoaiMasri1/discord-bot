import { movieCategoriesChoices } from "../../constants";
import { Command } from "../../models";
import { ApplicationCommandOptionType, CommandInteraction } from "discord.js";
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
    const categoryId = interaction.options.get("category")?.value as string,
      movies = await getMoviesByGenre(categoryId),
      myEmbeds = moviesMapper(movies);

    await interaction.editReply({
      embeds: myEmbeds,
    });
  },
} as Command;
