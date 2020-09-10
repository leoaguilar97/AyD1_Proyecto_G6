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
  categorias = [];
  nuevo_nombre: string;
  

  ngOnInit() {
    this.cargarProductos();
  }

  cargarProductos(): boolean {
    this.http.get('https://api-erpp.herokuapp.com/api/producto')
      .toPromise().then((data: any) => {
        this.categorias = data;
      });
    return true;
  }

  editar(id: string) {
    this.router.navigate(['editarCategorias', id]);
  }



  eliminar(id: string) {
    const direccion = 'https://api-erpp.herokuapp.com/api/producto/' + id;
    this.http.delete(direccion)
      .toPromise().then((data: any) => {
        console.log(data);
        this.cargarProductos();
      });
  }

  agregar() {
    this.http.post('https://api-erpp.herokuapp.com/api/producto',
      {
        'nombre': this.nuevo_nombre
      }).toPromise().then((data: any) => {
        console.log(data);
        this.cancelar();
        this.cargarProductos();
      });
  }

  cancelar() {
    this.nuevo_nombre = null;
  }

}
