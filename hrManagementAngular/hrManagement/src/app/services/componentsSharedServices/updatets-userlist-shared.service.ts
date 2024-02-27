import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root',
})
export class UpdatetsUserListSharedService {
  constructor() {}

  private emitUpdateTs = new Subject<any>();
  updateTsEmitted$ = this.emitUpdateTs.asObservable();
  emitUpdate(change: any) {
    this.emitUpdateTs.next(change);
  }

  private emitUpdateTsList = new Subject<any>();
  updateTsListEmitted$ = this.emitUpdateTsList.asObservable();
  emitUpdateList(change: any) {
    this.emitUpdateTsList.next(change);
  }
}
