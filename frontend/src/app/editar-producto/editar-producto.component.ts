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
   nuevo_nombre=null;
   nueva_categoria = null;
   nuevo_proveedor = null;
   id = String(this.route.snapshot.params['id']);
  

  ngOnInit() {
    this.cargarProductos();
    console.log("id es"+this.id);
    console.log("nombre "+this.productos[0]);
  }

  cargarProductos(): boolean {
    this.http.get('https://api-erpp.herokuapp.com/api/producto/'+this.id)
      .toPromise().then((data: any) => {
        this.nuevo_nombre = data.nombre;
        this.nueva_categoria = "Categoría 1";
        this.nuevo_proveedor = data.proveedores;
        console.log(this.productos);
      });
    return true;
  }


  editarProducto() {
    this.http.put('https://api-erpp.herokuapp.com/api/producto/'+this.id,
      {
        'nombre': this.nuevo_nombre,
        'categoria': [this.nueva_categoria],
        'proveedores': [this.nuevo_proveedor]
      }).toPromise().then((data: any) => {
        console.log(data);
        this.cancelar();

      });
  }

  cancelar() {
    this.nuevo_nombre= null;
    this.nueva_categoria = null;
    this.nuevo_proveedor = null;
    this.router.navigate(['productos']);
  }


}
