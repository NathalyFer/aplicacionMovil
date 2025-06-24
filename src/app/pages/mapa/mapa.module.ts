import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { MapaPageRoutingModule } from './mapa-routing.module';

import { MapaPage } from './mapa.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule,
    MapaPageRoutingModule
  ],
  declarations: [MapaPage ]
})
export class MapaPageModule {}
