import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sedes',
  templateUrl: './sedes.component.html',
  styleUrls: ['./sedes.component.scss']
})
export class SedesComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient) { }
    // Declaraciones
    sedes = [];
    nuevo_nombre: String;
    nuevo_direccion: String;
    nuevo_municipio: String;
    nuevo_departamento: String;
    nuevo_encargado: String;


  ngOnInit() {
    this.cargarSedes();
  }
  cargarSedes() {
    this.http.get('https://api-erpp.herokuapp.com/api/sede')
      .toPromise().then((data: any) => {
        console.log(data);
        this.sedes = data.sedes;
      });
  }
  editar(id: string) {
    this.router.navigate(['editarSede', id]);
  }
  eliminar(id: string) {
    const direccion = 'https://api-erpp.herokuapp.com/api/sede/' + id;
    this.http.delete(direccion)
    .toPromise().then((data: any) => {
      console.log(data);
      this.cargarSedes();
    });
  }
  agregar() {
    this.http.post('https://api-erpp.herokuapp.com/api/sede',
    {
      'nombre': this.nuevo_nombre,
      'direccion': this.nuevo_direccion,
      'municipio': this.nuevo_municipio,
      'departamento': this.nuevo_departamento,
      'encargado': this.nuevo_encargado
  }).toPromise().then((data: any) => {
        console.log(data);
        this.cancelar();
        this.cargarSedes();
      });
  }
  cancelar() {
    this.nuevo_nombre = null;
    this.nuevo_direccion = null;
    this.nuevo_municipio = null;
    this.nuevo_departamento = null;
    this.nuevo_encargado = null;
  }

}
