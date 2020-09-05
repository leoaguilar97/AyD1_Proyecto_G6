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
  nuevo_nombre: string;
  nueva_categoria = null;
  nuevo_proveedor = null;

  ngOnInit() {
    this.cargarProductos();
  }

  cargarProductos(): boolean {
    this.http.get('https://api-erpp.herokuapp.com/api/producto')
      .toPromise().then((data: any) => {
        this.productos = data;
      });
    return true;
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
    this.http.post('https://api-erpp.herokuapp.com/api/producto',
      {
        'nombre': this.nuevo_nombre,
        'categoria': [this.nueva_categoria],
        'proveedores': [this.nuevo_proveedor]
      }).toPromise().then((data: any) => {
        console.log(data);
        this.cancelar();
        this.cargarProductos();
      });
  }

  cancelar() {
    this.nuevo_nombre = null;
    this.nueva_categoria = null;
    this.nuevo_proveedor = null;
  }

}
