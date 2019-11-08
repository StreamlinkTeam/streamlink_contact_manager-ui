import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandeTableComponent } from './commande-table.component';

describe('CommandeTableComponent', () => {
  let component: CommandeTableComponent;
  let fixture: ComponentFixture<CommandeTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommandeTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
