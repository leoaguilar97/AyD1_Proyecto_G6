import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DetalleventaService } from '../services/detalleventa.service';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.scss']
})
export class VentaComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient, private DetalleventaService: DetalleventaService,private route: ActivatedRoute) { }

  venta = [];
  id = String(this.route.snapshot.params['id']);
  //values
  nuevo_nombre = "";

  ngOnInit() {
    this.getVenta();
  }

  getVenta(){
    this.DetalleventaService.getVentaById(this.id)
    .pipe(first())
    .subscribe(
      data => {
        if (data.message == "retrieved") {
          this.venta = data.venta;
          console.log(this.venta);
        } else {
          console.log("Error")
        }
      },
      error => {
        console.log(error);
      });
  }
}
