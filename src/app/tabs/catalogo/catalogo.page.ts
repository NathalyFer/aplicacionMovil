import { Component, OnInit } from '@angular/core';

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
      precio: 14.990,
      calificacion: 4,
    },
    {
      id: 2,
      nombre: 'Set 7 contenedores térmicos',
      foto: 'assets/img/set.png',
      precio: 18.990,
      calificacion: 5,
    },
    {
      id: 3,
      nombre: 'Caja De Almacenamiento De Ropa',
      foto: 'assets/img/caja.jpg',
      precio: 5.990,
      calificacion: 3,
    }
  ];


  constructor() { }

  ngOnInit() {
  }

//  Método para calificar el producto
  calificarProducto(producto: any, calificacion: number) {
    producto.calificacion = calificacion;
    console.log(`Producto ${producto.nombre} calificado con ${calificacion} estrellas`);
  }

  // Método para comprar
  comprarProducto(producto: any) {
    console.log(`Comprando producto: ${producto.nombre}`);
    // Aquí podrías redirigir o agregar al carrito
  }

}
