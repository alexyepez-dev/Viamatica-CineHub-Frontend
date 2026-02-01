import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CacheService<T> {
  private cache = new Map<string, T>();

  get = (key: string): T => this.cache.get(key)!;

  set = (key: string, value: T) => this.cache.set(key, value);
}