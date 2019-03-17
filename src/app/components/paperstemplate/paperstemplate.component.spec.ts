import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaperstemplateComponent } from './paperstemplate.component';

describe('PaperstemplateComponent', () => {
  let component: PaperstemplateComponent;
  let fixture: ComponentFixture<PaperstemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaperstemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaperstemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
