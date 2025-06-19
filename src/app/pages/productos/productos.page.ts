import { Component, OnInit } from '@angular/core';
import { ApiFakeStoreService } from 'src/app/services/api-fake-store.service';
import { Product } from 'src/app/models/product.model';
import { MenuController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';



@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
  standalone: false,
})
export class ProductosPage implements OnInit {
  products: Product[] = [];
  menu: any;
  nuevoProducto: {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
  } = {
    id: 0,
    title: '',
    price: 0,
    description: '',
    category: '',
    image: ''
  };

  constructor( private apiService: ApiFakeStoreService,
               private menuCtrl: MenuController, 
               private alertCtrl: AlertController ) { }
  
  companyName: string = 'Mi Empresa';
  terminoBusqueda: string = '';
  productosFiltrados: Product[] = [];

  ngOnInit() {
    this.menuCtrl.close("mainMenu");

    //llamar al servicio para obtener los productos
    this.apiService.getProducts().subscribe(
      (data: Product[]) => {
        this.products = data;
        this.productosFiltrados = data; 
      },
      (error) => {
        console.error('Error al obtener los productos:', error);
        this.mostrarAlerta('Error', 'No se pudieron cargar los productos. Inténtalo más tarde.');
      }
    );
  }

      filtrarProductos() {
    const termino = this.terminoBusqueda.toLowerCase();
    this.productosFiltrados = this.products.filter(producto => 
      producto.title.toLowerCase().includes(termino) ||
      producto.description.toLowerCase().includes(termino) ||
      producto.category.toLowerCase().includes(termino)
    );
  }



  verDetalle(producto: Product) {
    this.mostrarAlerta('Producto', `Título: ${producto.title}\nPrecio: $${producto.price}`);
    // Aquí puedes abrir un modal o redirigir a otra página
  }



  //Método mostrar alerta
  async mostrarAlerta(titulo: string, mensaje: string) {
    const alert = await this.alertCtrl.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }

}
