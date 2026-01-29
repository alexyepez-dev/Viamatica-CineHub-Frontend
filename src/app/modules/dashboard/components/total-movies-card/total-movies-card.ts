import { Component, input } from '@angular/core';

@Component({
  selector: 'total-movies-card',
  imports: [],
  template: `
    <div class="flex justify-center items-center animate-fadeIn">
      <div
        class="relative w-96 flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md"
      >
        <div
          class="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-orange-600 to-orange-400 text-white shadow-orange-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center"
        >
          <span class="material-symbols-outlined"> movie </span>
        </div>
        <div class="p-4 text-right">
          <p class="block antialiased text-lg leading-normal text-blue-gray-600">Películas</p>
          <h4
            class="block antialiased tracking-normal text-3xl font-semibold leading-snug text-blue-gray-900"
          >
            {{ movies() }}
          </h4>
        </div>
        <div class="border-t border-blue-gray-50 p-4">
          <p class="block antialiased text-base leading-relaxed text-blue-gray-600"></p>
        </div>
      </div>
    </div>
  `,
})
export class TotalMoviesCard {
  movies = input.required<number>();
}
