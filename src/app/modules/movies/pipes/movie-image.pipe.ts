import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'movieImage',
  standalone: true
})
export class MovieImagePipe implements PipeTransform {
  transform(urls: string[] | undefined | null): string {
    const defaultImage = 'no-image.jpg';

    if (!urls || urls.length === 0) {
      return defaultImage;
    }

    // Si encuentra uno válido lo retorna, si no, intentamos con el último del array
    return urls[urls.length - 1] || defaultImage;
  }
}