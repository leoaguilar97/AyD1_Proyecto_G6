import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { UsuariosComponent } from './usuarios.component';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { assert } from 'console';
import { of } from 'rxjs';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

describe('UsuariosComponent', () => {
  let component: UsuariosComponent;
  let fixture: ComponentFixture<UsuariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientTestingModule
      ],
      declarations: [UsuariosComponent],
      providers: [{ provide: Router }, { provide: HttpClient }, UsuariosComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  const mockUsers = [
    {
      'roles': [
        'Administrador'
      ],
      'nombre': 'David',
      'apellido': 'Salguero',
      'dpi': 3001534650101,
      'correo': 'mada.salgui@gmail.com',
      'fechaNacimiento': '1996-11-09T00:00:00.000Z',
      'direccion': 'Km 21.5 a Fraijanes, Bosque Escondido, Casuarina 27',
      'numeroCelular': 41284078,
      'password': '$2a$08$cn8/RcJFSCXRL9N35HJiSe/2jT/iQBtunTONlK3EfmCeVgE1Ig4DK',
      'createdAt': '2020-09-04T02:38:14.514Z',
      'updatedAt': '2020-09-04T10:25:52.958Z',
      'id': '5f51a8967d07e60017911167'
    }
  ];
});
