import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@envs/environment.development';
import { moviesKeysCache } from '@movie/common/movie-keys.common';
import { MovieOptions } from '@movie/interfaces/movie-options.interface';
import { MoviePagination } from '@movie/interfaces/movie-pagination.interface';
import { Movie } from '@movie/interfaces/movie.interface';
import { CacheService } from '@shared/cache/cache.service';
import { ResilienceService } from '@shared/resilience/resilience.service';
import { of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private http = inject(HttpClient);
  private baseUrl = environment.API_URL;
  private getMoviesCache = inject(CacheService<MoviePagination>);
  private getMovieCache = inject(CacheService<Movie>);
  private searchMoviesByNameCache = inject(CacheService<Movie[]>);
  private searchMoviesByDateCache = inject(CacheService<Movie[]>);
  private getMoviesResilience = inject(ResilienceService<MoviePagination>);
  private getMovieResilience = inject(ResilienceService<Movie>);
  private searchMoviesByNameResilience = inject(ResilienceService<Movie[]>);
  private searchMoviesByDateResilience = inject(ResilienceService<Movie[]>);

  getMovies = (option: MovieOptions) => {
    const key = moviesKeysCache.pagination(option);
    const cached = this.getMoviesCache.get(key);

    if (cached) return of(cached);

    return this.http
      .get<MoviePagination>(`${this.baseUrl}/movies`, {
        params: {
          limit: option.limit ?? 9,
          offset: option.offset ?? 0,
        },
      })
      .pipe(
        tap((resp) => console.log(resp)),
        tap((resp) => this.getMoviesCache.set(key, resp)),
        this.getMoviesResilience.strategy(),
        this.getMoviesResilience.catchingError(),
      );
  };

  searchMoviesByName = (query: string) => {
    const key = moviesKeysCache.byName(query);
    const cached = this.searchMoviesByNameCache.get(key);

    if (cached) return of(cached);

    return this.http
      .get<Movie[]>(`${this.baseUrl}/movies/search`, {
        params: {
          Name: query.toLowerCase(),
        },
      })
      .pipe(
        tap((resp) => console.log(resp)),
        tap((resp) => this.searchMoviesByNameCache.set(key, resp)),
        this.searchMoviesByNameResilience.strategy(),
        this.searchMoviesByNameResilience.catchingError(),
      );
  };

  searchMoviesByDate = (date: string) => {
    const key = moviesKeysCache.byDate(date);
    const cached = this.searchMoviesByDateCache.get(key);

    if (cached) return of(cached);

    return this.http.get<Movie[]>(`${this.baseUrl}/movies/by-date/${date}`).pipe(
      tap((resp) => console.log(resp)),
      tap((resp) => this.searchMoviesByDateCache.set(key, resp)),
      this.searchMoviesByDateResilience.strategy(),
      this.searchMoviesByDateResilience.catchingError(),
    );
  };

  getMovie = (idSlug: string) => {
    const key = moviesKeysCache.idSlug(idSlug);
    const cached = this.getMovieCache.get(key);

    if (cached) return of(cached);

    return this.http.get<Movie>(`${this.baseUrl}/movies/${idSlug}`).pipe(
      tap((resp) => console.log(resp)),
      tap((resp) => this.getMovieCache.set(key, resp)),
      this.getMovieResilience.strategy(),
      this.getMovieResilience.catchingError(),
    );
  };

  deleteMovie = (movieId: string) =>
    this.http.delete(`${this.baseUrl}/movies`, {
      params: {
        movieId: movieId,
      },
    });
}
