import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectChatAreaComponent } from './direct-chat-area.component';

describe('DirectChatAreaComponent', () => {
  let component: DirectChatAreaComponent;
  let fixture: ComponentFixture<DirectChatAreaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DirectChatAreaComponent]
    });
    fixture = TestBed.createComponent(DirectChatAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
