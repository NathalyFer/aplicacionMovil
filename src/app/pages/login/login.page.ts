import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { MisDatosService } from 'src/app/services/mis-datos.service';




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
                private alertController: AlertController,
                private misDatosService: MisDatosService) { }
  
  registrarse() {
    this.router.navigate(['/registrarse']);
  }

  recuperar() {
    this.router.navigate(['/recuperar']); 
  }

  
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

  
  

    //  Verificación de  usuario con SQLite
    this.misDatosService.validarUsuario(this.username, this.password)
      .then(usuario => {
        if (usuario) {
          // Usuario válido → redirigir
          this.router.navigate(['/home'], {
            queryParams: { username: usuario.usuario }
          });
        } else {
          // Usuario o contraseña incorrectos
          this.mostrarAlerta('Usuario o contraseña incorrectos.');
        }
      })
      .catch(err => {
        console.error('Error validando usuario:', err);
        this.mostrarAlerta('Ocurrió un error al validar. Intenta de nuevo.');
      });
  }
}


function recuperar() {
  throw new Error('Function not implemented.');
}
// function recuperar() {
//   throw new Error('Function not implemented.');
// }
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
      ///
