import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/user';

@Pipe({
  name: 'userSort',
})
export class UserSortPipe implements PipeTransform {
  transform(array: User[] | null, sortType: number): any {
    if (sortType == 0) {
      array?.sort((a, b) => {
        if (a.latestTimeSheet > b.latestTimeSheet) {
          return -1;
        } else if (a.latestTimeSheet < b.latestTimeSheet) {
          return 1;
        } else return 0;
      });
      return array;
    } else {
      array?.sort((a, b) => {
        if (a.latestTimeSheet > b.latestTimeSheet) {
          return 1;
        } else if (a.latestTimeSheet < b.latestTimeSheet) {
          return -1;
        } else return 0;
      });
      return array;
    }
  }
}
