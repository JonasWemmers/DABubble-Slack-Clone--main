import { Component, ElementRef, Renderer2, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.scss']
})
export class ThreadComponent {

  constructor(private renderer: Renderer2, private el: ElementRef) { }

  @Output() closeThreadEvent: EventEmitter<void> = new EventEmitter<void>();

  isThreadActive: boolean = false;

  activateThread() {
    this.isThreadActive = true;
  }

  closeThread() {
    console.log('Thread wird geschlossen');
    this.closeThreadEvent.emit();
  }


}
