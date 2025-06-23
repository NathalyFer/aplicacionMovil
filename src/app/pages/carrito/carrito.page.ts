import { Component, OnInit } from '@angular/core';
import { MisDatosService } from 'src/app/services/mis-datos.service';
import { Geolocation } from '@capacitor/geolocation';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
  standalone: false,
})
export class CarritoPage  {

  productosCarrito: any[] = [];

  constructor(private misDatosService: MisDatosService,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController) { }

  async ngOnInit() {
    this.productosCarrito = await this.misDatosService.obtenerProductosCarrito();
  }

    
  // Se ejecuta cada vez que se entra a la página
  async ionViewWillEnter() {
    this.productosCarrito = await this.misDatosService.obtenerProductosCarrito();
  }

  async cargarProductosCarrito() {
    this.productosCarrito = await this.misDatosService.obtenerProductosCarrito();
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
 

