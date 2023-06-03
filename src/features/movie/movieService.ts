import { fetch } from "../../utils";
import { HttpParam, Movie } from "./models";
const { TMDP_URL, TMPD_READ_TOKEN } = process.env,
  MOVIE_LIMIT = 10,
  HTTP_PARAM = {
    Authorization: `Bearer ${TMPD_READ_TOKEN}`,
  } as HttpParam;

const sortMoviesByPopularity = (movies: Movie[]) => {
  return movies.sort((a, b) => b.popularity - a.popularity);
};

export const getMoviesCategories = async () => {
  const { genres } = await fetch(`${TMDP_URL}/genre/movie/list`, "GET", {
    ...HTTP_PARAM,
  });
  return genres;
};

export const getMoviesByGenre = async (
  genreId: string,
  limit: number = MOVIE_LIMIT
): Promise<Movie[]> => {
  const { results } = await fetch(
    `${TMDP_URL}/discover/movie?sort_by=vote_average.desc&with_genres=${genreId}`,
    "GET",
    { ...HTTP_PARAM }
  );

  const sortedMovies = sortMoviesByPopularity(results);
  return sortedMovies.slice(0, limit);
};
