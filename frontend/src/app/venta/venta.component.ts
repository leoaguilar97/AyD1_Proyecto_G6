import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Venta, Producto, Factura } from '../models/modelos';

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
  producto_facturados = [];
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
  nombre_producto: String;
  bodegaSeleccionada = false;
  total = 0;

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
    const factura: Factura = {
      nombre_cliente: this.nombre_cliente,
      nit: this.nit_cliente,
      direccion: this.direccion_cliente,
      vendedor: this.vendedor,
      bodega: this.bodega,
      productos: this.producto_facturados
    };
    this.http.post('https://api-erpp.herokuapp.com/api/venta', factura)
    .toPromise().then((data: any) => {
      this.limpiarDatos();
      });
  }
  limpiarDatos() {
  this.bodegas = [];
  this.personas = [];
  this.productos = [];
  this.ventas = [];
  this.producto_facturados = [];
  this.nombre_cliente = '';
  this.direccion_cliente = '';
  this.nit_cliente = '';
  this.vendedor = '';
  this.bodega = '';
  this.id_producto_auxiliar = '';
  this.id_producto = '';
  this.cantidad_producto = '';
  this.disponibles_producto = '';
  this.precio_producto = '';
  this.nombre_producto = '';
  this.bodegaSeleccionada = false;
  this.total = 0;
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
        this.nombre_producto = producto.producto.nombre;
      }
    });
  }
  agregar() {
    const producto: Producto = {
      cantidad: this.cantidad_producto,
      producto: this.id_producto
    };
    this.producto_facturados.push(producto);

    const venta: Venta = {
      id: this.id_producto,
      nombre: this.nombre_producto,
      cantidad: this.getNumber(this.cantidad_producto),
      precio: this.getNumber(this.precio_producto)
    };
    this.ventas.push(venta);
    const total = this.getTotal(this.cantidad_producto, this.precio_producto);
    this.total += total;
  }
  getNumber(cantidad: String): Number {
    return Number(cantidad);
  }
  getTotal(cantidad: String, precio: String): number {
    return Number(cantidad) * Number(precio);
  }
}
