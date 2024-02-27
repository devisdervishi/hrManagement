import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'oneError',
})
export class OneErrorPipe implements PipeTransform {
  transform(errors: any, errorsPriority: string[]): any {
    if (!errors) {
      return null;
    }
    const oneError: any = {};
    for (let error of errorsPriority) {
      if (errors[error]) {
        oneError[error] = errors[error];
        break;
      }
    }
    return oneError;
  }
}
