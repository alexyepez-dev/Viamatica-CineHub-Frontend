import { Component, inject, input, output } from '@angular/core';
import { Movie } from '@movie/interfaces/movie.interface';
import { MovieStatusPipe } from '@movie/pipes/movie-status.pipe';
import { RouterLink } from '@angular/router';
import { MovieImagePipe } from '@movie/pipes/movie-image.pipe';
import { MovieService } from '@movie/services/movie.service';
import { toastSuccess } from '@shared/alerts/toast-success';

@Component({
  selector: 'movie-card',
  imports: [MovieStatusPipe, RouterLink, MovieImagePipe],
  template: `
    <div
      class="card card-compact bg-base-100 shadow-xl animate-fadeIn h-full flex flex-col border border-base-200"
    >
      <figure class="relative h-64 w-full overflow-hidden bg-base-200">
        <img
          [src]="movie().urls | movieImage"
          [alt]="movie().name"
          class="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div class="absolute top-2 left-2">
          <div class="badge badge-primary shadow-md">{{ movie().status | statusName }}</div>
        </div>
      </figure>

      <div class="card-body flex flex-col justify-between flex-grow">
        <div>
          <div class="flex justify-between items-center mb-2">
            <span class="text-xs font-semibold flex items-center gap-1 text-base-content/70">
              <span class="material-symbols-outlined text-sm">schedule</span>
              {{ movie().duration }}h
            </span>
            <div class="rating">
              <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" />
              <input
                type="radio"
                name="rating-2"
                class="mask mask-star-2 bg-orange-400"
                checked="checked"
              />
              <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" />
              <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" />
              <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" />
            </div>
          </div>

          <h2 class="card-title text-lg line-clamp-1" [title]="movie().name">
            {{ movie().name }}
          </h2>
        </div>

        <div class="card-actions mt-4 grid grid-cols-4 gap-1">
          <a
            class="btn btn-square btn-sm btn-info"
            [routerLink]="['/home/movies/assign-image', movie().movieId]"
          >
            <span class="material-symbols-outlined">add_photo_alternate</span>
          </a>
          <a
            class="btn btn-square btn-sm btn-success"
            [routerLink]="['/home/movies/update', movie().movieId]"
          >
            <span class="material-symbols-outlined ">edit</span>
          </a>
          <button
            class="btn btn-square btn-sm btn-error"
            (click)="deleteMovie(movie().movieId)"
          >
            <span class="material-symbols-outlined">delete</span>
          </button>
          <a class="btn btn-secondary btn-sm" [routerLink]="['/home/movies', movie().slug]">
            Ver
          </a>
        </div>
      </div>
    </div>
  `,
})
export class MovieCard {
  movie = input.required<Movie>();
  movieService = inject(MovieService);
  onMovieDeleted = output<void>();

  deleteMovie = (movieId: string) =>
    this.movieService.deleteMovie(movieId).subscribe({
      next: () => {
        toastSuccess('Película eliminada exitosamente.');
        this.onMovieDeleted.emit();
      },
      error: (err) => console.error(`Error: ${err}`),
    });
}
