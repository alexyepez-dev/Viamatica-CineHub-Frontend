import { Movie } from '@movie/interfaces/movie.interface';

export interface MoviePagination {
  pages: number;
  movies: Movie[];
}