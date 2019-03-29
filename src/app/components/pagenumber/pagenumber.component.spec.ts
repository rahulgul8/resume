import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagenumberComponent } from './pagenumber.component';

describe('PagenumberComponent', () => {
  let component: PagenumberComponent;
  let fixture: ComponentFixture<PagenumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagenumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagenumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
