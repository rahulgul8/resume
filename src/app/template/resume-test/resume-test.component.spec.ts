import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeTestComponent } from './resume-test.component';

describe('ResumeTestComponent', () => {
  let component: ResumeTestComponent;
  let fixture: ComponentFixture<ResumeTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumeTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumeTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
