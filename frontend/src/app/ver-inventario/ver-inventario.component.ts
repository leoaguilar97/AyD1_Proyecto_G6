
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ver-inventario',
  templateUrl: './ver-inventario.component.html',
  styleUrls: ['./ver-inventario.component.scss']
})
export class VerInventarioComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient, private route: ActivatedRoute) { }
  id = String(this.route.snapshot.params['id']);
  nombre_bodega: String;
  productos = [];

  ngOnInit() {
    this.cargarProductos();
  }
  cargarProductos() {
    this.http.get('https://api-erpp.herokuapp.com/api/bodega/' + this.id)
      .toPromise().then((data: any) => {
        this.nombre_bodega = data.bodega.nombre;
        this.productos = data.bodega.productos;
      });
  }

  modificarInventario() {
    console.log(this.productos);
  }
}
