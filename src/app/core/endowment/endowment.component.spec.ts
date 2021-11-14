import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndowmentComponent } from './endowment.component';

describe('EndowmentComponent', () => {
  let component: EndowmentComponent;
  let fixture: ComponentFixture<EndowmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EndowmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EndowmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
