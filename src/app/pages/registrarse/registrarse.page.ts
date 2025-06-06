import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.page.html',
  styleUrls: ['./registrarse.page.scss'],
  standalone: false,
})
export class RegistrarsePage  {
  // Declaración de variables para los campos del formulario
  user: string = '';
  surname: string = '';
  educationLevel: string | null = null; // Puede ser 'Primaria', 'Secundaria', 'Terciaria' o 'Universitaria'
  birthDate: string = ''; // Formato 'YYYY-MM-DD'

  animationState: string = 'initial'; // Estado de la animación

  //método
  limpiar() {
    this.user = '';
    this.surname = '';
    this.educationLevel = null;
    this.birthDate = '';
  }

  //Método para abril el modal
  abrirModal() {
    this.animationState = 'open'; // Cambia el estado de la animación
    // Aquí puedes agregar la lógica para abrir el modal
  }
  guardar() {
    // Aquí puedes agregar la lógica para guardar los datos del formulario
    console.log('Datos guardados:', {
      user: this.user,
      surname: this.surname,
      educationLevel: this.educationLevel,
      birthDate: this.birthDate
    });
    this.limpiar(); // Limpia los campos del formulario después de guardar
    this.animationState = 'initial'; // Resetea el estado de la animación
  }
  // Constructor

  constructor() { }

  ngOnInit() {
  }

}
