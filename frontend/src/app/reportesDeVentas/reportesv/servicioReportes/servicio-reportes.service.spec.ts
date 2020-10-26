import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ServicioReportesService } from './servicio-reportes.service';

describe('ServicioReportesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule ]
    })
    .compileComponents();
  });

  it('should be created', () => {
    const service: ServicioReportesService = TestBed.get(ServicioReportesService);
    expect(service).toBeTruthy();
  });
});
