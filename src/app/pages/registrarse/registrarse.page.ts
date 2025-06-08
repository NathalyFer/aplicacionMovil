import { Component, OnInit } from '@angular/core';
import { trigger, keyframes,style,animate, transition } from '@angular/animations';
import { InfoUsuarioModalPage } from '../info-usuario-modal/info-usuario-modal.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.page.html',
  styleUrls: ['./registrarse.page.scss'],
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

export class RegistrarsePage  {
  // Declaración de variables para los campos del formulario
  nombre: any = '';
  apellido: any = '';
  email: any = '';
  usuario: any = '';
  password: any = '';
  educationLevel: any | null = null; // Puede ser 'Primaria', 'Secundaria', 'Terciaria' o 'Universitaria'
  selectedDate: any='';

  
  animationState: string = '';

  //método
limpiar() {
  this.animationState = 'animateSlide';

  //limpiar variables
    this.nombre = '';
    this.apellido = '';
    this.email = '';
    this.usuario = '';
    this.password = '';
    this.educationLevel = '';
    this.selectedDate = null;

   // Restablecer el estado para permitir futuras ejecuciones
  setTimeout(() => {
    this.animationState = '';
  }, 1100); // debe ser un poco más que 1s para permitir reinicio
}

  //Método para abril el modal
  async abrirModal() {
    this.animationState = 'visible'; // Cambia el estado de la animación
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
    this.animationState = 'visible'; // Resetea el estado de la animación
  }
  // Constructor

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

}
