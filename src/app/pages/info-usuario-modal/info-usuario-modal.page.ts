import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  standalone: true,
  selector: 'app-info-usuario-modal',
  templateUrl: './info-usuario-modal.page.html',
  styleUrls: ['./info-usuario-modal.page.scss'],
  imports: [CommonModule, IonicModule  ]
})
export class InfoUsuarioModalPage  {
  // declaración de inputs para recibir datos desde HomePage
  @Input() user!: string;
  @Input() surname!: string;
  @Input() educationLevel!: string | null;
  @Input() birthDate!: string;

  constructor(private modalCtrl: ModalController) { }

    close() {
    this.modalCtrl.dismiss({ confirmado: true }, 'confirmado');
  }

}
