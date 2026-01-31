import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@envs/environment.development';
import { moviesTheaterKeysCache } from '@movie-theaters/common/movie-theater-keys.common';
import { MovieAssign } from '@movie-theaters/interfaces/assign-movie.interface';
import { MovieTheatersStatus } from '@movie-theaters/interfaces/movie-theaters-status.interface';
import { MovieTheaters } from '@movie-theaters/interfaces/movie-theaters.interface';
import { CacheService } from '@shared/services/cache.service';
import { of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieTheatersService {
  private http = inject(HttpClient);
  private baseUrl = environment.API_URL;
  private getMovieTheatersCache = inject(CacheService<MovieTheaters[]>);

  getMovieTheaters = () => {
    const key = moviesTheaterKeysCache.getAll();
    const cached = this.getMovieTheatersCache.get(key);

    if (cached) return of(cached);

    return this.http.get<MovieTheaters[]>(`${this.baseUrl}/movie-theaters`).pipe(
      tap((x) => console.log(x)),
      tap((resp) => this.getMovieTheatersCache.set(key, resp)),
    );
  };

  getMovieTheaterStatus = (name: string) =>
    this.http
      .get<MovieTheatersStatus>(`${this.baseUrl}/movie-theaters/status/${name}`)
      .pipe(tap((x) => console.log(x)));

  deleteMovieTheaterStatus = (movieTheaterId: string) =>
    this.http.delete(`${this.baseUrl}/movie-theaters/${movieTheaterId}`);

  assignMovieToMovieTheater = (model: MovieAssign) =>
    this.http.post(`${this.baseUrl}/movie-movie-theaters/assign`, model);
}
