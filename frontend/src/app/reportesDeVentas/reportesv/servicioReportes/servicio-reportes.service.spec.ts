import { TestBed } from '@angular/core/testing';

import { ServicioReportesService } from './servicio-reportes.service';

describe('ServicioReportesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServicioReportesService = TestBed.get(ServicioReportesService);
    expect(service).toBeTruthy();
  });
});
