import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsenceDemandeComponent } from './absence-demande.component';

describe('AbsenceDemandeComponent', () => {
  let component: AbsenceDemandeComponent;
  let fixture: ComponentFixture<AbsenceDemandeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbsenceDemandeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbsenceDemandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
