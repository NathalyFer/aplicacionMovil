import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';;
import { SwiperModule } from 'swiper/angular';


import { HomePageRoutingModule } from './home-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

import { ExperienciaLaboralComponent } from 'src/app/pages/components/experiencia-laboral/experiencia-laboral.component';
import { CertificacionesComponent } from 'src/app/pages/components/certificaciones/certificaciones.component';
import { MisDatosComponent } from 'src/app/pages/components/mis-datos/mis-datos.component';


import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { C } from '@angular/cdk/scrolling-module.d-ud2XrbF8';
import { ComponenteComponent } from 'src/app/company-name/componente/componente.component';



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
    SwiperModule,
    HomePageRoutingModule,
    SharedModule
  ],
  declarations: [HomePage, 
ExperienciaLaboralComponent, CertificacionesComponent,MisDatosComponent,

],
  exports: [ComponenteComponent], 
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePageModule {}

