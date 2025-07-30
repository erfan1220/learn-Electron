import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvInfo } from './adv-info';

describe('AdvInfo', () => {
  let component: AdvInfo;
  let fixture: ComponentFixture<AdvInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
