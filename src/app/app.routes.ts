import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.routes'),
  },
  {
    path: 'home',
    loadChildren: () => import('./modules/store-front/store-front.routes'),
  },
  {
    path: '**',
    redirectTo: 'auth',
  },
];
