import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';




@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})


export class HomePage {
  username: string = 'tuNombre';
  companyName: string = 'Detalles que ordenan';
  segmentValue: string = 'misdatos';



   constructor(
    private route: ActivatedRoute
  ) {}

   ngOnInit() {
  this.route.queryParams.subscribe(params => {
    this.username = params['username'] || 'Invitado';
  });
   }

  // Método para manejar el cambio de segmento
    segmentChanged(event: any) {
    this.segmentValue = event.detail.value;
  }
}


