import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarCategoriasComponent } from './editar-categorias.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { Router, Routes } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Location } from "@angular/common";
import { NgZone } from '@angular/core';
import { CategoriasComponent } from '../categorias/categorias.component';


describe('EditarCategoriasComponent', () => {
  let location: Location;
  let router: Router;
  let component: EditarCategoriasComponent;
  let fixture: ComponentFixture<EditarCategoriasComponent>;

  const routes: Routes = [
    { path: 'categorias/', component: CategoriasComponent }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule.withRoutes(routes), HttpClientModule],
      declarations: [CategoriasComponent, EditarCategoriasComponent]
    })
    .compileComponents();
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    fixture = TestBed.createComponent(EditarCategoriasComponent);
    router.initialNavigation();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

   //Test 1
   it('Debe retornar True al cargar los Categorías', async(() => {
    expect(component.cargarCategoria()).toBeTrue();
  }));

});
