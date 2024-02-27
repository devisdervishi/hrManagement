import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'empty',
})
export class EmptyPipe implements PipeTransform {
  transform(array: any[] | null): boolean {
    if (array == null) {
      return true;
    }
    if (array.length == 0) {
      return true;
    }
    return false;
  }
}
