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
  nombre_cliente: String;
  direccion_cliente: String;
  nit_cliente: String;
  vendedor: String;
  bodega: String;

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
}
