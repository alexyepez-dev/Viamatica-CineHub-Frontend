import { Component, effect, inject, input, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateMovie } from '@manager/interfaces/create-movie.interface';
import { MovieFormButtonPipe } from '@manager/pipes/movie-form-button.pipe';
import { Movie } from '@movie/interfaces/movie.interface';
import { FormError } from '@shared/components/form-error';
import { pushError } from '@shared/utils/pushError.util';

@Component({
  selector: 'form-movie',
  imports: [ReactiveFormsModule, FormError, MovieFormButtonPipe],
  template: `
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 class="text-2xl font-bold text-center">{{ router.url | movieFormButton }}</h1>
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form [formGroup]="movieForm" (ngSubmit)="onSubmit()" class="space-y-6">
            <div class="mt-2">
              <input type="text" placeholder="Nombre" class="input input-bordered w-full" formControlName="name" />
            </div>
            <div class="mt-2">
              <input type="number" placeholder="Duración" class="input input-bordered w-full" formControlName="duration" />
            </div>

            <div class="mt-2">
              <select class="select select-bordered w-full" formControlName="status">
                <option value="NowPlaying">Disponible</option>
                <option value="NotAvailable">No disponible</option>
              </select>
            </div>
          <div>
  
              <textarea
                class="textarea textarea-bordered w-full"
                placeholder="Descripción"
                formControlName="description"
                rows="6"
              ></textarea>
          </div>

          @if (hasError()) {
            <form-error
              [error]="'Por favor revise la información ingresada.'"
              class="animate-fadeIn fixed top-5 right-5"
            />
          }

          <div>
            <button class="btn btn-secondary w-full" type="submit">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  `,
})
export class FormMovie {
  private fb = inject(FormBuilder);
  router = inject(Router);

  hasError = signal(false);
  postForm = output<CreateMovie>();
  movie = input<Movie | null>(null);

  constructor() {
  effect(() => {
    if (this.movie()) {
      this.movieForm.patchValue({
        name: this.movie()!.name,
        duration: this.movie()!.duration,
        description: this.movie()!.description,
        status: this.movie()!.status,
      });
    }
  });
}

  movieForm = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(20)]],
    duration: [0, [Validators.required]],
    description: ['', [Validators.required, Validators.maxLength(3000)]],
    status: ['NowPlaying', Validators.required],
  });

  onSubmit = () => {
    if (this.movieForm.invalid) {
      this.hasError.set(true);
      pushError(this.hasError, 3000);
      return;
    }

    this.postForm.emit(this.movieForm.value as CreateMovie);
  };
}
