import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-categorias',
  templateUrl: './editar-categorias.component.html',
  styleUrls: ['./editar-categorias.component.scss']
})
export class EditarCategoriasComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient, private route: ActivatedRoute) { }

  // Declaraciones
  categoria = [];
  nuevo_nombre = "";
  id = String(this.route.snapshot.params['id']);



  ngOnInit() {
    this.cargarCategoria();
    console.log("id es " + this.id);
    //console.log("nombre "+this.nuevo_nombre[0]);
  }

  cargarCategoria(): boolean {
    this.http.get('https://api-erpp.herokuapp.com/api/categoria/' + this.id)
      .toPromise().then((data: any) => {
        this.nuevo_nombre = data.categorias[0].nombre;
        console.log("nombre es" + this.nuevo_nombre);
      });
    return true;
  }


  editarCategoria() {
    this.http.put('https://api-erpp.herokuapp.com/api/categoria/' + this.id,
      {
        'nombre': this.nuevo_nombre
      }).toPromise().then((data: any) => {
        console.log(data);
        this.cancelar();

      });
  }

  cancelar() {
    this.nuevo_nombre = null;
    this.router.navigate(['categorias']);
  }

}
