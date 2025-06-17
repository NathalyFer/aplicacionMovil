import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { SwiperOptions } from 'swiper/types';
import { trigger, transition, style, animate } from '@angular/animations';
import { MisDatosService } from 'src/app/services/mis-datos.service';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})


  


export class HomePage {
  username: string = '';
  usuarioCompleto: any;
  hola: string = 'Hola!!';
  tipRating = 0;
  companyName: string = 'Detalles que ordenan';

  slideOpts: SwiperOptions = {};

  featuredProducts = [
    { id: 1, name: 'Contenedor Grande', price: 15.99, image: 'assets/img/contenedor-grande.jpg' },
    { id: 2, name: 'Organizador Multiuso', price: 9.99, image: 'assets/img/organizador-multiuso.jpg' },
    // más productos
  ];



   constructor(
    private route: ActivatedRoute,
    private router: Router,
    private modalCtrl: ModalController,
    private misDatosService: MisDatosService
  ) {}

   ngOnInit() {
  this.route.queryParams.subscribe(params => {
    this.username = params['username'] || 'Invitado';
     if (this.username !== 'Invitado') {
        this.cargarDatosUsuario(this.username);}
  });
   }

     async cargarDatosUsuario(username: string) {
    try {
      const usuario = await this.misDatosService.getUsuarioPorUsername(username);
      if (usuario) {
        this.usuarioCompleto = usuario;
        this.username = usuario.username;
        console.log ('Usuario cargado:', usuario);
      } else {
        console.log('Usuario no encontrado');
      }
    } catch (error) {
      console.error('Error al cargar usuario', error);
    }
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


