import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@envs/environment.development';
import { AssignImageToMovie } from '@movie/interfaces/assign-image-to-movie.interface';

@Injectable({
  providedIn: 'root',
})
export class MovieImageService {
  private http = inject(HttpClient);
  private baseUrl = environment.API_URL;

  assignImageToMovie = (movieId: string, model: AssignImageToMovie) =>
    this.http.post<AssignImageToMovie>(`${this.baseUrl}/movie-images/assign/${movieId}`, model);
}
