import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MovieTheaters } from '@movie-theaters/interfaces/movie-theaters.interface';

@Component({
  selector: 'movie-theater-card',
  imports: [RouterLink],
  template: `
    <div class="card bg-base-100 w-96 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">{{ movieTheater().name }}</h2>
        <p class="badge badge-primary shadow-md">{{ movieTheater().status }}</p>
        <div class="card-actions justify-between">
          <button class="btn btn-secondary" [routerLink]="['/home/movie-theaters/status', movieTheater().name]">Ver</button>
          <button class="btn btn-success" routerLink="/home/manager/create-movie-theater">Asignar película</button>
        </div>
      </div>
    </div>
  `,
})
export class MovieTheaterCard {
  movieTheater = input.required<MovieTheaters>();
}
