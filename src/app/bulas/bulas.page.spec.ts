import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BulasPage } from './bulas.page';

describe('BulasPage', () => {
  let component: BulasPage;
  let fixture: ComponentFixture<BulasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BulasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
