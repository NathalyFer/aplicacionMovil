import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-habitacion',
  templateUrl: './habitacion.page.html',
  styleUrls: ['./habitacion.page.scss'],
  standalone: false,
})
export class HabitacionPage  {

    productos = [
  {
      id: 3,
      nombre: 'Caja De Almacenamiento De Ropa',
      foto: 'assets/img/caja.jpg',
      precio: 5.990,
      calificacion: 3,
      descripcion: 'caja ideal para mantener tu vestiario ordenado'}
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

