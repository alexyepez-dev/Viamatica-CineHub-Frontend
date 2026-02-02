import { Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { MovieSearchInput } from '@movie/components/search-input/search-input';
import { MovieService } from '@movie/services/movie.service';
import { MovieCard } from "@movie/components/movie-card/movie-card";
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'search-movie-page',
  imports: [MovieSearchInput, MovieCard],
  template: `
    <h1 class="text-3xl font-bold">Todos las películas.</h1>
    <h2 class="text-xl mb-5 text-secondary">Para todos los gustos</h2>
    <movie-search-input (value)="onSearch($event)" />
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-2 gap-3">
      @for (movie of movieResource.value(); track $index) {
          <movie-card [movie]="movie" />
        }
    </div>
  `,
})
export default class SearchMoviePage {
  movieService = inject(MovieService);
  router = inject(Router);
  activateRoute = inject(ActivatedRoute);

  getName = toSignal(this.activateRoute.params.pipe(map(({name}) => name)));

  movieResource = rxResource({
    params: () => ({ name: this.getName() }),
    stream: ({ params }) => this.movieService.searchMoviesByName(params.name),
  });

  onSearch = (query: string) => this.router.navigate(["/home/movies/search", query])
}
