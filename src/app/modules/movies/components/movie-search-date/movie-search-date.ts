import { Component, output, signal } from '@angular/core';

@Component({
  selector: 'movie-search-date',
  imports: [],
  template: `
    <div class="flex items-end gap-4 p-4 bg-base-200 rounded-3xl">
      <div class="form-control">
        <label class="label">
          <span class="label-text font-bold text-2xl">Filtrar por fecha de estreno</span>
        </label>
        <input
          type="date"
          #dateInput
          class="input input-bordered input-primary"
          (keyup.enter)="value.emit(dateInput.value)"
        />
      </div>
      <button class="btn btn-secondary" (click)="value.emit(dateInput.value)">Buscar</button>
    </div>

    <p>{{ search() }}</p>
  `,
})
export class MovieSearchDate {
  value = output<string>();
  search = signal<string>('');
}
