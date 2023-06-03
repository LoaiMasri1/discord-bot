import { fetch } from "../../utils";
import { HttpParam, Movie } from "./models";
const { TMDP_URL, TMPD_READ_TOKEN } = process.env,
  MOVIE_LIMIT = 10,
  HTTP_PARAM = {
    Authorization: `Bearer ${TMPD_READ_TOKEN}`,
  } as HttpParam;

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
    `${TMDP_URL}/discover/movie?&language=en-US&page=2&sort_by=popularity.desc&with_genres=${genreId}`,
    "GET",
    { ...HTTP_PARAM }
  );

  return results;
};
