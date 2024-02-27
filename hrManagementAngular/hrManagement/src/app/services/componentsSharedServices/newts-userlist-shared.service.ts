import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NewtsUserlistSharedService {
  constructor() {}
  private emitUpdateTsList = new Subject<any>();
  updateTsListEmitted$ = this.emitUpdateTsList.asObservable();
  emitUpdateList(change: any) {
    this.emitUpdateTsList.next(change);
  }
}
