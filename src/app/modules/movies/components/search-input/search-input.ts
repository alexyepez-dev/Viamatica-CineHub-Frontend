import { Component, output, signal } from '@angular/core';

@Component({
  selector: 'movie-search-input',
  imports: [],
  template: `
    <input
      type="text"
      #textSearch
      (keyup.enter)="value.emit(textSearch.value)"
      placeholder="Buscar película"
      class="input input-bordered mb-4 w-full max-w-xs"
    />
    <a
      (click)="emit(textSearch.value)"
      class="btn btn-secondary md:ml-4 lg:ml-4 xl:ml-4"
      >Buscar</a
    >
  `,
})
export class MovieSearchInput {
  value = output<string>();
  emit = (value: string) => {
    if(!value.trim()) return;

    this.value.emit(value);
  }
}
