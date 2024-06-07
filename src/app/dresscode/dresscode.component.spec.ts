import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DresscodeComponent } from './dresscode.component';

describe('DresscodeComponent', () => {
  let component: DresscodeComponent;
  let fixture: ComponentFixture<DresscodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DresscodeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DresscodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
