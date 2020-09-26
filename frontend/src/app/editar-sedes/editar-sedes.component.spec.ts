import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarSedesComponent } from './editar-sedes.component';

describe('EditarSedesComponent', () => {
  let component: EditarSedesComponent;
  let fixture: ComponentFixture<EditarSedesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarSedesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarSedesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
