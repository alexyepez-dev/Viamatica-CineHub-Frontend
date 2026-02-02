import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { MovieCard } from '@movie/components/movie-card/movie-card';
import { MovieService } from '@movie/services/movie.service';
import { Router } from '@angular/router';
import { MovieSearchInput } from '@movie/components/search-input/search-input';
import { PaginationService } from '@pagination/services/pagination.service';
import { Pagination } from '@pagination/components/pagination';

@Component({
  selector: 'movies-page',
  imports: [MovieCard, MovieSearchInput, Pagination],
  template: `
    @if (movieResource.isLoading()) {
      <div class="flex justify-center items-center h-screen">
        <span class="loading loading-spinner loading-lg"></span>
      </div>
    }

    @if (movieResource.hasValue()) {
      <div class="p-4 md:p-0 lg:p-0 xl:p-0">
        <h1 class="text-3xl font-bold animate-fadeIn">Todos las películas.</h1>
        <h2 class="text-xl mb-5 text-secondary animate-fadeIn">Para todos los gustos</h2>
        <movie-search-input (value)="onSearch($event)" />
      </div>

      <pagination
        [pages]="movieResource.value().pages"
        [currentPage]="paginationService.currentPage()"
      />

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 mt-2 gap-3">
        @for (movie of movieResource.value().movies; track $index) {
          <movie-card [movie]="movie" (onMovieDeleted)="movieResource.reload()" />
        }
      </div>
    }
  `,
})
export default class MoviesPage {
  private movieService = inject(MovieService);
  private router = inject(Router);
  paginationService = inject(PaginationService);

  private LIMIT = 6;

  movieResource = rxResource({
    params: () => ({ page: this.paginationService.currentPage() - 1 }),
    stream: ({ params }) =>
      this.movieService.getMovies({ offset: params.page * this.LIMIT, limit: this.LIMIT }),
  });

  onSearch = (query: string) => this.router.navigate(['/home/movies/search', query]);
}
