import {async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReportesvComponent } from './reportesv.component';

describe('ReportesvComponent', () => {
  let component: ReportesvComponent;
  let fixture: ComponentFixture<ReportesvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FormsModule,  RouterTestingModule,HttpClientModule ],
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

  
  it("Titulo debe ser el de INFORMACION REPORTE", async(() => {
    const title = document.getElementById('titulocarta').innerText;
    expect(title).toContain("INFORMACION REPORTE");
  }));

  it("Titulo debe ser el de Tipo", async(() => {
    const title = document.getElementById('tipo').innerText;
    expect(title).toContain("Tipo");
  }));

  it("Titulo debe ser el de Filtro", async(() => {
    const title = document.getElementById('filtro').innerText;
    expect(title).toContain("Filtro");
  }));

  it("Titulo debe ser el de GENERAR REPORTE", async(() => {
    const title = document.getElementById('titulocarta2').innerText;
    expect(title).toContain("GENERAR REPORTE");
  }));

  it("Debe retornar 2020-02 cuando le mandamos febrero", async(() => {
    expect(component.evaluarMes("Febrero")).toContain("2020-02");
  }));

  it("Debe retornar 2020-05 cuando le mandamos mayo", async(() => {
    expect(component.evaluarMes("Mayo")).toContain("2020-05");
  }));

  it("Debe retornar verdadero al cancelar el rango de fechas", async(() => {
    expect(component.cancelar2()).not.toBeFalse();
  }));

  it("Debe retornar -1 para cancelar", async(() => {
    expect(component.cancelar()).toBeLessThanOrEqual(0);
  }));

  it("Debe retornar graficado cuando se creo la grafica correctamente", async(() => {
    expect(component.llenarArray()).toContain("graficado");
  }));

});
