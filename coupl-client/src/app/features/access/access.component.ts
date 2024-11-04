import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-access',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './access.component.html',
  styleUrl: './access.component.scss',
})
export class AccessComponent {
  @ViewChild('bgVideo') bgVideo!: ElementRef;

  ngAfterViewInit() {
    this.playVideo();
  }

  playVideo() {
    this.bgVideo.nativeElement.play().catch(() => {
      // If the autoplay was prevented, add an event listener for the first user interaction
      document.addEventListener(
        'click',
        () => this.bgVideo.nativeElement.play(),
        { once: true }
      );
    });
  }
}
