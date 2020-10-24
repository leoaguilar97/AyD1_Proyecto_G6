import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.scss']
})
export class VentaComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient) { }
  bodegas = [];
  personas = [];
  productos = [];
  ventas = [];
  nombre_cliente: String;
  direccion_cliente: String;
  nit_cliente: String;
  vendedor: String;
  bodega: String;
  id_producto_auxiliar: String;
  id_producto: String;
  cantidad_producto: String;
  disponibles_producto: String;
  precio_producto: String;
  bodegaSeleccionada = false;

  ngOnInit(): void {
    this.cargarBodegas();
    this.cargarVendedores();
  }
  cargarBodegas() {
    this.http.get('https://api-erpp.herokuapp.com/api/bodega')
      .toPromise().then((data: any) => {
        this.bodegas = data.bodegas;
      });
  }
  cargarVendedores() {
    this.http.get('https://api-erpp.herokuapp.com/api/usuario')
      .toPromise().then((data: any) => {
        this.personas = data;
      });
  }
  finalizar() {
    console.log(this.productos);
  }
  seleccionBodega() {
    console.log(this.bodega);
    this.bodegaSeleccionada = true;
    this.http.get('https://api-erpp.herokuapp.com/api/bodega/' + this.bodega)
      .toPromise().then((data: any) => {
        this.productos = data.bodega.productos;
      });
  }
  seleccionProducto() {
    this.cantidad_producto = '';
    this.productos.forEach(producto => {
      if (producto._id === this.id_producto_auxiliar) {
        this.disponibles_producto = producto.cantidad;
        this.precio_producto = producto.precio;
        this.id_producto = producto.producto._id;
      }
    });
  }
  agregar() {
    console.log(this.precio_producto);
    console.log(this.cantidad_producto);
    console.log(this.id_producto);
  }
}
