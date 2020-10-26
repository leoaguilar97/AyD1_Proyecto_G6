import { fakeAsync, tick, async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleVentaComponent } from './detalle-venta.component';
import { DetalleventaService } from '../services/detalleventa.service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router, Routes } from '@angular/router';
import { DesgloseVentaComponent } from '../desglose-venta/desglose-venta.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from "@angular/common";

describe('DetalleVentaComponent', () => {
  let component: DetalleVentaComponent;
  let fixture: ComponentFixture<DetalleVentaComponent>;
  let detalleVentaservice:DetalleventaService;
  let router: Router;
  let http: HttpClient;
  let httpclient: HttpClient;
  let location: Location;

  const routes: Routes = [
    { path: 'desglose/:id', component: DesgloseVentaComponent }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule.withRoutes(routes), HttpClientModule],
      declarations: [ DetalleVentaComponent,DesgloseVentaComponent ]
    })
    .compileComponents();

    router = TestBed.get(Router);
    location = TestBed.get(Location);
    fixture = TestBed.createComponent(DetalleVentaComponent);
    router.initialNavigation();
    detalleVentaservice = new DetalleventaService(http,router);
  }));

  beforeEach(() => {
    detalleVentaservice = new DetalleventaService(http,router);
    component = new DetalleVentaComponent(router,httpclient,detalleVentaservice);
    fixture = TestBed.createComponent(DetalleVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debería retornar true al obtener ventas', () => {
    expect(component.getDetalleVentas()).toBeTruthy;
  });

  it('Debe redireccionar a editarCategorias/Consolas al recibir el id', fakeAsync(() => {
    component.verVenta("5f91145b8f444f001752d270");
    tick(50);
    expect(location.path()).toBe('/editarCategorias/5f91145b8f444f001752d270');
  }));


});
