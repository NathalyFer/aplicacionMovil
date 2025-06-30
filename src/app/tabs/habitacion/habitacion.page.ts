import { Component, OnInit } from '@angular/core';
import { MisDatosService } from 'src/app/services/mis-datos.service';
import { Router } from '@angular/router';

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
      precio: 5990,
      calificacion: 3,
      descripcion: 'caja ideal para mantener tu vestiario ordenado',
      cantidad: 1}
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
        cantidad: cantidad
      });

      console.log('Producto agregado al carrito');
      this.router.navigate(['/carrito']);
    } catch (error) {
      console.error('Error agregando al carrito:', error);
    }
  }

}

