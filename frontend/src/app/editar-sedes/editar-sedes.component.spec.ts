import { EditarSedesComponent } from './editar-sedes.component';
import { fakeAsync, tick, async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { Router, Routes } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Location } from "@angular/common";
import { NgZone } from '@angular/core';

describe('EditarSedesComponent', () => {
  let component: EditarSedesComponent;
  let fixture: ComponentFixture<EditarSedesComponent>;
  let location: Location;
  let router: Router;

  const routes: Routes = [
    { path: 'editarSede/:id', component: EditarSedesComponent }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarSedesComponent ]
    })
    .compileComponents();
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    fixture = TestBed.createComponent(EditarSedesComponent);
    router.initialNavigation();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarSedesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
