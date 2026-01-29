import { Routes } from '@angular/router';

const storeFrontRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layouts/store-front-layout'),
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard-page/dashboard-page'),
      },
      {
        path: 'movies',
        loadComponent: () => import('./pages/movies/movies-page/movies-page'),
      },
      {
        path: 'movies/search-date',
        loadComponent: () => import('./pages/movies/search-publication-date-page/search-publication-date-page'),
      },
      {
        path: 'movies/search/:name',
        loadComponent: () => import('./pages/movies/search-movie-page/search-movie-page'),
      },
      {
        path: 'movies/:idSlug',
        loadComponent: () => import('./pages/movies/movie-page/movie-page'),
      },
      {
        path: 'movie-theaters',
        loadComponent: () =>
          import('./pages/movie-theaters/movie-theaters-page/movie-theaters-page'),
      },
      {
        path: 'movie-theaters/status/:name',
        loadComponent: () =>
          import('./pages/movie-theaters/movie-theater-page/movie-theater-page'),
      },
      {
        path: 'manager/create-movie',
        loadComponent: () => import('./pages/movies/create-movie-page/create-movie-page'),
      },
      {
        path: 'manager/create-movie-theater',
        loadComponent: () => import('./pages/movie-theaters/create-movie-theater-page/create-movie-theater-page'),
      },
      {
        path: 'manager',
        loadComponent: () => import('./pages/manager-page/manager-page'),
      },

      {
        path: 'not-found',
        loadComponent: () => import('./pages/not-found-page/not-found-page'),
      },
      {
        path: '**',
        redirectTo: 'not-found',
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];

export default storeFrontRoutes;
