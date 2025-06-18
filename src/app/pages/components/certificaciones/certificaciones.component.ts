import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-certificaciones',
  templateUrl: './certificaciones.component.html',
  styleUrls: ['./certificaciones.component.scss'],
  standalone: false,
})
export class CertificacionesComponent {
  nombreCertificado: string = '';
  fechaObtencion: string = '';
  tieneVencimiento: boolean = false;
  fechaVencimiento: string = '';

  constructor() {}

  guardarCertificacion() {
    const certificacion = {
      nombre: this.nombreCertificado,
      obtencion: this.fechaObtencion,
      vence: this.tieneVencimiento,
      fechaVencimiento: this.tieneVencimiento ? this.fechaVencimiento : null
    };

    console.log('Certificación guardada:', certificacion);
  }
}