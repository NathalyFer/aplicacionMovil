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
  username: string = '';
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


  //metodo login completo
  login() {
      // Validar que el campo usuario no esté vacío
      if (!this.username) {
        this.mostrarAlerta('Por favor, complete todos los campos.');
        return;
      }
      // Validar que el campo usuario tenga entre 3 y 8 caracteres
      if (this.username.length < 3 || this.username.length > 8) {
        this.mostrarAlerta('El usuario debe tener entre 3 y 8 caracteres.');
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
    this.router.navigate(['/home'], {state: { user: this.username }});
  }
  

}

  //metodo validar email
  //validarEmail(email: string): boolean {
    //const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //return re.test(email);
 // }
       // Validar que los campo correo no estén vacíos
      //if (!this.email) {
       // this.mostrarAlerta('Por favor, complete todos los campos.');
       // return;
     // }
      //validar formato del correo electrónico
     // if (!this.validarEmail(this.email)) {
       // this.mostrarAlerta('Por favor, ingrese un correo electrónico válido.');
       // return;
      //}
