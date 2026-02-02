import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { toastSuccess } from '@shared/alerts/toast-success';
import { MoviesManagerService } from '@manager/services/movies-manager.service';
import { FormMovieTheater } from '@manager/components/form-movie-theater/form-movie-theater';
import { CreateMovieTheater } from '@manager/interfaces/create-movie-theater';

@Component({
  selector: 'create-movie-theater-page',
  imports: [FormMovieTheater],
  template: `<form-movie-theater (postForm)="onSubmit($event)" />`,
})
export default class CreateMovieTheaterPage {
  private movieManagerService = inject(MoviesManagerService);
  private router = inject(Router);

  onSubmit = (model: CreateMovieTheater) =>
    this.movieManagerService.createMovieTheater(model).subscribe({
      next: () => {
        console.log(`Película ${model.name} creada`);
        toastSuccess('Película creada correctamente').then(() =>
          this.router.navigateByUrl('/home/manager'),
        );
      },
      error: (err) => {
        console.error(err);
      },
    });
}
