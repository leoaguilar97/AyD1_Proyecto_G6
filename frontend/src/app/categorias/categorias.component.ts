import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient) { }
  // Declaraciones
  cats = [];
  nuevo_nombre: string;

  ngOnInit() {
    this.cargarCategs();
  }

  cargarCategs(): boolean {
    this.http.get('https://api-erpp.herokuapp.com/api/categoria')
      .toPromise().then((data: any) => {
        this.cats = data.categorias;
      });
    return true;
  }

  editar(id: string) {
    this.router.navigate(['editarCategorias', id]);
  }



  eliminar(id: string) {
    const direccion = 'https://api-erpp.herokuapp.com/api/categoria/' + id;
    this.http.delete(direccion)
      .toPromise().then((data: any) => {
        console.log(data);
        this.cargarCategs();
      });
  }

  agregar() {
    this.http.post('https://api-erpp.herokuapp.com/api/categoria',
      {
        'nombre': this.nuevo_nombre
      }).toPromise().then((data: any) => {
        console.log(data);
        this.cancelar();
        this.cargarCategs();
      });
  }

  cancelar() {
    this.nuevo_nombre = null;
  }

}
