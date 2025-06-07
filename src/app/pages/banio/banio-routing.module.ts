import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BanioPage } from './banio.page';

const routes: Routes = [
  {
    path: '',
    component: BanioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BanioPageRoutingModule {}
