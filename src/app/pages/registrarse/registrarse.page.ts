import { Component, OnInit } from '@angular/core';
import { trigger, keyframes,style,animate, transition } from '@angular/animations';
import { InfoUsuarioModalPage } from '../info-usuario-modal/info-usuario-modal.page';
import { MenuController, ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import {FormatearFechaPipe} from '../../pipes/formatear-fecha.pipe';


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
  username: any = '';
  password: any = '';
  educationLevel: any | null = null; // Puede ser 'Primaria', 'Secundaria', 'Terciaria' o 'Universitaria'
  fechaFormateada: any='';

  
  animationState: string = '';
  router: any;
  nombreTouched = false;
  selectedDate: any;

  // Constructor para inyectar el ModalController y AlertController
  constructor(private modalCtrl: ModalController, 
              private alertController: AlertController,
              private formatearFechaPipe: FormatearFechaPipe,) { }

  
  ngOnInit() {

  }
  // Método para mostrar alertas
  async mostrarAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }


 guardar() {

    const fechaFormateada = this.formatearFechaPipe.transform(this.selectedDate);

  // Validar campos vacíos
  if (
    !this.nombre ||
    !this.apellido ||
    !this.email ||
    !this.username ||
    !this.password ||
    !this.educationLevel ||
    !this.selectedDate
  ) {
    this.mostrarAlerta('Por favor, complete todos los campos.');
    return;
  }

  // Validar longitud del nombre
  if (this.nombre.trim().length === 0) {
    this.mostrarAlerta('El nombre no puede estar vacío.');
    return;
  }

  // Validar longitud del apellido
  if (this.apellido.trim().length === 0) {
    this.mostrarAlerta('El apellido no puede estar vacío.');
    return;
  }

  // Validar formato del correo
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(this.email)) {
    this.mostrarAlerta('El correo no tiene un formato válido.');
    return;
  }

  // Validar nombre de usuario (3-8 caracteres)
  if (this.username.length < 3 || this.username.length > 8) {
    this.mostrarAlerta('El usuario debe tener entre 3 y 8 caracteres.');
    return;
  }

  // Validar contraseña: exactamente 4 dígitos numéricos
  const passwordRegex = /^[0-9]{4}$/;
  if (!passwordRegex.test(this.password)) {
    this.mostrarAlerta('La contraseña debe tener exactamente 4 dígitos numéricos.');
    return;
  }

  // Validar nivel de educación
  if (!this.educationLevel) {
    this.mostrarAlerta('Debe seleccionar un nivel de educación.');
    return;
  }

  // Validar fecha de nacimiento
  if (!this.selectedDate) {
    this.mostrarAlerta('Debe seleccionar una fecha de nacimiento.');
    return;
  }

  // Si todas las validaciones pasan
  console.log('Datos válidos:', {
    nombre: this.nombre,
    apellido: this.apellido,
    email: this.email,
    username: this.username,
    password: this.password,
    educationLevel: this.educationLevel,
    fechaNacimiento: this.fechaFormateada,
  });

  this.mostrarAlerta('¡Registro exitoso!');
  // Aquí podrías redirigir, guardar o abrir un modal
}

  
  

  //método
limpiar() {
  this.animationState = 'animateSlide';

  //limpiar variables
    this.nombre = '';
    this.apellido = '';
    this.email = '';
    this.username = '';
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

    this.fechaFormateada = this.formatearFechaPipe.transform(this.selectedDate);

    this.animationState = 'visible'; // Cambia el estado de la animación
    // Aquí puedes agregar la lógica para abrir el modal
    const modal = await this.modalCtrl.create({
      component: InfoUsuarioModalPage,
      componentProps: {
        nombre: this.nombre,
        apellido: this.apellido,
        email: this.email,
        username: this.username,
        password: this.password,
        educationLevel: this.educationLevel,
        fechaNacimiento: this.fechaFormateada
      },
      cssClass: 'modal-card'
});

    await modal.present();
  }

  // Método para cerrar el modal
  async cerrarModal() {
    this.animationState = 'animateSlide'; // Cambia el estado de la animación
    const modal = await this.modalCtrl.getTop();
    if (modal) {
      await modal.dismiss();
    }
  this.animationState = ''; // Restablece el estado de la animación
  
  }}

