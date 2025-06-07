import { Component, OnInit } from '@angular/core';
import { trigger, state,style,animate, transition } from '@angular/animations';
import { InfoUsuarioModalPage } from '../info-usuario-modal/info-usuario-modal.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.page.html',
  styleUrls: ['./registrarse.page.scss'],
  standalone: false,
 animations: [
    trigger('slideAnimation', [
      transition('void => animate', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        animate('1s ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition('reset => animate', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        animate('1s ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ])
    ])
  ]
})
export class RegistrarsePage  {
  // Declaración de variables para los campos del formulario
  nombre: any = '';
  apellido: any = '';
  email: any = '';
  usuario: any = '';
  password: any = '';
  educationLevel: any | null = null; // Puede ser 'Primaria', 'Secundaria', 'Terciaria' o 'Universitaria'
  selectedDate: any='';

  animationState: string = 'initial'; // Estado de la animación

  //método
  limpiar() {
    this.nombre = '';
    this.apellido = '';
    this.email = '';
    this.usuario = '';
    this.password = '';
    this.selectedDate = '';
    this.educationLevel = '';
    this.animationState = 'animate'; // Resetea el estado de la animación

    //reset para  poder animar nuevamente
    setTimeout(() => {
      this.animationState = 'reset'; // Resetea el estado de la animación para que pueda animarse nuevamente
    }, 1100);

  }

  //Método para abril el modal
  async abrirModal() {
    this.animationState = 'open'; // Cambia el estado de la animación
    // Aquí puedes agregar la lógica para abrir el modal
    const modal = await this.modalCtrl.create({
      component: InfoUsuarioModalPage,
      componentProps: {
        nombre: this.nombre,
        apellido: this.apellido,
        email: this.email,
        usuario: this.usuario,
        password: this.password,
        educationLevel: this.educationLevel,
        selectedDate: this.selectedDate
      },
      cssClass: 'modal-card'
});

    await modal.present();
  }
  guardar() {
    // Aquí puedes agregar la lógica para guardar los datos del formulario
    console.log('Datos guardados:', {
      user: this.nombre,
      surname: this.apellido  ,
      email: this.email,
      username: this.usuario,
      password: this.password,
      selectedDate: this.selectedDate,
      educationLevel: this.educationLevel
    });
    this.limpiar(); // Limpia los campos del formulario después de guardar
    this.animationState = 'initial'; // Resetea el estado de la animación
  }
  // Constructor

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

}
