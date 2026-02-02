import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { toastSuccess } from '@shared/alerts/toast-success';
import { FormMovie } from '@manager/components/form-movie/form-movie';
import { CreateMovie } from '@manager/interfaces/create-movie.interface';
import { MoviesManagerService } from '@manager/services/movies-manager.service';
import { errorAlert } from '@shared/alerts/error-alert';

@Component({
  selector: 'create-movie-page',
  imports: [FormMovie],
  template: ` <form-movie (postForm)="onSubmit($event)" /> `,
})
export default class CreateMoviePage {
  private movieManagerService = inject(MoviesManagerService);
  private router = inject(Router);

  onSubmit = (model: CreateMovie) =>
    this.movieManagerService.createMovie(model).subscribe({
      next: async () => {
        console.log(`Película ${model.name} creada`);
        await toastSuccess('Película creada correctamente').then(() =>
          this.router.navigateByUrl('/home/manager'),
        );
      },
      error: async (err) => {
        await errorAlert('Error al crear la película');
        console.error(err);
      },
    });
}
