import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerInventarioComponent } from './ver-inventario.component';

describe('VerInventarioComponent', () => {
  let component: VerInventarioComponent;
  let fixture: ComponentFixture<VerInventarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerInventarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
