import { Component, input } from '@angular/core';

@Component({
  selector: 'total-movie-theaters-card',
  imports: [],
  template: `
    <div class="flex justify-center items-center animate-fadeIn">
      <div
        class="relative w-96 flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md"
      >
        <div
          class="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center"
        >
          <span class="material-symbols-outlined"> local_activity </span>
        </div>
        <div class="p-4 text-right">
          <p class="block antialiased text-lg leading-normal text-blue-gray-600">Total de salas</p>
          <h4
            class="block antialiased tracking-normal text-3xl font-semibold leading-snug text-blue-gray-900"
          >
            {{ movieTheaters() }}
          </h4>
        </div>
        <div class="border-t border-blue-gray-50 p-4">
          <p class="block antialiased text-base leading-relaxed text-blue-gray-600"></p>
        </div>
      </div>
    </div>
  `,
})
export class TotalMovieTheatersCard {
  movieTheaters = input.required<number>();
}
