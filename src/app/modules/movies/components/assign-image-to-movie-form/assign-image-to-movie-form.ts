import { Component, inject, output, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateMovie } from '@manager/interfaces/create-movie.interface';
import { MovieFormButtonPipe } from '@manager/pipes/movie-form-button.pipe';
import { AssignImageToMovie } from '@movie/interfaces/assign-image-to-movie.interface';
import { FormError } from '@shared/components/form-error';
import { pushError } from '@shared/utils/pushError.util';

@Component({
  selector: 'assign-image-to-movie-form',
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
          <div>
            <label class="block text-lg font-medium text-gray-100">Nombre</label>
            <div class="mt-2">
              <input
                type="text"
                placeholder="Url de imagen de película"
                formControlName="url"
                class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              />
            </div>
          </div>

          @if (hasError()) {
            <form-error
              [error]="'Por favor revise la información ingresada.'"
              class="animate-fadeIn fixed top-5 right-5"
            />
          }

          <div>
            <button
              type="submit"
              class="flex w-full justify-center rounded-md px-3 btn btn-secondary py-1.5 text-sm/6 font-semiboldfocus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Agregar imagen
            </button>
          </div>
        </form>
      </div>
    </div>
  
  `,
})
export class AssignImageToMovieForm {
  private fb = inject(FormBuilder);
  router = inject(Router);

  hasError = signal(false);
  postForm = output<AssignImageToMovie>();

  movieForm = this.fb.group({
    url: ['', [Validators.required, Validators.maxLength(1000)]],
  });

  onSubmit = () => {
    if (this.movieForm.invalid) {
      this.hasError.set(true);
      pushError(this.hasError, 3000);
      return;
    }

    this.postForm.emit(this.movieForm.value as AssignImageToMovie);
  };
}
