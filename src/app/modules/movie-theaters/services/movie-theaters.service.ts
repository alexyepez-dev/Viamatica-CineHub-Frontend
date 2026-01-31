import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@envs/environment.development';
import { MovieAssign } from '@movie-theaters/interfaces/assign-movie.interface';
import { MovieTheatersStatus } from '@movie-theaters/interfaces/movie-theaters-status.interface';
import { MovieTheaters } from '@movie-theaters/interfaces/movie-theaters.interface';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieTheatersService {
  private http = inject(HttpClient);
  private baseUrl = environment.API_URL;

  getMovieTheaters = () =>
    this.http
      .get<MovieTheaters[]>(`${this.baseUrl}/movie-theaters`)
      .pipe(tap((x) => console.log(x)));

  getMovieTheaterStatus = (name: string) =>
    this.http
      .get<MovieTheatersStatus>(`${this.baseUrl}/movie-theaters/status/${name}`)
      .pipe(tap((x) => console.log(x)));

  deleteMovieTheaterStatus = (movieTheaterId: string) =>
    this.http.delete(`${this.baseUrl}/movie-theaters/${movieTheaterId}`);

  assignMovieToMovieTheater = (model: MovieAssign) =>
    this.http.post(`${this.baseUrl}/movie-movie-theaters/assign`, model);
}
