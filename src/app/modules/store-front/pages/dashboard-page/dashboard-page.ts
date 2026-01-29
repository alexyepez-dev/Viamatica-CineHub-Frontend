import { Component, inject } from '@angular/core';
import { TotalUsersCard } from '@dashboard/components/total-users-card/total-users-card';
import { TotalMoviesCard } from '@dashboard/components/total-movies-card/total-movies-card';
import { AvailableMovieTheatersCard } from '@dashboard/components/available-movie-theaters-card/available-movie-theaters-card';
import { TotalMovieTheatersCard } from '@dashboard/components/total-movie-theaters-card/total-movie-theaters-card';
import { DashboardService } from '@dashboard/services/dashboard.service';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'dashboard-page',
  imports: [TotalUsersCard, TotalMoviesCard, AvailableMovieTheatersCard, TotalMovieTheatersCard],
  template: `
    <div class="mt-12 flex justify-center items-center">
      <div
        class="mb-12 gap-y-10 gap-x-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2"
      >
        <!--  -->
        @if (dashboardResource.isLoading()) {
          <div class="flex justify-center items-center h-screen">
            <span class="loading loading-spinner loading-lg"></span>
          </div>
        }
        <!--  -->
        @if (dashboardResource.hasValue()) {
          <total-movie-theaters-card
            [movieTheaters]="dashboardResource.value().totalMovieTheaters"
          />
          <available-movie-theaters-card
            [available]="dashboardResource.value().availableMovieTheaters"
          />
          <total-movies-card [movies]="dashboardResource.value().totalMovies" />
          <total-users-card [users]="dashboardResource.value().totalUsers" />
        }
        <!--  -->
      </div>
    </div>
  `,
})
export default class DashboardPage {
  dashboardService = inject(DashboardService);

  dashboardResource = rxResource({
    params: () => ({}),
    stream: () => this.dashboardService.getDashboard(),
  });
}
