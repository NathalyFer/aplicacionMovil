import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { SwiperModule } from 'swiper/angular';



import { SharedModule } from 'src/app/shared/shared.module';


import { ExperienciaLaboralComponent } from 'src/app/pages/components/experiencia-laboral/experiencia-laboral.component';
import { CertificacionesComponent } from 'src/app/pages/components/certificaciones/certificaciones.component';
import { MisDatosComponent } from 'src/app/pages/components/mis-datos/mis-datos.component';


import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';




@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    SwiperModule,
    HomePageRoutingModule,
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],

  declarations: [
  HomePage, 
  ExperienciaLaboralComponent, 
  CertificacionesComponent,
  MisDatosComponent

],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePageModule {}

