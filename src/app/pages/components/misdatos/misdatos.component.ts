import { Component, Input, OnInit } from '@angular/core';
import { MisDatosService } from 'src/app/services/mis-datos.service';

@Component({
  selector: 'app-misdatos',
  templateUrl: './misdatos.component.html',
  styleUrls: ['./misdatos.component.scss'],
  standalone: false
})
export class MisdatosComponent  {

    @Input() username: string = ''; 

  //variables de mis datos //
    id: number = 0;
    nombre: string = '';
    apellido: string = '';
    email: string = '';
    password: string = '';
    fechaNacimiento: string = '';
    mensaje: string = '';

  constructor(private datosService: MisDatosService) { }

  ngOnInit() {
    this.datosService.getUsername().subscribe(currentUsername => {
      if (currentUsername) {
        this.datosService.getUsuarioPorUsername(currentUsername).then(usuario => {
          if (usuario) {
            this.id = usuario.id; // Guardamos el id para usar luego en update
            this.nombre = usuario.nombre;
            this.apellido = usuario.apellido;
            this.email = usuario.email;
            this.username = usuario.username;
            this.password = usuario.password;
            this.fechaNacimiento = usuario.fecha_nacimiento;
          }
        });
      }
    });
  }

  async guardarCambios() {
    const success = await this.datosService.updateUsuario(
      this.id,
      this.nombre,
      this.apellido,
      this.email,
      this.username,
      this.password,
      this.fechaNacimiento,
      this.mensaje = 'Datos actualizados correctamente'
    
    );

    if (success) {
      // Opcional: muestra mensaje o refresca algo en UI
      console.log('Datos actualizados correctamente');
    } else {
      console.error('Error al actualizar datos');
    }
  }
}