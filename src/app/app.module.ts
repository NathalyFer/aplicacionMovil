import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { InfoUsuarioModalPage } from './pages/info-usuario-modal/info-usuario-modal.page';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
//animations
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';

// SQLite//
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';//




@NgModule({
  declarations: [AppComponent, InfoUsuarioModalPage],
  imports: [BrowserModule, FormsModule, CommonModule, IonicModule.forRoot(), AppRoutingModule
    , BrowserAnimationsModule, MatNativeDateModule,OverlayModule,
    MatFormFieldModule, MatInputModule, MatDatepickerModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, SQLite],
  bootstrap: [AppComponent],
  exports: [BrowserAnimationsModule, InfoUsuarioModalPage]
})
export class AppModule {}
