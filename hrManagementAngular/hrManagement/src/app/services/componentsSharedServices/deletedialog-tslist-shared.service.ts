import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root',
})
export class DeletedialogTslistSharedService {
  constructor() {}
  
  private emitUpdateTsList = new Subject<any>();
  updateTsListEmitted$ = this.emitUpdateTsList.asObservable();
  emitUpdateList(change: any) {
    this.emitUpdateTsList.next(change);
  }
}
