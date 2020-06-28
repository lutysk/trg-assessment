import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalLocationInfoComponent } from './modal-location-info.component';

describe('ModalLocationInfoComponent', () => {
  let component: ModalLocationInfoComponent;
  let fixture: ComponentFixture<ModalLocationInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalLocationInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalLocationInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
