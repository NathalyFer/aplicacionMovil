import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cocina',
  templateUrl: './cocina.page.html',
  styleUrls: ['./cocina.page.scss'],
  standalone: false,
})
export class CocinaPage  {

  productos = [
  {
      id: 2,
      nombre: 'Set 7 contenedores térmicos',
      foto: 'assets/img/set.png',
      precio: 18.990,
      calificacion: 5,
      descripcion: 'Mantiene tus alimentos frescos  y libre de humedad por más tiempo.'
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

