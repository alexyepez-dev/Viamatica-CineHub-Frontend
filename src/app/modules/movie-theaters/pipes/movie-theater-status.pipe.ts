import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusMovieTheater',
})
export class MovieTheaterStatusPipe implements PipeTransform {
  transform(value: string): string {
    if (value === 'Movie theater available.') return 'Sala disponible';
    if (value === 'Movie theater not available.') return 'Sala no disponible';

    return value;
  }
}
