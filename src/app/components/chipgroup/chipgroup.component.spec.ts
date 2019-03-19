import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipgroupComponent } from './chipgroup.component';

describe('ChipgroupComponent', () => {
  let component: ChipgroupComponent;
  let fixture: ComponentFixture<ChipgroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChipgroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChipgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
