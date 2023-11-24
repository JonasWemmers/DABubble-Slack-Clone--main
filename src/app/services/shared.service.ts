import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  constructor() {}

  public formatTime(timestamp: number) {
    const date = new Date(timestamp);
    const hours = this.padZero(date.getHours());
    const minutes = this.padZero(date.getMinutes());
    return `${hours}:${minutes}`;
  }

  public formatDate(timestamp: number) {
    const date = new Date(timestamp)
    const days = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
    const dayName = days[date.getDay()];
    const day = this.padZero(date.getDate());
    const monthNames = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
    const monthName = monthNames[date.getMonth()];
    return `${dayName}, ${day} ${monthName}`;
  }

  private padZero(value: number) {
    return value < 10 ? `0${value}` : `${value}`;
  }



}
