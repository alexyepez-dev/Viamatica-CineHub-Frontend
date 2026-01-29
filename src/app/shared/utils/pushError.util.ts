import { WritableSignal } from '@angular/core';

export const pushError = (hasError: WritableSignal<boolean>, timeout: number) =>
  setTimeout(() => {
    hasError.set(false);
  }, timeout);
