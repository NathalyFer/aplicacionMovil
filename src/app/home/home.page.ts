import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  user: string = '';

  constructor(private router: Router) {}

   ionViewDidEnter() {
    // Redirige a login apenas la vista entra
    this.router.navigate(['/login']);
  }



}
