import { Component, Input, OnInit } from '@angular/core';
import { MisDatosService } from 'src/app/services/mis-datos.service';

@Component({
  selector: 'app-mis-datos',
  templateUrl: './mis-datos.component.html',
  styleUrls: ['./mis-datos.component.scss'],
  standalone: false

})
export class MisDatosComponent implements OnInit {
  @Input() username!: string;
  usuario: any;

  constructor(private datosService: MisDatosService) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  async cargarDatos() {
    this.usuario = await this.datosService.getUsuarioPorUsername(this.username);
  }
}