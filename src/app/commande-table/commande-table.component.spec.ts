import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandeTableComponent } from './commande-table.component';

import 'zone.js';
import 'zone.js/dist/async-test.js';
import 'zone.js/dist/proxy.js';
import 'zone.js/dist/sync-test';
import 'zone.js/dist/zone.js';
import 'zone.js/dist/jasmine-patch';

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
