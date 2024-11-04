import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupService } from '../../services/signup.service';

@Component({
  selector: 'app-name',
  templateUrl: './name.component.html',
  styleUrls: ['./name.component.scss'],
})
export class NameComponent {
  constructor(private signUpService: SignupService, private router: Router) {}

  @ViewChild('form') form!: NgForm;

  onNextClick(): void {
    if (this.form.valid) {
      const name = this.form.value;
      const { first_name, last_name } = name;
      // TODO: save the name in the local storage
      this.signUpService.saveToLocalStorage('first_name', first_name);
      this.signUpService.saveToLocalStorage('last_name', last_name);
      this.router.navigate(['/signup/address']);
    }
    console.log(this.form.value, 'value');
  }
}
