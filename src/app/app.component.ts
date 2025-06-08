import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor(
    private menu: MenuController,
    private router: Router
  ) {
    // 🔽 Forzar modo claro eliminando clase 'dark'
    document.body.classList.remove('dark');
  }

  cerrarSesion() {
    console.log('Sesión cerrada');
    this.menu.close('mainMenu'); // Ahora sí se cierra correctamente
    this.router.navigate(['/login']); // Navega a /login
  }

  navegarYcerrar(ruta: string) {
    this.menu.close('mainMenu');
    this.router.navigate([ruta]);
  }
}