import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root',
})
export class DeletedialogUserlistSharedService {
  constructor() {}

  private emitUpdateUserList = new Subject<any>();
  updateUserListEmitted$ = this.emitUpdateUserList.asObservable();
  emitUpdateList(change: any) {
    this.emitUpdateUserList.next(change);
  }
}
