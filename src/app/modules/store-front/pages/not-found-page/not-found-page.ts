import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'not-found-page',
  imports: [RouterLink],
  template: `
    <main class="grid min-h-full place-items-center bg-gray-900 px-6 py-24 sm:py-32 lg:px-8">
      <div class="text-center">
        <p class="font-semibold text-indigo-400 text-2xl">404</p>
        <h1 class="mt-4 text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl">
          No esta autorizado o la ruta no existe
        </h1>
        <p class="mt-6 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
          Lo sentimos, ingrese a una ruta valida o inicie sesión.
        </p>
        <div class="mt-10 flex items-center justify-center gap-x-6">
          <a
            routerLink="/auth/login"
            class="rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs btn btn-secondary"
            >Volver</a
          >
          <a class="text-sm font-semibold text-white"
            >Contacte con soporte <span aria-hidden="true">&rarr;</span></a
          >
        </div>
      </div>
    </main>
  `,
})
export default class NotFoundPage {}
