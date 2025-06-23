import { Component, OnInit } from '@angular/core';
import { MisDatosService } from 'src/app/services/mis-datos.service';
import { Router } from '@angular/router';

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

  constructor(private misDatosService: MisDatosService,
              private router: Router) { }

  ngOnInit() {
  }

  //  Método para calificar el producto
  calificarProducto(producto: any, calificacion: number) {
    producto.calificacion = calificacion;
    console.log(`Producto ${producto.nombre} calificado con ${calificacion} estrellas`);
  }

    async comprarProducto(producto: any) {
    console.log(`Comprando producto: ${producto.nombre}`);
    try {
      await this.misDatosService.agregarProductoCarrito({
        nombre: producto.nombre,
        precio: producto.precio,
        foto: producto.foto
      });
      console.log('Producto agregado al carrito');
      this.router.navigate(['/carrito']);  // Navega al carrito después de agregar
    } catch (error) {
      console.error('Error agregando al carrito:', error);
    }
  }

}