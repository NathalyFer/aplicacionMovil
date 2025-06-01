import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
  animations: [
    trigger('slideAnimation', [
      state('start', style({ opacity: 0 })),
      transition(':enter', [animate(500, style({ opacity: 1 }))])
    ])
  ]
})
export class HomePage {
  user: string = '';
  surname: string = '';
  educationLevel: string = '';
  birthDate: string = '';

  save() {
    console.log('Nombre:', this.user);
    console.log('Apellido:', this.surname);
    console.log('Nivel de educación:', this.educationLevel);
    console.log('Fecha de nacimiento:', this.birthDate);
  }

  constructor(private router: Router) {}

   ionViewDidEnter() {
    // Redirige a login apenas la vista entra
    //this.router.navigate(['/login']);
  }



}
