import { CategoriasComponent } from './categorias.component';
import { fakeAsync, tick, async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { Router, Routes } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Location } from "@angular/common";
import { NgZone } from '@angular/core';
import { EditarCategoriasComponent } from '../editar-categorias/editar-categorias.component';


describe('CategoriasComponent', () => {
  let component: CategoriasComponent;
  let fixture: ComponentFixture<CategoriasComponent>;
  let location: Location;
  let router: Router;

  const routes: Routes = [
    { path: 'editarProducto/:id', component: EditarCategoriasComponent }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule.withRoutes(routes), HttpClientModule],
      declarations: [CategoriasComponent, EditarCategoriasComponent]
    })
      .compileComponents();

    router = TestBed.get(Router);
    location = TestBed.get(Location);
    fixture = TestBed.createComponent(CategoriasComponent);
    router.initialNavigation();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //Test 1
  it('Debe retornar True al cargar los Categorías', async(() => {
    expect(component.cargarCategs()).toBeTrue();
  }));

  //Test 2
  it('Debe retornar -Formulario Vacío- al cancelar', async(() => {
      expect(component.cancelar()).toEqual("Formulario Vacio");
  }));

  //Test 3

  
});
