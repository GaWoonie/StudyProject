import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBoardListComponent } from './admin-board-list.component';

describe('AdminBoardListComponent', () => {
  let component: AdminBoardListComponent;
  let fixture: ComponentFixture<AdminBoardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminBoardListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBoardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
