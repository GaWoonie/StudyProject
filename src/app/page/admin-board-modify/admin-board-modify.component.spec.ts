import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBoardModifyComponent } from './admin-board-modify.component';

describe('AdminBoardModifyComponent', () => {
  let component: AdminBoardModifyComponent;
  let fixture: ComponentFixture<AdminBoardModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminBoardModifyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBoardModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
