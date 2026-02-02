import { Component, inject, output, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { toastSuccess } from '@shared/alerts/toast-success';
import { CreateMovie } from '@manager/interfaces/create-movie.interface';
import { MoviesManagerService } from '@manager/services/movies-manager.service';
import { FormMovie } from '@manager/components/form-movie/form-movie';
import { MovieService } from '@movie/services/movie.service';
import { errorAlert } from '@shared/alerts/error-alert';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'update-movie-page',
  imports: [FormMovie],
  template: ` <form-movie [movie]="movieResource.value()!" (postForm)="onSubmit($event)" /> `,
})
export default class UpdateMoviePage {
  private movieManagerService = inject(MoviesManagerService);
  private activateRoute = inject(ActivatedRoute);
  private movieService = inject(MovieService);
  private router = inject(Router);

  movieId = signal<string | null>(null);
  onMovieDeleted = output<void>();

  constructor() {
    const id = this.activateRoute.snapshot.paramMap.get('movieId');

    if (id) {
      this.movieId.set(id);
      console.log(this.movieId());
    } else {
      console.error('No se encontró el movieId en la URL');
    }
  }

  movieResource = rxResource({
    params: () => ({ idSlug: this.movieId() }),
    stream: ({ params }) => this.movieService.getMovie(params.idSlug!),
  });

  onSubmit = (model: CreateMovie) => {
    const id = this.movieId();
    if (!id) return;

    return this.movieManagerService.updateMovie(model, id).subscribe({
      next: async () => {
        console.log(`Película ${model.name} actualizada`);
        await toastSuccess('Película actualizada correctamente').then(() =>
          this.router.navigateByUrl('/home/dashboard'),
        );
        this.onMovieDeleted.emit();
      },
      error: async (err) => {
        await errorAlert('Error al actualizar la película');
        console.error(err);
      },
    });
  };
}
