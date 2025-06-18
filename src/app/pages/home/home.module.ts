import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';;
import {Routes, RouterModule} from '@angular/router';
import { SwiperModule } from 'swiper/angular';


import { HomePageRoutingModule } from './home-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { ExperienciaLaboralComponent } from 'src/app/pages/components/experiencia-laboral/experiencia-laboral.component';
import { CertificacionesComponent } from 'src/app/pages/components/certificaciones/certificaciones.component';
import { MisDatosComponent } from 'src/app/pages/components/mis-datos/mis-datos.component';
import { ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    SharedModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: HomePage }]),
    SwiperModule,
    HomePageRoutingModule,
  ],
  declarations: [HomePage, 
ExperienciaLaboralComponent, CertificacionesComponent,MisDatosComponent,
  ]
})
export class HomePageModule {}

