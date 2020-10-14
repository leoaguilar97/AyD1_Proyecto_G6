import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesvComponent } from './reportesv.component';

describe('ReportesvComponent', () => {
  let component: ReportesvComponent;
  let fixture: ComponentFixture<ReportesvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportesvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportesvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
