import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private channelsLoadedSubject = new BehaviorSubject<boolean>(false);
  channelsLoaded$ = this.channelsLoadedSubject.asObservable();

  setChannelsLoaded(loaded: boolean) {
    this.channelsLoadedSubject.next(loaded);
  }
}