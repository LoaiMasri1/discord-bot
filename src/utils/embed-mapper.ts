import { APIEmbed, Colors } from "discord.js";
import { Movie } from "../features/movie/models";
import { numberFormatter } from "./formatter";
import { movieCategoriesChoices } from "../constants";

export const moviesMapper: (data: Movie[]) => APIEmbed[] = (data) => {


  
  return data.map((movie) => {
    return {
      title: movie.title,
      description: movie.overview,
      color: Colors.Blue,
      image: {
        url: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
      },
      fields: [
        {
          name: "Release Date",
          value: movie.release_date,
          inline: true,
        },
        {
          name: "Popularity",
          value: numberFormatter(Number(movie.popularity.toFixed(2))),
          inline: true,
        },
        {
          name: "Vote Average",
          value: numberFormatter(Number(movie.vote_average.toFixed(2))),
          inline: true,
        },
        {
          name: "Category",
          value: movie.genre_ids
            .map(
              (id) =>
                movieCategoriesChoices.find((choice) => choice.value === id.toString())
                  ?.name
            )
            .join(", "),
          inline: false,
        },
      ],
    } as APIEmbed;
  });
};
