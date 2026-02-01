import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { toastSuccess } from '@shared/alerts/toast-success';
import { CreateMovie } from '@manager/interfaces/create-movie.interface';
import { MoviesManagerService } from '@manager/services/movies-manager.service';
import { FormMovie } from "@manager/components/form-movie/form-movie";

@Component({
  selector: 'update-movie-page',
  imports: [FormMovie],
  template: `<form-movie (postForm)="onSubmit($event)"/>`,
})
export default class UpdateMoviePage {

  private movieManagerService = inject(MoviesManagerService);
  private router = inject(Router);

  onSubmit = (model: CreateMovie) =>
    this.movieManagerService.createMovie(model).subscribe({
      next: () => {
        console.log(`Película ${model.name} actualizada`);
        toastSuccess("Película actualizada correctamente").then(() => this.router.navigateByUrl('/home/dashboard'));
      },
      error: (err) => {
        console.error(err);
      },
    });

}
