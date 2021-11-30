import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReCommentDatailComponent } from './re-comment-datail.component';

describe('ReCommentDatailComponent', () => {
  let component: ReCommentDatailComponent;
  let fixture: ComponentFixture<ReCommentDatailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReCommentDatailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReCommentDatailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
