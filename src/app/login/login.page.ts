import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor( private router: Router,
                private alertController: AlertController
  ) { }

  
  //metodo para mostrar alerta
  async mostrarAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }
  //metodo validar email
  validarEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  //metodo login completo
  login() {
      // Validar que los campo correo no estén vacíos
      if (!this.email) {
        this.mostrarAlerta('Por favor, complete todos los campos.');
        return;
      }
      //validar formato del correo electrónico
      if (!this.validarEmail(this.email)) {
        this.mostrarAlerta('Por favor, ingrese un correo electrónico válido.');
        return;
      }
      // Validar que el campo contraseña no esté vacío
      if (!this.password) {
        this.mostrarAlerta('Por favor, complete todos los campos.');
        return;
      }
      // Validar que la contraseña tenga 4 caracteres
      if (this.password.length !== 4) {
        this.mostrarAlerta('La contraseña debe tener 4 caracteres.');
        return;
      }
  
  

    // Si la autenticación es exitosa, redirigir al usuario
    this.router.navigate(['/home'], {state: { user: this.email }});
  }
  

}
