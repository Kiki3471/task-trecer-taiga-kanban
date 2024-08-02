import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SaydbaromComponent } from './layout/saydbarom/saydbarom.component';
import { StatusListContainerComponent } from './features/feature-status-list/status-list-container/status-list-container.component';
import { HeaderComponent } from './layout/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    SaydbaromComponent,
    StatusListContainerComponent,
    HeaderComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
}
