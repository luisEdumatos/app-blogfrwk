
import { EventEmitter } from "@angular/core";

export class BroadCastService {
  private static emiters: {[eventName: string]: EventEmitter<any>} = {};

  static get(eventName: string): EventEmitter<any> {
    if (!this.emiters[eventName]) {
      this.emiters[eventName] = new EventEmitter<any>();
    }
    return this.emiters[eventName];
  }

}
