import { Routes } from '@angular/router';
import { authGuard } from '@auth/guards/auth.guard';

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
        canActivate: [authGuard],
      },
      {
        path: 'movies',
        loadComponent: () => import('./pages/movies/movies-page/movies-page'),
        canActivate: [authGuard],
      },
      {
        path: 'movies/search-date',
        loadComponent: () =>
          import('./pages/movies/search-publication-date-page/search-publication-date-page'),
        canActivate: [authGuard],
      },
      {
        path: 'movies/update/:movieId',
        loadComponent: () => import('./pages/movies/update-movie-page/update-movie-page'),
        canActivate: [authGuard],
      },
      {
        path: 'movies/assign-image/:movieId',
        loadComponent: () =>
          import('./pages/movies/assign-image-to-movie-page/assign-image-to-movie-page'),
        canActivate: [authGuard],
      },
      {
        path: 'movies/search/:name',
        loadComponent: () => import('./pages/movies/search-movie-page/search-movie-page'),
        canActivate: [authGuard],
      },
      {
        path: 'movies/:idSlug',
        loadComponent: () => import('./pages/movies/movie-page/movie-page'),
        canActivate: [authGuard],
      },
      {
        path: 'movie-theaters',
        loadComponent: () =>
          import('./pages/movie-theaters/movie-theaters-page/movie-theaters-page'),
        canActivate: [authGuard],
      },
      {
        path: 'movie-theaters/assign-movie/:movieTheaterId',
        loadComponent: () => import('./pages/movie-theaters/assign-movie-page/assign-movie-page'),
        canActivate: [authGuard],
      },
      {
        path: 'movie-theaters/status/:name',
        loadComponent: () => import('./pages/movie-theaters/movie-theater-page/movie-theater-page'),
        canActivate: [authGuard],
      },

      {
        path: 'manager/create-movie',
        loadComponent: () => import('./pages/movies/create-movie-page/create-movie-page'),
        canActivate: [authGuard],
      },
      {
        path: 'manager/create-movie-theater',
        loadComponent: () =>
          import('./pages/movie-theaters/create-movie-theater-page/create-movie-theater-page'),
        canActivate: [authGuard],
      },
      {
        path: 'manager',
        loadComponent: () => import('./pages/manager-page/manager-page'),
        canActivate: [authGuard],
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
