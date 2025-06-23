import { Component, OnInit } from '@angular/core';
import { MisDatosService } from 'src/app/services/mis-datos.service';

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

  constructor(private misDatosService: MisDatosService) { }

  ngOnInit() {
  }

  //  Método para calificar el producto
  calificarProducto(producto: any, calificacion: number) {
    producto.calificacion = calificacion;
    console.log(`Producto ${producto.nombre} calificado con ${calificacion} estrellas`);
  }

  // Método para comprar
  async comprarProducto(producto: any) {
    console.log(`Comprando producto: ${producto.nombre}`);
    try {
      await this.misDatosService.agregarProductoCarrito({
        nombre: producto.nombre,
        precio: producto.precio,
        foto: producto.foto
      });
      console.log('Producto agregado al carrito');
      // Aquí puedes navegar al carrito si quieres, por ejemplo:
      // this.router.navigate(['/carrito']);
    } catch (error) {
      console.error('Error agregando al carrito:', error);
    }
  }

}
  

