import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-chat-area',
  templateUrl: './chat-area.component.html',
  styleUrls: ['./chat-area.component.scss']
})
export class ChatAreaComponent implements OnInit {

  @Output() activateThreadEvent: EventEmitter<void> = new EventEmitter<void>();

  formattedDate!: string;

  ngOnInit() {
    this.formatiereDatum();
  }

  private formatiereDatum() {
    const tage = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
    const monate = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];

    const aktuellesDatum = new Date();
    const wochentag = tage[aktuellesDatum.getDay()];
    const tag = aktuellesDatum.getDate();
    const monat = monate[aktuellesDatum.getMonth()];

    this.formattedDate = `${wochentag}, ${tag}. ${monat}`;
  }

  onActivateThreadClick() {
    this.activateThreadEvent.emit();
  }

}
