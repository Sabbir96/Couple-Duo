import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-send-money-select',
  templateUrl: './send-money-select.component.html',
  styleUrl: './send-money-select.component.scss',
})
export class SendMoneySelectComponent {
  constructor(private router: Router) {}

  selectOption(operator: string) {
   
    

    if (operator === 'external') {
      this.router.navigate(['/send-money-external-email']);
    }

    if (operator === 'internal') {
      this.router.navigate(['/send-money-email']);
    }

  }
}
