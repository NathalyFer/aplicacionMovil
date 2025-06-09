import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banio',
  templateUrl: './banio.page.html',
  styleUrls: ['./banio.page.scss'],
  standalone: false
})
export class BanioPage  {
  productos = [
   {
      id: 1,
      nombre: 'Organizador dos niveles',
      foto: 'assets/img/organizador_2_niveles.png',
      precio: 14.990,
      calificacion: 4,
      descripcion: 'Organiza tus productos de higiene en espacios reducidos.'
    },
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
