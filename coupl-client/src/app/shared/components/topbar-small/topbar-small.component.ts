import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-topbar-small',
  templateUrl: './topbar-small.component.html',
  styleUrl: './topbar-small.component.scss',
})
export class TopbarSmallComponent {
  @Input() title: string | undefined;
}
