import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { SwiperOptions } from 'swiper/types';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,

})
  


export class HomePage {
  username: any = '';
  hola: string = 'Hola!!';
  tipRating = 0;

  slideOpts: SwiperOptions = {};

  featuredProducts = [
    { id: 1, name: 'Contenedor Grande', price: 15.99, image: 'assets/img/contenedor-grande.jpg' },
    { id: 2, name: 'Organizador Multiuso', price: 9.99, image: 'assets/img/organizador-multiuso.jpg' },
    // más productos
  ];



   constructor(
    private route: ActivatedRoute,
    private router: Router,
    private modalCtrl: ModalController
  ) {}

   ngOnInit() {
  this.route.queryParams.subscribe(params => {
    this.username = params['username'] || 'Invitado';
  });
   }

   calificarTip(valor: number) {
  this.tipRating = valor;
  console.log(`Tip calificado con: ${valor} estrellas`);
  }
  irACatalogo() {
  this.router.navigate(['/catalogo']);
  }
   
  goToProduct(id: number) {
    this.router.navigate(['/product', id]);
  }
}


