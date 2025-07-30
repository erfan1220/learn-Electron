import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePhone } from './update-phone';

describe('UpdatePhone', () => {
  let component: UpdatePhone;
  let fixture: ComponentFixture<UpdatePhone>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatePhone]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatePhone);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
