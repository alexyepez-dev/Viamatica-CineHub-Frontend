import { Injectable } from '@angular/core';
import { retry, throwError, timer, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResilienceService {
  strategy = () =>
    retry({
      count: 30,
      delay: (error, _) => {
        const iterator = error.status === 0 || (error.status >= 500 && error.status < 600);

        if (!iterator) return throwError(() => error);

        return timer(1000);
      },
    });

  catchingError = () => catchError((error) => throwError(() => error));
}
