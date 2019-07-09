import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'days'
})
export class DaysPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(value == 0) {
      return 'Sun';
    }
    else if(value == 1) {
      return 'Mon';
    }
    else if(value == 2) {
      return 'Tue';
    }
    else if(value == 3) {
      return 'Wen';
    }
    else if(value == 4) {
      return 'Thu';
    }
    else if(value == 5) {
      return 'Fri';
    }
    else if(value == 6) {
      return 'Sat';
    }
  }

}
