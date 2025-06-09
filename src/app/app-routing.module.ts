import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)
  },
   {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path:'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'registrarse',
    loadChildren: () => import('./pages/registrarse/registrarse.module').then( m => m.RegistrarsePageModule)
  },
  {
    path: 'recuperar',
    loadChildren: () => import('./pages/recuperar/recuperar.module').then( m => m.RecuperarPageModule)
  },
  {
    path: 'catalogo',
    loadChildren: () => import('./tabs/catalogo/catalogo.module').then( m => m.CatalogoPageModule)
  },
  {
    path: 'cocina',
    loadChildren: () => import('./tabs/cocina/cocina.module').then( m => m.CocinaPageModule)
  },
  {
    path: 'banio',
    loadChildren: () => import('./tabs/banio/banio.module').then( m => m.BanioPageModule)
  },
  {
    path: 'habitacion',
    loadChildren: () => import('./tabs/habitacion/habitacion.module').then( m => m.HabitacionPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
  },



  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
