import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'catalogo',
        loadChildren: () => import('../tabs/catalogo/catalogo.module').then(m => m.CatalogoPageModule)
      },
      {
        path: 'habitacion',
        loadChildren: () => import('../tabs/habitacion/habitacion.module').then(m => m.HabitacionPageModule)
      },
      {
        path: 'banio',
        loadChildren: () => import('../tabs/banio/banio.module').then(m => m.BanioPageModule)
      },
      {
        path: 'cocina',
        loadChildren: () => import('../tabs/cocina/cocina.module').then(m => m.CocinaPageModule)    
      },
      {
        path: 'carrito',
        loadChildren: () => import('../pages/carrito/carrito.module').then(m => m.CarritoPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/catalogo',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
