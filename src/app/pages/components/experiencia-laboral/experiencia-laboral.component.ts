import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-experiencia-laboral',
  templateUrl: './experiencia-laboral.component.html',
  styleUrls: ['./experiencia-laboral.component.scss'],
  standalone: false,
})

export class ExperienciaLaboralComponent {
  empresa: string = '';
  anioInicio: string = '';
  actualmenteTrabaja: boolean = false;
  anioTermino: string = '';
  cargo: string = '';
  
  constructor() {}


  guardar() {
    console.log('Datos guardados:', {
      empresa: this.empresa,
      anioInicio: this.anioInicio,
      actualmenteTrabaja: this.actualmenteTrabaja,
      anioTermino: this.anioTermino,
      cargo: this.cargo,
    });
  }
}
