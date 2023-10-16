import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUserinfoEditComponent } from './dialog-userinfo-edit.component';

describe('DialogUserinfoEditComponent', () => {
  let component: DialogUserinfoEditComponent;
  let fixture: ComponentFixture<DialogUserinfoEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogUserinfoEditComponent]
    });
    fixture = TestBed.createComponent(DialogUserinfoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
