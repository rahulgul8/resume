import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstUppercase'
})
export class FirstUppercasePipe implements PipeTransform {

  transform(value: string, args?: any): any {
    return value.substr(0, 1).toUpperCase() + value.substr(1);
  }

}
