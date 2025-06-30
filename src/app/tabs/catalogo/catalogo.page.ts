import { Component, OnInit } from '@angular/core';
import { MisDatosService } from 'src/app/services/mis-datos.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.page.html',
  styleUrls: ['./catalogo.page.scss'],
  standalone: false,
})
export class CatalogoPage  {

    //  Lista de productos 
  productos = [
    {
      id: 1,
      nombre: 'Organizador dos niveles',
      foto: 'assets/img/organizador_2_niveles.png',
      precio: 14990,
      calificacion: 4,
      cantidad: 1 
    },
    {
      id: 2,
      nombre: 'Set 7 contenedores térmicos',
      foto: 'assets/img/set.png',
      precio: 18990,
      calificacion: 5,
      cantidad: 1 
    },
    {
      id: 3,
      nombre: 'Caja De Almacenamiento De Ropa',
      foto: 'assets/img/caja.jpg',
      precio: 5990,
      calificacion: 3,
      cantidad: 1 
    }
  ];


  constructor(private misDatosService: MisDatosService,
              private router: Router
  ) { }

  ngOnInit() {
  }

//  Método para calificar el producto
  calificarProducto(producto: any, calificacion: number) {
    producto.calificacion = calificacion;
    console.log(`Producto ${producto.nombre} calificado con ${calificacion} estrellas`);
  }

  async comprarProducto(producto: any) {
    const cantidad = producto.cantidad > 0 ? producto.cantidad : 1;

    try {
      await this.misDatosService.agregarProductoCarrito({
        nombre: producto.nombre,
        precio: producto.precio,
        foto: producto.foto,
        cantidad: cantidad
      });

      console.log('Producto agregado al carrito');
      this.router.navigate(['/carrito']);
    } catch (error) {
      console.error('Error agregando al carrito:', error);
    }
  }
   //metodo para incrementar la cantidad del producto
    incrementarCantidad(producto: any) {
    if (!producto.cantidad) producto.cantidad = 1;
    producto.cantidad++;
  }

  decrementarCantidad(producto: any) {
    if (!producto.cantidad || producto.cantidad <= 1) {
      producto.cantidad = 1;
    } else {
      producto.cantidad--;
    }
  }

}
