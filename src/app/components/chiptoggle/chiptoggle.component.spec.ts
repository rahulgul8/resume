import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiptoggleComponent } from './chiptoggle.component';

describe('ChiptoggleComponent', () => {
  let component: ChiptoggleComponent;
  let fixture: ComponentFixture<ChiptoggleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChiptoggleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChiptoggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
