import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor() {
    // 🔽 Forzar modo claro eliminando clase 'dark'
    document.body.classList.remove('dark');
  }
}