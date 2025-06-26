import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
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
  isDBReady: boolean = false

  constructor( private router: Router,
                private alertController: AlertController,
                private misDatosService: MisDatosService) { }

  ngOnInit() {
    this.misDatosService.getIsDBReady().subscribe(isReady => {
      this.isDBReady = isReady;
      if (!isReady) {
        this.mostrarAlerta('La base de datos aún no está lista. Intenta en un momento.');
      }
    });
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


  //metodo login 
  async login() {
      // Validaciones de campos
    if (!this.username || !this.password) {
      this.mostrarAlerta('Por favor, complete todos los campos.');
      return;
    }

    // Validar que el campo usuario tenga entre 3 y 8 caracteres
      if (this.username.length < 3 || this.username.length > 8) {
        this.mostrarAlerta('El usuario debe tener entre 3 y 8 caracteres.');
        return;
      }

      // Validar que la contraseña tenga 4 caracteres
      if (this.password.length !== 4) {
        this.mostrarAlerta('La contraseña debe tener 4 caracteres.');
        return;
      }
       // Validar usuario en base de datos
      const username = await this.misDatosService.validarUsuario(this.username, this.password);

            // Valida para iniciar sesión
      if (username) {
        this.misDatosService.setUsername(this.username);
        //si todas las validaciones son correctas
        localStorage.setItem('usuarioActivo', 'true'); // simula sesión iniciada
        
        this.router.navigate(['/home'], {
          queryParams: { username: this.username }
        });
      } else {
        // Usuario inválido mostrar mensaje
        this.mostrarAlerta('Usuario o contraseña incorrectos.');
      }}

  

  registrarse() {
    this.router.navigate(['/registrarse']);
  }

  recuperar() {
    this.router.navigate(['/recuperar']); 
  }
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
