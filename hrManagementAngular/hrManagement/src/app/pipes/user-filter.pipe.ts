import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/user';

@Pipe({
  name: 'userFilter',
})
export class UserFilterPipe implements PipeTransform {
  transform(array: User[] | null, search: string): any {
    if (array == null) {
      return null;
    }
    if (typeof search === 'undefined' || search == '') {
      return array;
    } else {
      let filteredArr = array!.filter(function (item) {
        return item.firstName.toLowerCase().includes(search.toLowerCase());
      });
      return filteredArr;
    }
  }
}
