import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-document-upload',
  templateUrl: './document-upload.component.html',
  styleUrl: './document-upload.component.scss',
})
export class DocumentUploadComponent {
  documentControl = new FormControl(null);
  constructor(private router: Router) {}

  onNextClick() {
    this.router.navigate(['/signup/document-front-page']);
  }
}
