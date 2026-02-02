import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@envs/environment.development';
import { CreateMovieTheater } from '@manager/interfaces/create-movie-theater';
import { CreateMovie } from '@manager/interfaces/create-movie.interface';

@Injectable({
  providedIn: 'root',
})
export class MoviesManagerService {
  private http = inject(HttpClient);
  private baseUrl = environment.API_URL;

  createMovie = (model: CreateMovie) =>
    this.http.post<CreateMovie>(`${this.baseUrl}/movies`, model);

  createMovieTheater = (model: CreateMovieTheater) =>
    this.http.post<CreateMovieTheater>(`${this.baseUrl}/movie-theaters`, model);

  updateMovie = (model: CreateMovie, movieId: string) =>
    this.http.patch(`${this.baseUrl}/movies/${movieId}`, model);
}
