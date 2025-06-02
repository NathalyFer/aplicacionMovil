import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfoUsuarioModalPage } from './info-usuario-modal.page';

const routes: Routes = [
  {
    path: '',
    component: InfoUsuarioModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfoUsuarioModalPageRoutingModule {}
