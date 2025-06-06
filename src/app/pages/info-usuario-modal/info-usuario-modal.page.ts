import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';


@Component({
  standalone: false,
  selector: 'app-info-usuario-modal',
  templateUrl: './info-usuario-modal.page.html',
  styleUrls: ['./info-usuario-modal.page.scss'],
})
export class InfoUsuarioModalPage  {
  // declaración de inputs para recibir datos desde HomePage
  @Input() nombre!: any;
  @Input() apellido!: any;
  @Input() email!: any;
  @Input() usuario!: any;
  @Input() password!: any;
  @Input() educationLevel!: any | null;
  @Input() selectedDate!: any;

  constructor(private modalCtrl: ModalController) { }

    close() {
    this.modalCtrl.dismiss();
  }

}
