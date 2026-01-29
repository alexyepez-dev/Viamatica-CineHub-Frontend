import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Dashboard } from '@dashboard/interfaces/dashboard.interface';
import { environment } from '@envs/environment.development';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private http = inject(HttpClient);
  private baseUrl = environment.API_URL;

  getDashboard = () =>
    this.http.get<Dashboard>(`${this.baseUrl}/dashboard`).pipe(tap((x) => console.log(x)));
}
