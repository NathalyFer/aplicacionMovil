import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoUsuarioModalPageRoutingModule } from './info-usuario-modal-routing.module';

import { InfoUsuarioModalPage } from './info-usuario-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoUsuarioModalPageRoutingModule
  ],
  declarations: [InfoUsuarioModalPage]
})
export class InfoUsuarioModalPageModule {}
