import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusMovieTheater',
  standalone: true,
})
export class MovieTheaterStatusPipe implements PipeTransform {
  transform(value: string | undefined): string {
    if (!value) return '';

    // 1. Caso: Movie theater available.
    if (value.includes('Movie theater available.')) {
      return 'Sala de cine disponible.';
    }

    // 2. Caso: Movie theater not available.
    if (value.includes('Movie theater not available.')) {
      return 'Sala de cine no disponible.';
    }

    // 3. Caso Dinámico: "Movie theater with {n} movies assigned."
    // Buscamos cualquier número (\d+) dentro del string
    const match = value.match(/\d+/);
    if (value.includes('movies assigned') && match) {
      const totalMovies = match[0];
      return `Cine con ${totalMovies} películas asignadas.`;
    }

    return value; // Si no coincide nada, devuelve el original
  }
}
