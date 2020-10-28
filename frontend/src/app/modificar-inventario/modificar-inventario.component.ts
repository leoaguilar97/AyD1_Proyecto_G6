import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Inventario, Item, Venta } from '../models/modelos';

@Component({
  selector: 'app-modificar-inventario',
  templateUrl: './modificar-inventario.component.html',
  styleUrls: ['./modificar-inventario.component.scss']
})
export class ModificarInventarioComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient, private route: ActivatedRoute) { }
  id = String(this.route.snapshot.params['id']);
  nombre_bodega: String;
  productos_aux = [];
  productos = [];
  todos_productos = [];
  cantidades: string[];
  cantidad_nueva: String;
  precio_nuevo: String;
  id_producto_nuevo: String;

  ngOnInit() {
    this.cargarProductosPorBodega();
    this.cargarProductos();
  }

  cargarProductos() {
    this.http.get('https://api-erpp.herokuapp.com/api/producto')
    .toPromise().then((data: any) => {
      this.todos_productos = data;
    });
  }

  cargarProductosPorBodega() {
    this.http.get('https://api-erpp.herokuapp.com/api/bodega/' + this.id)
      .toPromise().then((data: any) => {
        this.nombre_bodega = data.bodega.nombre;
        this.productos_aux = data.bodega.productos;
        this.cargarCantidades(this.productos_aux.length);
      });
  }

  cargarCantidades(cantidad: number) {
    this.cantidades = [];
    for (let i = 0; i < cantidad; i++) {
      this.cantidades[i] = '';
    }
    let contador = 0;
    this.productos_aux.forEach(producto => {
      this.cantidades[contador] = producto.cantidad;
      contador = contador + 1;
    const venta: Venta = {
      id: producto.producto._id,
      nombre: producto.producto.nombre,
      cantidad: producto.cantidad,
      precio: this.getNumber(producto.precio)
    };
    this.productos.push(venta);
    });
  }

  getNumber(cantidad: string): Number {
    return Number(cantidad);
  }

  agregar() {
    const venta: Venta = {
      id: this.id_producto_nuevo,
      nombre: this.getNombreProducto(this.id_producto_nuevo),
      cantidad: this.getNumber(this.cantidad_nueva.toString()),
      precio: this.getNumber(this.precio_nuevo.toString())
    };
    this.productos.push(venta);
    this.cantidades.push(this.cantidad_nueva.toString());
  }
  getNombreProducto(id_producto_nuevo: String): String {
    let nombre = '';
    this.todos_productos.forEach(producto => {
      if (id_producto_nuevo === producto.id) {
        nombre = producto.nombre;
      }
    });
    return nombre;
  }
  cancelar() {
    this.cantidad_nueva = '';
    this.precio_nuevo = '';
  }

  guardarInventario() {
    this.actualizarCantidades();
    this.createobjecto();
  }

  createobjecto() {
    const productos = [];
    this.productos.forEach(producto => {
      const item: Item = {
        producto: producto.id,
        cantidad: producto.cantidad,
        precio: producto.precio
      };
      productos.push(item);
    });
    const inventario: Inventario = {
      bodega: this.id,
      productos: productos
    };
    this.http.post('https://api-erpp.herokuapp.com/api/bodega/productos', inventario)
    .toPromise().then((data: any) => {
      this.router.navigate(['verInventario', this.id]);
      });
  }

  actualizarCantidades() {
    let contador = 0;
    this.productos.forEach(producto => {
      producto.cantidad = this.getNumber(this.cantidades[contador]);
      contador ++;
    });
  }
}
