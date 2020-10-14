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
    { path: 'editarCategorias/:id', component: EditarCategoriasComponent }
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
  it('Titulo de formulario debe ser -AGREGAR CATEGORIA-', async(() => {
    const title = document.getElementById('titulocategoria').innerText;
    expect(title).toContain("AGREGAR CATEGORÍA");
  }));

  //Test 4
  it('Titulo de formulario debe ser -CATEGORIA-', async(() => {
    const title = document.getElementById('titulotabla').innerText;
    expect(title).toContain("CATEGORIAS");
  }));

  //Test 5
  it('Debe redireccionar a editarCategorias/categoria1 al recibir el id', fakeAsync(() => {
    component.editar("categoria1");
    tick(50);
    expect(location.path()).toBe('/editarCategorias/categoria1');
  }));

  //Test 6
  it('Debe retornar True al eliminar producto', async(() => {
    try {
    expect(component.eliminar("categoriaprueba")).toBeTrue();
    } catch (error) { 
    }
  }));




});
