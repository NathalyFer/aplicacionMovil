import { Component, OnInit } from '@angular/core';
import { MisDatosService } from 'src/app/services/mis-datos.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-datos-envio',
  templateUrl: './datos-envio.component.html',
  styleUrls: ['./datos-envio.component.scss'],
  standalone: false
})
export class DatosEnvioComponent {
  telefono: string = '';
  calleNumero: string = '';
  comuna: string = '';
  ciudad: string = '';
  instrucciones: string = '';
  usernameActual: string = '';
  direccionCargada = false;

  constructor( private misDatosService: MisDatosService,
               private alertController: AlertController
  ) { }

   ngOnInit() {
  this.misDatosService.getUsername().subscribe(username => {
    if (username) {
    this.usernameActual = username;
    this.cargarDireccion(username);
    }
  });
}

cargarDireccion(username: string) {
  this.misDatosService.obtenerDespachoPorUsuario(username).then(data => {
    if (data) {
      this.telefono = data.telefono;
      this.calleNumero = data.calle_numero;
      this.comuna = data.comuna;
      this.ciudad = data.ciudad;
      this.instrucciones = data.instrucciones;
      this.direccionCargada = true;
    }
  });
}

     guardarDespacho() {
    this.misDatosService.guardarInfoDespacho(
      this.usernameActual,
      this.telefono,
      this.calleNumero,
      this.comuna,
      this.ciudad,
      this.instrucciones
    ).then(() => {
      this.direccionCargada = true;
      this.mostrarAlertaExito();
  });
}

async mostrarAlertaExito() {
    const alert = await this.alertController.create({
      header: 'Éxito',
      message: 'Dirección guardada correctamente.',
      buttons: ['OK']
    });
    await alert.present();
  }

  async confirmarUsoDireccion(){
    const alert = await this.alertController.create({
     header: '¿Deseas usar esta dirección?',
      message: `
        <strong>Teléfono:</strong> ${this.telefono}<br>
        <strong>Dirección:</strong> ${this.calleNumero}, ${this.comuna}, ${this.ciudad}<br>
        <strong>Instrucciones:</strong> ${this.instrucciones || 'Ninguna'}
      `,
      buttons: [
        {
          text: 'Agregar otra',
          role: 'cancel',
          handler: () => {
            this.telefono = '';
            this.calleNumero = '';
            this.comuna = '';
            this.ciudad = '';
            this.instrucciones = '';
            this.direccionCargada = false;
          }
        },
        {
          text: 'Usar esta',
          handler: () => {
            // Aquí podrías navegar al siguiente paso del flujo de compra
            console.log('Dirección usada para envío');
          }
        }
      ]
    });

    await alert.present();
  }
}