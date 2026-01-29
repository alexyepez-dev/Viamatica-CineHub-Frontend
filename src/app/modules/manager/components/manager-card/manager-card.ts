import { Component, inject, input } from '@angular/core';
import { CardService } from '@manager/services/card.service';

@Component({
  selector: 'manager-card',
  imports: [],
  template: `
    @for (card of cardService.cards; track $index) {
      <section class="text-gray-600 body-font">
        <div class="container px-5 py-24 mx-auto">
          <div class="flex flex-wrap -mx-4 -mb-10 text-center">
            <div class="sm:w-1/2 mb-10 px-4">
              <div class="rounded-lg h-64 overflow-hidden">
                <img
                  alt="content"
                  class="object-cover object-center h-full w-full"
                  src="https://media.istockphoto.com/id/1445871179/es/foto/proyector-de-pel%C3%ADculas-y-silla-del-director-de-cine-en-dark-place-renderizado-3d.jpg?s=612x612&w=0&k=20&c=Gv3UqmmgNVf-UeEIGnQJ-CUoXJdYr3TOdCZotqh8sjM="
                />
              </div>
              <h2 class="title-font text-2xl font-medium text-accent mt-6 mb-3">{{ card.title }}</h2>
              <button
                class="flex mx-auto mt-6 text-white bg-indigo-500 border-0 py-2 px-5 focus:outline-none hover:bg-indigo-600 rounded"
              >
                {{ card.action }}
              </button>
            </div>
          </div>
        </div>
      </section>
    }
  `,
})
export class ManagerCard {
  cardService = inject(CardService);
}
