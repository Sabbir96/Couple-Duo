import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topup',
  templateUrl: './topup.component.html',
  styleUrl: './topup.component.scss',
})
export class TopupComponent {
  constructor(private router: Router) {}

  selectOperator(operator: string) {
    this.router.navigate(['/topup-number'], {
      queryParams: { operator },
    });
  }
}
