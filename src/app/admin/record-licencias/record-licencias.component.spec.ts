import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordLicenciasComponent } from './record-licencias.component';

describe('RecordLicenciasComponent', () => {
  let component: RecordLicenciasComponent;
  let fixture: ComponentFixture<RecordLicenciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecordLicenciasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordLicenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
