import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient) { }
  // Declaraciones
  productos = [];
  cats = [];
  cats2 = [];
  nuevo_nombre: string;
  nueva_categoria = "";
  nuevo_proveedor = "";
  nueva_data="";
  httpdata;

  ngOnInit() {
    this.cargarProductos();
    this.cargarCategs();
  }

  cargarProductos(): boolean {
    this.http.get('https://api-erpp.herokuapp.com/api/producto')
      .toPromise().then((data: any) => {
        this.productos = data;
      });
    return true;
  }

  cargarCategs() {
    this.http.get("https://api-erpp.herokuapp.com/api/categoria")
      .subscribe((data) => this.displaydata(data)
      );    
  }

  displaydata(data) {
    this.httpdata = data;
    console.log(this.httpdata);
    this.httpdata.categorias.forEach(element => {
      this.cats.push(element);
    });
    console.log(this.cats);
  }

  editar(id: string) {
    this.router.navigate(['editarProducto', id]);
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
    console.log("BANDERA"+this.nueva_categoria);
    this.http.post('https://api-erpp.herokuapp.com/api/producto',
    {
      'nombre': this.nuevo_nombre,
      'categorias': [this.nueva_categoria],
      'proveedores': [this.nuevo_proveedor]
    }).toPromise().then((data: any) => {
      console.log(data);
      this.cancelar();
      this.cargarProductos();
    });

  }

  cancelar() {
    this.nuevo_nombre = "";
    this.nueva_categoria = "";
    this.nuevo_proveedor = "";
  }

}
