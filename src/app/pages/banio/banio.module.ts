import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BanioPageRoutingModule } from './banio-routing.module';

import { BanioPage } from './banio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BanioPageRoutingModule
  ],
  declarations: [BanioPage]
})
export class BanioPageModule {}
