import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@envs/environment.development';
import { MovieOptions } from '@movie/interfaces/movie-options.interface';
import { MoviePagination } from '@movie/interfaces/movie-pagination.interface';
import { Movie } from '@movie/interfaces/movie.interface';
import { catchError, of, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private http = inject(HttpClient);
  private baseUrl = environment.API_URL;

  getMovies = (option: MovieOptions) =>
    this.http
      .get<MoviePagination>(`${this.baseUrl}/movies`, {
        params: {
          limit: option.limit ?? 9,
          offset: option.offset ?? 0,
        },
      })
      .pipe(tap((resp) => console.log(resp)));

  searchMoviesByName = (query: string) =>
    this.http
      .get<Movie[]>(`${this.baseUrl}/movies/search`, {
        params: {
          Name: query.toLowerCase(),
        },
      })
      .pipe(tap((resp) => console.log(resp)));

  searchMoviesByDate = (date: string) =>
    this.http.get<Movie[]>(`${this.baseUrl}/movies/by-date/${date}`).pipe(
      tap((resp) => console.log(resp)),
      catchError((err) => throwError(() => err)),
    );

  getMovie = (idSlug: string) => this.http.get<Movie>(`${this.baseUrl}/movies/${idSlug}`);

  deleteMovie = (movieId: string) => this.http.delete(`${this.baseUrl}/movies`, {
        params: {
          movieId: movieId,
        },
      })
}
