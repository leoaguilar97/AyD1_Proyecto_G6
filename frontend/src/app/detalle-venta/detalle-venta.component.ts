import { Component, OnInit,ViewChild, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DetalleventaService } from '../services/detalleventa.service';
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-detalle-venta',
  templateUrl: './detalle-venta.component.html',
  styleUrls: ['./detalle-venta.component.scss']
})
export class DetalleVentaComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient,private DetalleventaService: DetalleventaService) { }

  vents=[];
  dataservice;
  ngOnInit() {
    this.getDetalleVentas();
  }

  getDetalleVentas(): boolean {
    this.DetalleventaService.getVentas()
    .pipe(first())
    .subscribe(
      data => {
        if (data.message == "retrieved") {
          this.vents = data.ventas;
          return true;
        } 
      },
      error => {
        console.log(error);
        return false;
      });
      return true;
  }
  
  verVenta(id: string) {
    this.router.navigate(['desgloseventa', id]);
  }

  
}
