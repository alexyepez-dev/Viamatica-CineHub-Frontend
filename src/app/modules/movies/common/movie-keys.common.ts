import { MovieOptions } from "@movie/interfaces/movie-options.interface";

export const moviesKeysCache = {
  pagination: (options: MovieOptions) =>
    `movies:${options.limit ?? 6}:${options.offset}`,
  idSlug: (idSlug: string) => `movie:${idSlug}`,
  byName: (name: string) => `movie:${name}`,
  byDate: (date: string) => `movie:${date}`,
};
