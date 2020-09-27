
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ver-inventario',
  templateUrl: './ver-inventario.component.html',
  styleUrls: ['./ver-inventario.component.scss']
})
export class VerInventarioComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient) { }
  productos = [];
  nombre_producto: string;
  vendedor_producto: string;
  descripcion_producto: string;
  precio_producto: string;
  etiquetas_producto: string;
  cantidad: string[];
  cotizaciones = [];
  buscar_texto: string;

  ngOnInit() {
    this.cargarProductos();
    this.cotizaciones = JSON.parse(localStorage.getItem('cotizacion'));
  }

  cargarProductos(): boolean {
    try {
      this.http.get('https://ayd1g6-cotizador.herokuapp.com/productos')
      .toPromise().then((data: any) => {
        this.productos = data;
        this.vaciarArreglo(this.productos.length);
      });
    return true;
    } catch (error) {
      return false;
    }
  }

  vaciarArreglo(cantidad: number): string[] {
    this.cantidad = [];
    for (let i = 0; i < cantidad; i++) {
      this.cantidad[i] = '';
    }
    return this.cantidad;
  }

  agregar(nombre: string, precio: string, index: any): boolean {
    try {
      // const coti: Cotizacion = {nombre: nombre, cantidad: this.getNumber(this.cantidad[index]), precio: this.getNumber(precio)};
      // this.cotizaciones.push(coti);
      this.cantidad[index] = '';
      return true;
    } catch (error) {
      return false;
    }
  }

  getNumber(cantidad: string): Number {
    return Number(cantidad);
  }

  trackByIdx(index: number, obj: any): any {
    return index;
  }

  verCotizacion() {
    localStorage.setItem('cotizacion', JSON.stringify(this.cotizaciones));
    this.router.navigate(['cotizacion']);
  }

  getTotal(cantidad: number, precio: number): Number {
    return cantidad * precio;
  }

}
