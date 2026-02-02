import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'movieFormButton',
})
export class MovieFormButtonPipe implements PipeTransform {
  transform(value: string): string {
    if (value.includes('/home/manager/create-movie')) return 'Crear película';
    if (value.includes('/home/movies/update')) return 'Actualizar película';
    if (value.includes('/home/movies/assign-image')) return 'Agregar imagen';

    return value;
  }
}
