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
  nombre_cliente: String;
  direccion_cliente: String;
  nit_cliente: String;
  vendedor: String;
  bodega: String;
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
    console.log(this.nombre_cliente);
    console.log(this.direccion_cliente);
    console.log(this.nit_cliente);
    console.log(this.vendedor);
    console.log(this.bodega);
  }
  seleccionBodega() {
    console.log(this.bodega);
    this.bodegaSeleccionada = true;
    this.http.get('https://api-erpp.herokuapp.com/api/bodega/' + this.bodega)
      .toPromise().then((data: any) => {
        this.productos = data.bodega.productos;
      });
  console.log(this.productos);
  }
}
