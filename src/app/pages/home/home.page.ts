import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

//camara//
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ActionSheetController } from '@ionic/angular';  // para mostrar opciones
import { SwiperOptions } from 'swiper';
import { base64ToFile } from 'ngx-image-cropper';

// Importa el servicio de datos de usuario
import { MisDatosService } from '../../services/mis-datos.service';

import { Subscription } from 'rxjs';




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

  username: string = 'naty22';
  usuarioCompleto: any;
  hola: string = 'Hola!!';
  tipRating = 3;
  fotoUsuario: string = 'assets/img/usuaria.png';
  companyName: string = 'Detalles que ordenan';
  segmentValue: string = 'misdatos';
  imageChangedEvent: any = '';
  croppedImage: string = '';
  

   private usernameSub!: Subscription;


  
    slideOpts: SwiperOptions = {};
  
    featuredProducts = [
      { id: 1, name: 'Contenedor Grande', price: 15.99, image: 'assets/img/contenedor-grande.jpg' },
      { id: 2, name: 'Organizador Multiuso', price: 9.99, image: 'assets/img/organizador-multiuso.jpg' },
      // más productos
    ];

   constructor(
    private route: ActivatedRoute,
    private actionSheetController: ActionSheetController,
    private misDatosService: MisDatosService, // Inyecta el servicio aquí
    private router: Router // Asegúrate de inyectar Router si usas this.router
  ) {}

   async ngOnInit() {
    // Suscribirse a los cambios en username
    this.usernameSub = this.misDatosService.getUsername().subscribe(async (username) => {
      if (username && username !== 'Invitado') {
        this.username = username;
        console.log('Username actualizado:', this.username);
        await this.cargarFoto();  // <---- carga la foto al actualizar username
      }
    });
    // También cargar foto si username ya está definido al iniciar
  if (this.username && this.username !== 'Invitado') {
    await this.cargarFoto();
  }
  }


    ngOnDestroy() {
    // Evitar fugas de memoria
    if (this.usernameSub) {
      this.usernameSub.unsubscribe();
    }
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


  //Productos destacados//


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
    segmentChanged(event: any) {
    this.segmentValue = event.detail.value;
  }

 // Función para seleccionar la fuente de la imagen del usuario
 async seleccionarFuente() {
  const actionSheet = await this.actionSheetController.create({
    header: 'Selecciona la fuente de la imagen',
    buttons: [
      {
        text: 'Tomar foto',
        icon: 'camera',
        handler: () => {
          this.tomarFoto(CameraSource.Camera);
        }
      },
      {
        text: 'Elegir de galería',
        icon: 'image',
        handler: () => {
          this.tomarFoto(CameraSource.Photos);
        }
      },
      {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel'
      }
    ]
  });

  await actionSheet.present();
}

// Función para tomar una foto o seleccionar de la galería
async tomarFoto(source: CameraSource) {
  try {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: source,
    });

    this.fotoUsuario = image.dataUrl!;

     // Guardar foto en SQLite
    await this.misDatosService.guardarFotoUsuario(this.username, this.fotoUsuario);

    } catch (error) {
      console.log('No se pudo obtener la imagen', error);
  }

  }
  async cargarFoto() {
    console.log('Cargando foto para username:', this.username);
    const fotoGuardada = await this.misDatosService.obtenerFotoUsuario(this.username);
    console.log('Foto obtenida:', fotoGuardada ? '[base64]' : 'No hay foto');
    if (fotoGuardada) {
      this.fotoUsuario = fotoGuardada;
  }
}


}
