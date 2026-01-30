import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { MovieTheatersService } from '@movie-theaters/services/movie-theaters.service';
import { MovieTheaterCard } from '@movie-theaters/components/movie-theater-card/movie-theater-card';

@Component({
  selector: 'movie-theaters-page',
  imports: [MovieTheaterCard],
  template: `
    @if (movieTheaterResource.isLoading()) {
      <div class="flex justify-center items-center h-screen">
        <span class="loading loading-spinner loading-lg"></span>
      </div>
    }

    @if (movieTheaterResource.hasValue()) {
      <h1 class="text-3xl font-bold animate-fadeIn">Todos las salas de películas.</h1>
      <h2 class="text-xl mb-5 text-secondary animate-fadeIn">Para todos los gustos</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 mt-2 gap-3">
        @for (movie of movieTheaterResource.value(); track $index) {
          <movie-theater-card [movieTheater]="movie" />
        }
      </div>
    }
  `,
})
export default class MovieTheatersPage {
  movieTheatersService = inject(MovieTheatersService);
  router = inject(Router);

  movieTheaterResource = rxResource({
    params: () => ({}),
    stream: () => this.movieTheatersService.getMovieTheaters(),
  });
}
