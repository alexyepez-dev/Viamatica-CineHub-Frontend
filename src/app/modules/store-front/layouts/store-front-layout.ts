import { Component } from '@angular/core';
import { FrontNavbar } from '../components/front-navbar';
import { RouterOutlet } from '@angular/router';
import { FrontFooter } from "../components/front-footer";

@Component({
  selector: 'store-front-layout',
  imports: [FrontNavbar, RouterOutlet, FrontFooter],
  template: `
  <div class="flex flex-col h-screen">
    <front-navbar />
    <section class="container mx-auto flex-1">
      <router-outlet />
    </section>
    <front-footer/>
  </div>
  `,
})
export default class StoreFrontLayout {}
