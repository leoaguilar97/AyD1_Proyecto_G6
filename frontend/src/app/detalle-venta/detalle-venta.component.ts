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
  resp:string;
  respuesta:string;

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
}
