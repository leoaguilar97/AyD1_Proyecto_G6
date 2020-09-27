import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-editar-bodegas',
  templateUrl: './editar-bodegas.component.html',
  styleUrls: ['./editar-bodegas.component.scss']
})
export class EditarBodegasComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient, private route: ActivatedRoute) { }
  // Declaraciones
  bodegas = [];
  nuevo_nombre: String;
  nuevo_direccion: String;
  nuevo_sedes = [];
  id = String(this.route.snapshot.params['id']);

  ngOnInit() {
    this.getInfoBodega();
  }
  getInfoBodega() {
    this.http.get('https://api-erpp.herokuapp.com/api/bodega/' + this.id)
      .toPromise().then((data: any) => {
        this.nuevo_nombre = data.bodega.nombre;
        this.nuevo_direccion = data.bodega.direccion;
      });
  }
  modificar() {
    this.http.put('https://api-erpp.herokuapp.com/api/bodega/' + this.id,
    {
      'nombre': this.nuevo_nombre,
      'direccion': this.nuevo_direccion,
  }).toPromise().then((data: any) => {
        console.log(data);
        this.router.navigate(['bodegas']);
      });
  }

}
