import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { dashboardKeysCache } from '@dashboard/common/dashboardKeysCache.common';
import { Dashboard } from '@dashboard/interfaces/dashboard.interface';
import { environment } from '@envs/environment.development';
import { CacheService } from '@shared/services/cache.service';
import { of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private http = inject(HttpClient);
  private baseUrl = environment.API_URL;
  private getDashboardCache = inject(CacheService<Dashboard>);

  getDashboard = () => {
    const key = dashboardKeysCache.dashboard();
    const cached = this.getDashboardCache.get(key);

    if (cached) return of(cached);

    return this.http.get<Dashboard>(`${this.baseUrl}/dashboard`).pipe(
      tap((x) => console.log(x)),
      tap((resp) => this.getDashboardCache.set(key, resp)),
    );
  };
}
