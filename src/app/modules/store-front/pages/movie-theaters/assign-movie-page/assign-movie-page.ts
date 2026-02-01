import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { toastSuccess } from '@shared/alerts/toast-success';
import { MovieAssign } from '@movie-theaters/interfaces/assign-movie.interface';
import { MovieTheatersService } from '@movie-theaters/services/movie-theaters.service';
import { AssignMovieForm } from '@movie-theaters/components/assign-movie-form/assign-movie-form';
import { errorAlert } from '@shared/alerts/error-alert';

@Component({
  selector: 'assign-movie-page',
  imports: [AssignMovieForm],
  template: `<assign-movie-form
    [movieTheaterId]="movieTheaterId()!"
    (postForm)="onSubmit($event)"
  />`,
})
export default class AssignMoviePage {
  private movieTheatersService = inject(MovieTheatersService);
  private router = inject(Router);
  private activateRoute = inject(ActivatedRoute);

  movieTheaterId = signal<string | null>(null);

  constructor() {
    const id = this.activateRoute.snapshot.paramMap.get('movieTheaterId');
    if (!id) console.error('No se encontró el movieId en la URL');

    this.movieTheaterId.set(id);
    console.log(this.movieTheaterId());
  }

  onSubmit = (model: MovieAssign) =>
    this.movieTheatersService.assignMovieToMovieTheater(model).subscribe({
      next: () =>
        toastSuccess('Película asignada correctamente').then(() =>
          this.router.navigateByUrl('/home/movie-theaters'),
        ),
      error: (err) => {
        console.error(err);
        errorAlert("Limite de películas alcanzado")
      },
    });
}
