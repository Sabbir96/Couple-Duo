import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ProfileService } from './profile.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [SharedModule, HttpClientModule],
  providers: [ProfileService],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.profileService.getProfile().subscribe({
      next: (res) => {
        console.log('res', res);
      },
      error: (err) => {
        console.log('err', err);
      },
    });
  }
  
}
