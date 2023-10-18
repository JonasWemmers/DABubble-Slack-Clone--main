import { Component, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.scss']
})
export class ThreadComponent {

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  hideThreadComponent() {
    // Füge die CSS-Eigenschaft 'display: none' zur Komponente hinzu
    this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
  }

}
