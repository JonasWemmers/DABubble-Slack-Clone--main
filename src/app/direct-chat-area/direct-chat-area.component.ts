import { Component } from '@angular/core';

@Component({
  selector: 'app-direct-chat-area',
  templateUrl: './direct-chat-area.component.html',
  styleUrls: ['./direct-chat-area.component.scss']
})
export class DirectChatAreaComponent {

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

}
