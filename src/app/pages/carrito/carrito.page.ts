import { Component, OnInit } from '@angular/core';
import { MisDatosService } from 'src/app/services/mis-datos.service';
import { Geolocation } from '@capacitor/geolocation';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
  standalone: false,
})
export class CarritoPage  {

  productosCarrito: any[] = [];
  subtotal: number = 0;
  costoEnvio: number = 3000; // segun lo que se ha definido en el servicio
  total: number = 0;

  constructor(private misDatosService: MisDatosService,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController,
              private router: Router ) { }

  async ngOnInit() {
    this.productosCarrito = await this.misDatosService.obtenerProductosCarrito();
    
  }

    
  // Se ejecuta cada vez que se entra a la página
  async ionViewWillEnter() {
    this.productosCarrito = await this.misDatosService.obtenerProductosCarrito();
    this.calcularTotales();
  }

  async cargarProductosCarrito() {
    this.productosCarrito = await this.misDatosService.obtenerProductosCarrito();
    this.calcularTotales();
  }

  // Método para calcular el subtotal, costo de envío y total
  calcularTotales() {
  this.subtotal = this.productosCarrito.reduce((acc, item) => {
    return acc + (item.precio * item.cantidad);
  }, 0);
  this.total = this.subtotal + this.costoEnvio;
}


  // Método para confirmar la compra con alerta
  async confirmarCompra() {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar compra',
      message: '¿Estás seguro que deseas confirmar la compra?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            // No hace nada, se cierra el alert
          }
        },
        {
          text: 'Confirmar',
          handler: async () => {
            await this.misDatosService.limpiarCarrito();
            this.productosCarrito = [];
            const toast = await this.toastCtrl.create({
              message: 'Compra realizada con éxito!',
              duration: 2000,
              color: 'success'
            });
            await toast.present();
              // Navegar a la página del mapa (despacho)
            this.router.navigate(['/mapa']);
          }
        }
      ]
    });

    await alert.present();
  }

  async limpiarCarrito() {
    await this.misDatosService.limpiarCarrito();
    this.productosCarrito = [];
  }

}
 

