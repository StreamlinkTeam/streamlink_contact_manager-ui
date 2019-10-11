import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionGlobalComponent } from './production-global.component';

describe('ProductionGlobalComponent', () => {
  let component: ProductionGlobalComponent;
  let fixture: ComponentFixture<ProductionGlobalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductionGlobalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductionGlobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
