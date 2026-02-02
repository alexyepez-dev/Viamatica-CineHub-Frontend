import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'manager-page',
  imports: [RouterLink],
  template: `
    <div class="mt-12 flex justify-center items-center animate-fadeIn">
      <div
        class="mb-12 gap-y-10 gap-x-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2"
      >
        <div class="card card-compact bg-base-100 shadow-xl animate-fadeIn">
          <figure>
            <img
              src="https://wallpapers.com/images/hd/film-pictures-vbq45si2ir8k7fw3.jpg"
              alt=""
              class="object-cover"
            />
          </figure>
          <div class="card-body">
            <div class="card-actions justify-between flex items-center">
              <p class="text-accent text-2xl">Películas</p>
              <a class="btn btn-secondary" [routerLink]="['/home/manager/create-movie']">Crear</a>
            </div>
          </div>
        </div>
        <div class="card card-compact bg-base-100 shadow-xl animate-fadeIn">
          <figure>
            <img
              src="https://media.istockphoto.com/id/1445871179/es/foto/proyector-de-pel%C3%ADculas-y-silla-del-director-de-cine-en-dark-place-renderizado-3d.jpg?s=612x612&w=0&k=20&c=Gv3UqmmgNVf-UeEIGnQJ-CUoXJdYr3TOdCZotqh8sjM="
              alt=""
              class="object-cover"
            />
          </figure>
          <div class="card-body">
            <div class="card-actions justify-between flex items-center">
              <p class="text-accent text-2xl">Sala de película</p>
              <a class="btn btn-secondary" [routerLink]="['/home/manager/create-movie-theater']">Crear</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export default class ManagerPage {}
