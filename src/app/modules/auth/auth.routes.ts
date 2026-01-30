import { Routes } from '@angular/router';

const authRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layout/auth.layout'),
    children: [
      {
        path: 'login',
        loadComponent: () => import('./pages/login-page/login-page'),
      },
      {
        path: 'register',
        loadComponent: () => import('./pages/register-page/register-page'),
      },
      {
        path: '**',
        redirectTo: 'login',
      },
    ],
  },
];

export default authRoutes;