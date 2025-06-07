import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
  standalone: false,
})
export class RecuperarPage implements OnInit {
  // Declaración de variables para los campos del formulario
  rut: string = '';
  email: string = '';

  constructor(private alertController: AlertController) { }

  ngOnInit() {}

  // Método para recuperar la contraseña
  async recuperar() {
    // Validar que el campo RUT no esté vacío
    if (!this.rut) {
      await this.mostrarAlerta('Por favor, complete todos los campos.');
      return;
    }
    // Validar que el campo email no esté vacío
    if (!this.email) {
      await this.mostrarAlerta('Por favor, complete todos los campos.');
      return;
    }
    // Validar que el email tenga un formato válido
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(this.email)) {
      await this.mostrarAlerta('Por favor, ingrese un email válido.');
      return;
    }
    // Validar que el RUT tenga un formato válido (ejemplo simple)
    const rutPattern = /^\d{1,8}-[0-9Kk]$/;
    if (!rutPattern.test(this.rut)) {
      await this.mostrarAlerta('Por favor, ingrese un RUT válido (ejemplo: 12345678-9).');
      return;
    }

    // Aquí puedes agregar la lógica para recuperar la contraseña
    console.log('Recuperar contraseña para:', { rut: this.rut, email: this.email });
    await this.mostrarAlerta('Link de recuperación enviado exitosamente a su email.');
    this.limpiar(); // Limpia los campos del formulario después de recuperar
  }
  // Método para limpiar los campos del formulario
  limpiar() {
    this.rut = '';
    this.email = '';
  }
  // Método para mostrar alerta
  async mostrarAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }


}
