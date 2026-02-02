import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@envs/environment.development';
import { moviesTheaterKeysCache } from '@movie-theaters/common/movie-theater-keys.common';
import { MovieAssign } from '@movie-theaters/interfaces/assign-movie.interface';
import { MovieTheatersStatus } from '@movie-theaters/interfaces/movie-theaters-status.interface';
import { MovieTheaters } from '@movie-theaters/interfaces/movie-theaters.interface';
import { CacheService } from '@shared/cache/cache.service';
import { ResilienceService } from '@shared/resilience/resilience.service';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieTheatersService {
  private http = inject(HttpClient);
  private baseUrl = environment.API_URL;
  private getMovieTheatersCache = new Map<string, MovieTheaters[]>();
  private getMovieTheaterStatusCache = inject(CacheService<MovieTheatersStatus>);
  private getMovieTheatersResilience = inject(ResilienceService<MovieTheaters[]>);
  private getMovieTheaterStatusResilience = inject(ResilienceService<MovieTheatersStatus>);

  getMovieTheaters = (): Observable<MovieTheaters[]> => {
    const key = moviesTheaterKeysCache.getAll();
    const cached = this.getMovieTheatersCache.get(key);

    if (cached) return of(cached);

    return this.http.get<MovieTheaters[]>(`${this.baseUrl}/movie-theaters`).pipe(
      tap((x) => console.log(x)),
      tap((resp) => this.getMovieTheatersCache.set(key, resp)),
      this.getMovieTheatersResilience.strategy(),
      this.getMovieTheatersResilience.catchingError(),
    );
  };

  getMovieTheaterStatus = (name: string) => {
    const key = moviesTheaterKeysCache.byName(name);
    const cached = this.getMovieTheaterStatusCache.get(key);

    if (cached) return of(cached);

    return this.http.get<MovieTheatersStatus>(`${this.baseUrl}/movie-theaters/status/${name}`).pipe(
      tap((x) => console.log(x)),
      // tap((resp) => this.getMovieTheaterStatusCache.set(key, resp)),
      this.getMovieTheaterStatusResilience.strategy(),
      this.getMovieTheaterStatusResilience.catchingError(),
    );
  };

  deleteMovieTheaterStatus = (movieTheaterId: string) =>
    this.http
      .delete(`${this.baseUrl}/movie-theaters/${movieTheaterId}`)
      .pipe(tap((x) => this.removeMovieTheaterFromCache(movieTheaterId)));

  assignMovieToMovieTheater = (model: MovieAssign) =>
    this.http.post(`${this.baseUrl}/movie-movie-theaters/assign`, model);

  removeMovieTheaterFromCache = (movieTheaterId: string) => {
    this.getMovieTheatersCache.forEach((list, key) => {
      const updatedList = list.filter((theater) => theater.movieTheaterId !== movieTheaterId);

      this.getMovieTheatersCache.set(key, updatedList);
    });

    this.getMovieTheaterStatusCache.clear();
  };
}
