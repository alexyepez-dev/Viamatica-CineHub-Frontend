import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'movieFormButton',
})
export class MovieFormButtonPipe implements PipeTransform {
  transform(value: string): string {
    if (value === '/home/manager/create-movie') return 'Crear película';
    if (value === '/home/movies/update') return 'Actualizar película';
    if (value === '/home/movies/assign-image') return 'Agregar imagen';

    return value;
  }
}
