import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurarEstoquePage } from './configurar-estoque.page';

describe('ConfigurarEstoquePage', () => {
  let component: ConfigurarEstoquePage;
  let fixture: ComponentFixture<ConfigurarEstoquePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigurarEstoquePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurarEstoquePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
