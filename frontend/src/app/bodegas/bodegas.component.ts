import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-bodegas',
  templateUrl: './bodegas.component.html',
  styleUrls: ['./bodegas.component.scss']
})
export class BodegasComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient) { }
    // Declaraciones
    bodegas = [];
    nuevo_nombre: String;
    nuevo_direccion: String;
    nuevo_sedes = [];

  ngOnInit() {
    this.cargarBodegas();
  }
  cargarBodegas() {
    this.http.get('https://api-erpp.herokuapp.com/api/bodega')
    .toPromise().then((data: any) => {
      this.bodegas = data.bodegas;
    });
  }
  editar(id: string) {
    this.router.navigate(['editarBodegas', id]);
  }
  eliminar(id: string) {
    const direccion = 'https://api-erpp.herokuapp.com/api/bodega/' + id;
    this.http.delete(direccion)
    .toPromise().then((data: any) => {
      this.cargarBodegas();
    });
  }
  agregar() {
    this.http.post('https://api-erpp.herokuapp.com/api/bodega',
    {
      'nombre': this.nuevo_nombre,
      'direccion': this.nuevo_direccion,
      'productos': []
  }).toPromise().then((data: any) => {
        this.cancelar();
        this.cargarBodegas();
      });
  }
  cancelar() {
    this.nuevo_nombre = null;
    this.nuevo_direccion = null;
    this.nuevo_sedes = [];
  }
  inventario(id: string) {
    this.router.navigate(['verInventario', id]);
  }
}
