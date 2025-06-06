import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { InfoUsuarioModalPage } from './pages/info-usuario-modal/info-usuario-modal.page';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { OverlayModule } from '@angular/cdk/overlay';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
//animations
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';



@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, InfoUsuarioModalPage, IonicModule.forRoot(), AppRoutingModule
    , BrowserAnimationsModule, MatNativeDateModule,OverlayModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
  exports: [BrowserAnimationsModule]
})
export class AppModule {}
