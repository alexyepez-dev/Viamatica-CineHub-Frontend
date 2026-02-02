import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { MovieSearchDate } from '@movie/components/movie-search-date/movie-search-date';
import { MovieService } from '@movie/services/movie.service';
import { MovieCard } from '@movie/components/movie-card/movie-card';
import { of } from 'rxjs';
import { FormError } from '@shared/components/form-error';

@Component({
  selector: 'search-publication-date-page',
  imports: [MovieSearchDate, MovieCard, FormError],
  template: `
    @if (dateResource.isLoading()) {
      <div class="flex justify-center items-center h-screen">
        <span class="loading loading-spinner loading-lg"></span>
      </div>
    }

    @if (dateResource.error()) {
      <form-error
        [error]="'No existe una película para esa fecha.'"
        class="animate-fadeIn fixed top-5 right-5"
      />
    }

    <div
      class="flex items-center flex-col md:flex-col lg:flex-row xl:flex-row lg:justify-between xl:justify-between animate-fadeIn"
    >
      <div class="p-4 md:p-0 lg:p-0 xl:p-0 flex-col md:flex-row lg:flex-row xl:flex-row">
        <h1 class="text-3xl font-bold">Todas las películas.</h1>
        <h2 class="text-xl mb-5 text-secondary">Para todos los gustos</h2>
      </div>
      <movie-search-date (value)="query.set($event)" />
    </div>

    @if (dateResource.hasValue()) {
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 mt-2 gap-3">
        @for (movie of dateResource.value(); track $index) {
          <movie-card [movie]="movie" />
        } @empty {
          <p class="text-xl animate-fadeIn">Aún no se han buscado películas.</p>
        }
      </div>
    }
  `,
})
export default class SearchPublicationDatePage {
  movieService = inject(MovieService);
  query = signal<string>('');

  dateResource = rxResource({
    params: () => ({ query: this.query() }),

    stream: ({ params }) => {
      if (!params.query) return of([]);

      return this.movieService.searchMoviesByDate(params.query);
    },
  });
}
