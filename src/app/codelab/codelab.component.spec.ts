import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodelabComponent } from './codelab.component';

describe('CodelabComponent', () => {
  let component: CodelabComponent;
  let fixture: ComponentFixture<CodelabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodelabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodelabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
