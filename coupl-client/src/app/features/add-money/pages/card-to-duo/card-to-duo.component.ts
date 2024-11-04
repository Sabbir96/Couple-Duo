import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-to-duo',
  templateUrl: './card-to-duo.component.html',
  styleUrl: './card-to-duo.component.scss',
})
export class CardToDuoComponent {
  constructor(private router: Router) {}

  selectedCardType(cardType: string) {
    this.router.navigate(['/cardtoduoform', { cardType }]);

    console.log(cardType);
  }
}
