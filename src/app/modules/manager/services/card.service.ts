import { Injectable } from '@angular/core';
import { Card } from '@manager/interfaces/card-interface';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  cards: Card[] = [
    {
      title: "Películas",
      action: "Crear película"
    },
    {
      title: "Salas de cine",
      action: "Crear salas de cine"
    },
  ]

}