import { Component, OnInit } from '@angular/core';
import { CameraService } from '../../services/camera.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
})
export class CameraComponent implements OnInit {
  constructor(public cameraService: CameraService, private router: Router) {}

  ngOnInit(): void {}

  onNextClick() {
    this.cameraService.triggerSnapshot();
    this.router.navigate(['/signup/dob']);
  }
}