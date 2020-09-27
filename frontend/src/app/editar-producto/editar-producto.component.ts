import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ProductosComponent } from '../productos/productos.component';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.scss']
})
export class EditarProductoComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient, private route: ActivatedRoute) { }

  // Declaraciones
  productos = [];
  cats = [];
  cats2 = [];
  nuevo_nombre = null;
  nueva_categoria = null;
  nueva_categoria2 = null;
  nueva_cat="";
  nuevo_proveedor = null;
  id = String(this.route.snapshot.params['id']);
  httpdata;
  httpdata1;

  ngOnInit() {
    this.cargarProductos();
    this.cargarCategs();
    //console.log("FLAG2")
    //console.log(this.cats);
  }

  cargarProductos(): boolean {
    this.http.get('https://api-erpp.herokuapp.com/api/producto/' + this.id)
      .subscribe((data) => this.displaydata(data)
      );
    return true;
  }

  displaydata(data) {
    this.httpdata1 = data;
    console.log("FLAG2")
    console.log(this.httpdata1);
    this.nuevo_nombre = data.nombre;
    this.nueva_categoria = data.categorias[0].nombre;
    this.nueva_categoria2 = data.categorias[0].nombre;
    this.nuevo_proveedor = data.proveedores;
  }

  cargarCategs() {
    this.http.get("https://api-erpp.herokuapp.com/api/categoria")
      .subscribe((data) => this.displaydata2(data)
      );
  }

  displaydata2(data) {
    console.log("FLAG");
    this.httpdata = data;
    console.log(this.httpdata);
    this.httpdata.categorias.forEach(element => {
      this.cats.push(element);
    });
  }


  editarProducto() {
    console.log(this.cats);
    console.log(this.nueva_categoria);
    this.nueva_cat=this.nueva_categoria;
    this.http.put('https://api-erpp.herokuapp.com/api/producto/' + this.id,
      {
        'nombre': this.nuevo_nombre,
        'categorias': [this.nueva_cat],
        'proveedores': [this.nuevo_proveedor]
      }).toPromise().then((data: any) => {
        console.log(data);
        this.cancelar();

      });
  }

  cancelar() {
    this.nuevo_nombre = null;
    this.nueva_categoria = null;
    this.nuevo_proveedor = null;
    this.router.navigate(['productos']);
  }


}
