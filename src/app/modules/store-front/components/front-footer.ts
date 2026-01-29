import { Component } from '@angular/core';

@Component({
  selector: 'front-footer',
  imports: [],
  template: `
    <footer class="footer bg-base-200 text-base-content p-10 flex justify-between items-center mt-4">
      <aside class="flex justify-center items-center flex-col lg:flex-row">
        <img src="vmt-logo.png" class="w-12" alt="VMT S.A" />
        <p class="text-lg">Cine <span class="text-secondary">| Hub</span> S.A</p>
      </aside>
      <section class="flex justify-center items-center flex-col lg:flex-row">
        <img src="work.svg" class="w-10" alt="VMT S.A" />
        <p class="text-lg">Prueba de trabajo</p>
      </section>
    </footer>
  `,
})
export class FrontFooter {}
