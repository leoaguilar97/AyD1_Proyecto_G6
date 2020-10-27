import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesgloseVentaComponent } from './desglose-venta.component';

describe('DesgloseVentaComponent', () => {
  let component: DesgloseVentaComponent;
  let fixture: ComponentFixture<DesgloseVentaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesgloseVentaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesgloseVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
