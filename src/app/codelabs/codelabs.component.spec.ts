import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodelabsComponent } from './codelabs.component';

describe('CodelabsComponent', () => {
  let component: CodelabsComponent;
  let fixture: ComponentFixture<CodelabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodelabsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodelabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
