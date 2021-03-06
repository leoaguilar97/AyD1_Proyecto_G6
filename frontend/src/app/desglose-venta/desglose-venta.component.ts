import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DetalleventaService } from '../services/detalleventa.service';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-desglose-venta',
  templateUrl: './desglose-venta.component.html',
  styleUrls: ['./desglose-venta.component.scss']
})
export class DesgloseVentaComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient, private DetalleventaService: DetalleventaService, private route: ActivatedRoute) { }

  venta;
  productos = [];
  vendedor = [];
  id = String(this.route.snapshot.params['id']);
  fecha;
  bodega;
  prodsbodega=[];
  arregloprecios=[];
  http1;
  nombre_cliente;
  nit;
  dir;
  nombre_vend;
  prod_nombre;
  tot;

  
  //values

  ngOnInit() {
    this.getVenta();
  }

  getVenta() {
    this.DetalleventaService.getVentaById(this.id)
      .pipe(first())
      .subscribe(
        data => {
          if (data.message == "retrieved") {
            this.venta = data.venta;
            this.nombre_cliente=data.venta.nombre_cliente;
            this.nit=data.venta.nit;
            this.dir=data.venta.direccion;
            this.nombre_vend= data.venta.vendedor.nombre +" " + data.venta.vendedor.apellido;
            this.productos = data.venta.productos;
            this.bodega = data.venta.bodega;
            this.fecha = data.venta.createdAt;
            this.tot=data.venta.total;
            //console.log("Data retrieved");
            
            this.getFecha();
            this.getProductosBodega();
            //console.log(this.venta);
            //console.log(this.vendedor);
            //console.log(this.productos);
          } else {
            console.log("Error")
          }
        },
        error => {
          console.log(error);
        });
  }
 

  //Obtener formato de fecha
  getFecha() {
    var str = this.fecha;
    this.fecha = str.split("T", 1);
  }

  //Obtener Productos de bodega
  getProductosBodega() {
    let bodegaid=this.bodega._id;
    this.DetalleventaService.getProdsBodega(bodegaid)
      .pipe(first())
      .subscribe(
        data => {
          if (data.message == "retrieved") {
            //console.log("Retrieved bodega");
            this.prodsbodega=data.bodega.productos;
            this.getPrecioProductos();
          } else {
            console.log("Error")
          }
        },
        error => {
          console.log(error);
        });
  }

  getPrecioProductos(){
    //console.log(this.productos);
    this.productos.forEach(element => {
      let nombre=element.producto.nombre;
      //console.log(nombre);
      this.prodsbodega.forEach(element => {   
        if(element.producto.nombre==nombre){
          this.arregloprecios.push(element.precio);
          //console.log("precio"+element.precio);
        }
      });
    });

  }

}
