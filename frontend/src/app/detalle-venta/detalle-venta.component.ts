import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-detalle-venta',
  templateUrl: './detalle-venta.component.html',
  styleUrls: ['./detalle-venta.component.scss']
})
export class DetalleVentaComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient) { }

  //
  ventas = [];
  ngOnInit() {
    this.cargarVentas();
  }

  cargarVentas(): boolean {
    this.http.get('https://api-erpp.herokuapp.com/api/venta')
      .toPromise().then((data: any) => {
        this.ventas = data.ventas;
      });
    return true;
  }

}
