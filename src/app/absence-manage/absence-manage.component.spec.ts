import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsenceManageComponent } from './absence-manage.component';

describe('AbsenceManageComponent', () => {
  let component: AbsenceManageComponent;
  let fixture: ComponentFixture<AbsenceManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbsenceManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbsenceManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
