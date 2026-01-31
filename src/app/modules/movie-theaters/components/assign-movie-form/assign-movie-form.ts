import { Component, inject, input, output, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MovieAssign } from '@movie-theaters/interfaces/assign-movie.interface';
import { MovieService } from '@movie/services/movie.service';
import { FormError } from '@shared/components/form-error';
import { pushError } from '@shared/utils/pushError.util';

@Component({
  selector: 'assign-movie-form',
  imports: [ReactiveFormsModule, FormError],
  template: `
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 animate-fadeIn">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          src="https://www.svgrepo.com/show/401291/cinema.svg"
          alt="Your Company"
          class="mx-auto w-16"
        />
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form class="space-y-6" [formGroup]="movieForm" (ngSubmit)="onSubmit()">
          <div class="form-control mb-4">
            <label class="label font-semibold">Película</label>
            <select
              formControlName="movieId"
              class="select select-bordered w-full focus:select-primary"
            >
              <option value="" disabled selected>Selecciona una película...</option>
              @for (movie of movieResource.value()?.movies; track movie.movieId) {
                <option [value]="movie.movieId">{{ movie.name }}</option>
              }
            </select>
            @if (movieResource.isLoading()) {
              <span class="loading loading-dots loading-xs mt-2"></span>
            }
          </div>

          <div>
            <label class="block text-lg font-medium text-gray-100">Fecha de publicación</label>
            <div class="mt-2">
              <input
                type="text"
                placeholder="Ejemplo: 2005-07-04 YYYY-MM-DD"
                formControlName="publicationDate"
                class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <label class="block text-lg font-medium text-gray-100">Fecha de fin</label>
            <div class="mt-2">
              <input
                type="text"
                placeholder="Ejemplo: 2005-07-04 YYYY-MM-DD"
                formControlName="endDate"
                class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              />
            </div>
          </div>

          @if (hasError()) {
            <form-error
              [error]="'Limite de películas alcanzado o revise la información ingresada.'"
              class="animate-fadeIn fixed top-5 right-5"
            />
          }

          <div>
            <button
              type="submit"
              class="flex w-full justify-center rounded-md px-3 btn btn-secondary py-1.5 text-sm/6 font-semiboldfocus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Asignar película
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
})
export class AssignMovieForm {
  private fb = inject(FormBuilder);
  router = inject(Router);
  movieService = inject(MovieService);

  movieResource = rxResource({
    params: () => ({}),
    stream: () => this.movieService.getMovies({ limit: 100 }),
  });

  hasError = signal(false);
  postForm = output<MovieAssign>();

  movieTheaterId = input<string>();

  movieForm = this.fb.group({
    movieId: ['', [Validators.required, Validators.maxLength(100)]],
    publicationDate: ['', Validators.required],
    endDate: ['', Validators.required],
  });

  onSubmit = () => {
    if (this.movieForm.invalid) {
      this.hasError.set(true);
      pushError(this.hasError, 3000);
      return;
    }

    const payload = {
      ...this.movieForm.value,
      movieTheaterId: this.movieTheaterId(),
    } as MovieAssign;

    this.postForm.emit(payload);
  };
}
