import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CatalogoPageRoutingModule } from './catalogo-routing.module';

import { CatalogoPage } from './catalogo.page';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CatalogoPageRoutingModule,
    RouterModule.forChild([
      {
        path: '',
        component: CatalogoPage
      }
    ])
  ],
  declarations: [CatalogoPage]
})
export class CatalogoPageModule {}
