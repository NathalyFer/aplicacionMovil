import { Component, OnInit } from '@angular/core';
import { MisDatosService } from 'src/app/services/mis-datos.service';

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

  constructor( private misDatosService: MisDatosService) { }


   guardarDespacho() {
    this.misDatosService.getUsername().subscribe(username => {
      if (!username) {
        console.error('No hay usuario activo');
        return;
      }

      this.misDatosService.guardarInfoDespacho(
        username,
        this.telefono,
        this.calleNumero,
        this.comuna,
        this.ciudad,
        this.instrucciones
      ).then(() => {
        console.log('Dirección guardada correctamente');
      }).catch(error => {
        console.error('Error al guardar dirección:', error);
      });
    });
  }
}


