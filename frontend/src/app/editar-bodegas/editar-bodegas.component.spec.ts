import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarBodegasComponent } from './editar-bodegas.component';

describe('EditarBodegasComponent', () => {
  let component: EditarBodegasComponent;
  let fixture: ComponentFixture<EditarBodegasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarBodegasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarBodegasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
