import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {

  constructor() { }

    onForgotPassword() {
    console.log('Función para recuperar contraseña llamada');
    // Aquí puedes hacer navegación o lógica adicional
  }

  ngOnInit() {
  }

}
