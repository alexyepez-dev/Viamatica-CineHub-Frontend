import { Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { MovieTheaterStatusPipe } from '@movie-theaters/pipes/movie-theater-status.pipe';
import { MovieTheatersService } from '@movie-theaters/services/movie-theaters.service';
import { map } from 'rxjs';

@Component({
  selector: 'movie-theater-page',
  imports: [MovieTheaterStatusPipe],
  template: `

    <div class="flex items-center justify-center mt-52 animate-fadeIn">
      <div class="w-full max-w-xs shadow-2xl rounded-lg p-4">
        <h1 class="text-2xl font-bold text-secondary text-center mb-2">{{ movieTheaterStatusResource.value()?.statusMessage! | statusMovieTheater }}</h1>
      </div>
    </div>
  `,
})
export default class MovieTheaterPage {
  movieTheaterService = inject(MovieTheatersService);
  activateRoute = inject(ActivatedRoute);

  getName = toSignal(this.activateRoute.params.pipe(map(({ name }) => name)));

  movieTheaterStatusResource = rxResource({
    params: () => ({ name: this.getName() }),
    stream: ({ params }) => this.movieTheaterService.getMovieTheaterStatus(params.name),
  });
}
