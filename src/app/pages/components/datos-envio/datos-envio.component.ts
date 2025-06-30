import { Component, OnInit } from '@angular/core';
import { MisDatosService } from 'src/app/services/mis-datos.service';
import { AlertController } from '@ionic/angular';

// Animaciones
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';


@Component({
  selector: 'app-datos-envio',
  templateUrl: './datos-envio.component.html',
  styleUrls: ['./datos-envio.component.scss'],
  standalone: false,
  animations: [
    trigger('slideAnimation', [
      transition('void => *', []), // no animar al cargar
      transition('* => animateSlide', [
        animate(
          '1s ease-out',
          keyframes([
            style({ opacity: 0, transform: 'translateX(-100%)', offset: 0 }),
            style({ opacity: 1, transform: 'translateX(0)', offset: 1 }),
          ])
        )
      ])
    ])
  ]

})
export class DatosEnvioComponent {

    // Mis Datos
  nombre: string = '';
  apellido: string = '';
  email: string = '';
  fechaNacimiento: string = '';
  datosCargados = false;
  
  telefono: string = '';
  calleNumero: string = '';
  comuna: string = '';
  ciudad: string = '';
  region: string = '';
  direccionCargada = false;

  usernameActual: string = '';
  // Animación
  animationState: string = 'animateSlide';
  selectedDate: Date = new Date(); 

  constructor( private misDatosService: MisDatosService,
               private alertController: AlertController
  ) { }

   ngOnInit() {
  this.misDatosService.getUsername().subscribe(username => {
    if (username) {
    this.usernameActual = username;
    this.cargarMisDatos(username);
    this.cargarDireccion(username);
    }
  });
}



 // Carga los datos personales del usuario.//
cargarMisDatos(username: string) {
  this.misDatosService.obtenerUsuarioPorUsername(username).then(data => {
    if (username) {
      this.nombre = data.nombre;
      this.apellido = data.apellido;
      this.email = data.email;
      this.fechaNacimiento = data.fechaNacimiento;
      this.datosCargados = true;
    }
  });
}

 guardarMisDatos() {
    this.misDatosService.actualizarUsuario({
      username: this.usernameActual,
      nombre: this.nombre,
      apellido: this.apellido,
      email: this.email,
      fecha_nacimiento: this.fechaNacimiento
    }).then(() => {
      this.datosCargados = true;
      this.mostrarAlertaExito('Datos personales guardados correctamente.');
    });
  }

cargarDireccion(username: string) {
  this.misDatosService.obtenerDespachoPorUsuario(username).then(data => {
    if (data) {
      this.telefono = data.telefono;
      this.calleNumero = data.calle_numero;
      this.comuna = data.comuna;
      this.ciudad = data.ciudad;
      this.region = data.region;
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
      this.region
    ).then(() => {
      this.direccionCargada = true;
      this.mostrarAlertaExito( 'Dirección guardada correctamente.');
  });
}

async mostrarAlertaExito(message: string ) {
    const alert = await this.alertController.create({
      header: 'Éxito',
      message: message,
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
        <strong>Instrucciones:</strong> ${this.region || 'Ninguna'}
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
            this.region = '';
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