import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '@movie/services/movie.service';
import { MovieCarousel } from '@movie/components/movie-carousel/movie-carousel';
import { MovieStatusPipe } from '@movie/pipes/movie-status.pipe';

@Component({
  selector: 'movie-page',
  imports: [MovieCarousel, MovieStatusPipe],
  template: `
    @if (movieResource.isLoading()) {
      <div class="flex justify-center items-center h-screen">
        <span class="loading loading-spinner loading-lg"></span>
      </div>
    }

    @if (movieResource.hasValue()) {
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 animate-fadeIn">

        <movie-carousel [images]="movieResource.value().urls" />

        <div>
          <div class="flex justify-between items-center">
            <h2 class="text-accent text-xl">{{ movieResource.value().name }}</h2>
            <div class="badge badge-primary shadow-md">{{ movieResource.value().status| statusName }}</div>
          </div>
          <div class="divider"></div>

          <p>{{ movieResource.value().description }}</p>
          <p class="text-accent 2xl mt-4">{{ movieResource.value().duration }} horas</p>
        </div>
      </div>
    }
  `,
})
export default class MoviePage {
  private activateRoute = inject(ActivatedRoute);
  private movieService = inject(MovieService);
  slug = this.activateRoute.snapshot.params['idSlug'];

  movieResource = rxResource({
    params: () => ({ idSlug: this.slug }),
    stream: ({ params }) => this.movieService.getMovie(params.idSlug),
  });
}
