import { Component, computed, input, linkedSignal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'pagination',
  imports: [RouterLink],
  template: `
    <div class="join flex justify-center items-center mt-4 mb-10">
      @for (page of getPagesList(); track $index) {
        <button
          class="join-item btn"
          [class.btn-secondary]="page === currentPage()"
          [routerLink]="[]"
          [queryParams]="{ page: page }"
          (click)="activePage.set(page)"
        >
          {{ page }}
        </button>
      }
    </div>
  `,
})
export class Pagination {
  pages = input<number>(0);
  currentPage = input<number>(1);
  activePage = linkedSignal(this.currentPage);
  getPagesList = computed(() => Array.from({ length: this.pages() }, (_, i) => i + 1));
}
