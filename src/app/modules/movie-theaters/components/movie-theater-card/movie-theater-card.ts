import { Component, inject, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { toastSuccess } from '@shared/alerts/toast-success';
import { MovieTheaters } from '@movie-theaters/interfaces/movie-theaters.interface';
import { MovieTheaterStatusPipe } from '@movie-theaters/pipes/movie-theater-status.pipe';
import { MovieTheatersService } from '@movie-theaters/services/movie-theaters.service';

@Component({
  selector: 'movie-theater-card',
  imports: [RouterLink, MovieTheaterStatusPipe],
  template: `
    <div class="card bg-base-100 w-96 shadow-xl animate-fadeIn">
      <div class="card-body">
        <h2 class="card-title">{{ movieTheater().name }}</h2>
        <p class="badge badge-primary shadow-md">{{ movieTheater().status | statusMovieTheater}}</p>
        <div class="card-actions justify-between items-center">
          <button
            class="btn btn-secondary"
            [routerLink]="['/home/movie-theaters/status', movieTheater().name]"
          >
            Ver
          </button>
          <button
            (click)="deleteMovieTheater(movieTheater().movieTheaterId)"
            class="btn btn-square btn-sm btn-outline btn-error"
          >
            <span class="material-symbols-outlined">delete</span>
          </button>
          <a
            class="btn btn-success"
            [routerLink]="['/home/movie-theaters/assign-movie', movieTheater().movieTheaterId]"
          >
            Asignar película
          </a>
        </div>
      </div>
    </div>
  `,
})
export class MovieTheaterCard {
  movieTheater = input.required<MovieTheaters>();
  movieTheaterService = inject(MovieTheatersService);
  onMovieTheaterDeleted = output<void>();

  deleteMovieTheater = (movieTheaterId: string) =>
    this.movieTheaterService.deleteMovieTheaterStatus(movieTheaterId).subscribe({
      next: () => {
        toastSuccess('Sala eliminada exitosamente.');
        this.onMovieTheaterDeleted.emit();
      },
      error: (err) => console.error(`Error: ${err}`),
    });
}
