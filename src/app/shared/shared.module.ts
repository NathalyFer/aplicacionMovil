import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponenteComponent } from '../company-name/componente/componente.component';



@NgModule({
  declarations: [ComponenteComponent],
  imports: [CommonModule],
  exports: [ComponenteComponent]
})
export class SharedModule { }
