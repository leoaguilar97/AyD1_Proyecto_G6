import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DetalleventaService } from '../services/detalleventa.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.scss']
})
export class VentaComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient, private DetalleventaService: DetalleventaService,private route: ActivatedRoute) { }

  venta = [];
  id = String(this.route.snapshot.params['id']);

  ngOnInit() {
    this.getVenta();
  }

  getVenta(){
    
  }

}
