import { Component, input } from '@angular/core';

@Component({
  selector: 'total-users-card',
  imports: [],
  template: `
    <div class="flex justify-center items-center animate-fadeIn">
      <div
        class="relative w-96 flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md"
      >
        <div
          class="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-pink-600 to-pink-400 text-white shadow-pink-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            class="w-6 h-6 text-white"
          >
            <path
              fill-rule="evenodd"
              d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
        <div class="p-4 text-right">
          <p class="block antialiased text-lg leading-normal text-blue-gray-600">Usuarios</p>
          <h4
            class="block antialiased tracking-normal text-3xl font-semibold leading-snug text-blue-gray-900"
          >
            {{ users() }}
          </h4>
        </div>
        <div class="border-t border-blue-gray-50 p-4">
          <p class="block antialiased text-base leading-relaxed text-blue-gray-600"></p>
        </div>
      </div>
    </div>
  `,
})
export class TotalUsersCard {
  users = input.required<number>();
}
