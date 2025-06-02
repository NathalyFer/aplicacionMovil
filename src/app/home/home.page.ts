import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InfoUsuarioModalPage } from '../pages/info-usuario-modal/info-usuario-modal.page';
import { ModalController } from '@ionic/angular';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
 animations: [
    trigger('slideAnimation', [
      state('start', style({ transform: 'translateX(0)' })),
      state('end', style({ transform: 'translateX(0)' })),
      transition('start => end', [
        style({ transform: 'translateX(-100%)' }),
        animate('1s ease-out')
      ])
    ])
  ]
})


export class HomePage {
  user: string = '';
  surname: string = '';
  educationLevel: string|null = null;
  birthDate: string = '';

   animationState = 'start'; // Estado inicial para animación

   constructor(private route: ActivatedRoute,
    private modalCtrl: ModalController) {}

   ngOnInit() {
  this.route.queryParams.subscribe(params => {
    this.user = params['user'] || 'Usuario';
  });
}

     // Método para limpiar y disparar animación
  limpiar() {
    this.user = '';
    this.surname = '';
    this.educationLevel = null;
    this.birthDate = '';
    this.triggerSlideAnimation();
  }
   // Control de animación
  triggerSlideAnimation() {
    this.animationState = 'end';
    setTimeout(() => {
      this.animationState = 'start';
    }, 1000);
  }
 
  save() {
    console.log('Nombre:', this.user);
    console.log('Apellido:', this.surname);
    console.log('Nivel de educación:', this.educationLevel);
    console.log('Fecha de nacimiento:', this.birthDate);
  }



  // ✅ MÉTODO PARA ABRIR EL MODAL
  async abrirModal() {
    const modal = await this.modalCtrl.create({
      component: InfoUsuarioModalPage,
      componentProps: {
        user: this.user,
        surname: this.surname,
        educationLevel: this.educationLevel,
        birthDate: this.birthDate
      }
    });
      await modal.present();

    const { data, role } = await modal.onWillDismiss();
    console.log('Modal cerrado con data:', data, 'y role:', role);
  }
  

  }

