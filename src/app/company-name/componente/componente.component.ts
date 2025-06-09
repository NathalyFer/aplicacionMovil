import { Component, Input, OnInit } from '@angular/core';
import {
  trigger,
  transition,
  style,
  animate
} from '@angular/animations';

@Component({
  selector: 'app-componente',
  templateUrl: './componente.component.html',
  styleUrls: ['./componente.component.scss'],
  standalone: false,
})
export class ComponenteComponent   {

  constructor() { }

  @Input() companyName: string = ''; 
 

}
