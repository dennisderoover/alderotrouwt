import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadeauComponent } from './cadeau.component';

describe('CadeauComponent', () => {
  let component: CadeauComponent;
  let fixture: ComponentFixture<CadeauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadeauComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CadeauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
