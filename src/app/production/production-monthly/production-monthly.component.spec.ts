import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionMonthlyComponent } from './production-monthly.component';

describe('ProductionMonthlyComponent', () => {
  let component: ProductionMonthlyComponent;
  let fixture: ComponentFixture<ProductionMonthlyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductionMonthlyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductionMonthlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
