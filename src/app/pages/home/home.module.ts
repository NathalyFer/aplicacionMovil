import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';;
import {Routes, RouterModule} from '@angular/router';
import { SwiperModule } from 'swiper/angular';


import { HomePageRoutingModule } from './home-routing.module';

import { ComponenteComponent } from 'src/app/company-name/componente/componente.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: HomePage }]),
    SwiperModule,
    HomePageRoutingModule,
  ],
  declarations: [HomePage,ComponenteComponent]
})
export class HomePageModule {}

