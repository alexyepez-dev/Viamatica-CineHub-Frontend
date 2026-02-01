import { Injectable } from '@angular/core';
import { retry, throwError, timer, catchError, MonoTypeOperatorFunction } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResilienceService<T> {
  strategy = (): MonoTypeOperatorFunction<T> =>
    retry({
      count: 30,
      delay: (error, _) => {
        const iterator = error.status === 0 || (error.status >= 500 && error.status < 600);

        if (!iterator) return throwError(() => error);

        return timer(1000);
      },
    });

  catchingError = (): MonoTypeOperatorFunction<T> => catchError((error) => throwError(() => error));
}
