import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusName',
})
export class MovieStatusPipe implements PipeTransform {
  transform(value: string): string {
    if (value === 'NowPlaying') return 'En cartelera';
    if (value === 'NotAvailable') return 'Pronto';

    return value;
  }
}
