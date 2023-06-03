import { fetch } from "../../utils";
import { HttpParam } from "./models";

const { TMDP_URL, TMDP_KEY,TMPD_READ_TOKEN } = process.env;

console.log(TMDP_URL, TMDP_KEY);

 
const HTTP_PARAM = {
  api_key: TMDP_KEY,
  language: "en-US",
} as HttpParam;

export const getMoviesCategories = async () => {
  const { genres } = await fetch(`${TMDP_URL}/genre/movie/list`, "GET", {
   ...HTTP_PARAM,
   Authorization: `Bearer ${TMPD_READ_TOKEN}`,
  });
  return genres;
};

export const getMoviesByGenre = async (genreId: string) => {
  const { results } = await fetch(`${TMDP_URL}/discover/movie`, "GET", {
    ...HTTP_PARAM,
    with_genres: genreId,
  });
  return results;
};
