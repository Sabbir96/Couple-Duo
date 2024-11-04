import { Component } from '@angular/core';
import { CameraService } from '../../services/camera.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-document-upload-backpage',
  templateUrl: './document-upload-backpage.component.html',
  styleUrl: './document-upload-backpage.component.scss',
})
export class DocumentUploadBackpageComponent {
  constructor(public cameraService: CameraService, private router: Router) {}

  ngOnInit(): void {}

  onNextClick() {
    this.cameraService.triggerSnapshot();
    this.router.navigate(['/signup/name']);
  }
}
