import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { MovieTheaterStatusPipe } from '@movie-theaters/pipes/movie-theater-status.pipe';
import { MovieTheatersService } from '@movie-theaters/services/movie-theaters.service';
import { map } from 'rxjs';

@Component({
  selector: 'movie-theater-page',
  imports: [MovieTheaterStatusPipe, CommonModule],
  template: `
    <div class="flex items-center justify-center mt-52 animate-fadeIn">
      <div class="w-full max-w-sm shadow-2xl rounded-lg p-6 border border-base-200 bg-base-100">
        @let traducido = movieTheaterStatusResource.value()?.statusMessage | statusMovieTheater;
        <h1
          class="text-2xl font-bold text-center mb-2"
          [class.text-error]="traducido === 'Sala de cine no disponible.'"
          [class.text-success]="traducido === 'Sala de cine disponible.'"
          [class.text-secondary]="traducido?.includes('películas asignadas')"
        >
          {{ traducido }}
        </h1>
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

  isNotAvailable = () =>
    this.movieTheaterStatusResource.value()?.statusMessage.includes('NotAvailable') || false;
}
