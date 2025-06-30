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
      precio: 14990,
      calificacion: 4,
      descripcion: 'Organiza tus productos de higiene en espacios reducidos.',
      cantidad: 1
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
    const cantidad = producto.cantidad > 0 ? producto.cantidad : 1;

    try {
      await this.misDatosService.agregarProductoCarrito({
        nombre: producto.nombre,
        precio: producto.precio,
        foto: producto.foto,
        cantidad: producto.cantidad || 1  // asigna 1 si no tiene cantidad
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