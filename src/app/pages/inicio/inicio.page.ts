import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: false,
})
export class InicioPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
        setTimeout(() => {
      this.router.navigate(['/login']);
    }, 3000); // Redirige a login luego de 3 segundos
  }
  }


