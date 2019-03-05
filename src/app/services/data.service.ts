import { Injectable } from '@angular/core';
import { Subject, PartialObserver, Subscription } from 'rxjs';

export class DataSubject<T>{

  constructor() {
    this.subject = new Subject<T>();
  }

  subject: Subject<T>;

  send(t: T) {
    this.subject.next(t);
  }

  subscribe(observer: PartialObserver<T>): Subscription {
    return this.subject.subscribe(observer);
  }

}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  channelMap: Map<string, DataSubject<any>>;

  subscribeTo(channel: string): DataSubject<any> {
    if (!this.channelMap.has(channel)) {
      this.channelMap.set(channel, new DataSubject());
    }
    return this.channelMap.get(channel);
  }

  sendTo(channel: string) {
    if (!this.channelMap.has(channel)) {
      this.channelMap.set(channel, new DataSubject());
    }
    return this.channelMap.get(channel);
  }

  subscribe(channel: string, observer: PartialObserver<any>) {
    this.subscribeTo(channel).subscribe(observer);
  }

  send(channel: string, msg: any) {
    this.sendTo(channel).send(msg);
  }


  constructor() { }
}
