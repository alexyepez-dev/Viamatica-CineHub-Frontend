import { Component, inject, input, signal } from '@angular/core';
import { AssignImageToMovie } from '@movie/interfaces/assign-image-to-movie.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { toastSuccess } from '@shared/alerts/toast-success';
import { MovieImageService } from '@movie/services/movie-image.service';
import { AssignImageToMovieForm } from '@movie/components/assign-image-to-movie-form/assign-image-to-movie-form';
import { Movie } from '@movie/interfaces/movie.interface';

@Component({
  selector: 'assign-image-to-movie',
  imports: [AssignImageToMovieForm],
  template: `<assign-image-to-movie-form
    (postForm)="onSubmit($event)" />`,
})
export default class AssignImageToMoviePage {
  private movieService = inject(MovieImageService);
  private activateRoute = inject(ActivatedRoute);
  private router = inject(Router);

  // Definimos el señal para el ID
  movieId = signal<string | null>(null);

  constructor() {
    // Accedemos al parámetro en el constructor o ngOnInit
    const id = this.activateRoute.snapshot.paramMap.get('movieId');
    if (id) {
      this.movieId.set(id);
      console.log(this.movieId());
      
    } else {
      console.error('No se encontró el movieId en la URL');
    }
  }

  // Ajustamos el onSubmit para usar el ID del signal
  onSubmit = (model: AssignImageToMovie) => {
    const id = this.movieId();
    if (!id) return;

    this.movieService.assignImageToMovie(id, model).subscribe({
      next: () =>
        toastSuccess('Imagen agregada correctamente').then(() =>
          this.router.navigateByUrl('/home/dashboard')
        ),
      error: (err) => console.error(err),
    });
  }
}