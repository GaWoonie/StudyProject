import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBoardDetailComponent } from './admin-board-detail.component';

describe('AdminBoardDetailComponent', () => {
  let component: AdminBoardDetailComponent;
  let fixture: ComponentFixture<AdminBoardDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminBoardDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBoardDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
