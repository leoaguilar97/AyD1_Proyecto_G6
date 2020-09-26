import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-editar-sedes',
  templateUrl: './editar-sedes.component.html',
  styleUrls: ['./editar-sedes.component.scss']
})
export class EditarSedesComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient, private route: ActivatedRoute) { }
  // Declaraciones
  sedes = [];
  nuevo_nombre: String;
  nuevo_direccion: String;
  nuevo_municipio: String;
  nuevo_departamento: String;
  nuevo_encargado: String;
  id = String(this.route.snapshot.params['id']);

  ngOnInit() {
    this.getInfoSede();
  }
  getInfoSede() {
    console.log(this.id);
    this.http.get('https://api-erpp.herokuapp.com/api/sede/' + this.id)
      .toPromise().then((data: any) => {
        this.nuevo_nombre = data.sede.nombre;
        this.nuevo_direccion = data.sede.direccion;
        this.nuevo_municipio = data.sede.municipio;
        this.nuevo_departamento = data.sede.departamento;
        this.nuevo_encargado = data.sede.encargado;
      });
  }
  modificar() {
    this.http.put('https://api-erpp.herokuapp.com/api/sede/' + this.id,
    {
      'nombre': this.nuevo_nombre,
      'direccion': this.nuevo_direccion,
      'municipio': this.nuevo_municipio,
      'departamento': this.nuevo_departamento,
      'encargado': this.nuevo_encargado
  }).toPromise().then((data: any) => {
        console.log(data);
        this.router.navigate(['sedes']);
      });
  }
}



