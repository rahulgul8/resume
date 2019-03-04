import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BulletElementComponent } from './bullet-element.component';

describe('BulletElementComponent', () => {
  let component: BulletElementComponent;
  let fixture: ComponentFixture<BulletElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BulletElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulletElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
