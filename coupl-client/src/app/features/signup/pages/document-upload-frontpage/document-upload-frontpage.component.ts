import { Component } from '@angular/core';
import { CameraService } from '../../services/camera.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-document-upload-frontpage',
  templateUrl: './document-upload-frontpage.component.html',
  styleUrl: './document-upload-frontpage.component.scss',
})
export class DocumentUploadFrontpageComponent {
  constructor(public cameraService: CameraService, private router: Router) {}

  ngOnInit(): void {}

  onNextClick() {
    this.cameraService.triggerSnapshot();
    this.router.navigate(['/signup/document-back-page']);
  }
}
