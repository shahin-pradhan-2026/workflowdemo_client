import { Injectable } from '@angular/core';

@Injectable()
export class CommonHelper {

  constructor() { }

  static getDateHelper(date: Date): any {
    var timeZoneDifference = (date.getTimezoneOffset() / 60) * -1; //convert to positive value.
    date.setTime(date.getTime() + (timeZoneDifference * 60) * 60 * 1000);
    date.toISOString();
    return new Date(date); // this.datePipe.transform(), "yyyy-mm-dd");
  }

  static groupBy(array, f) {
    var groups = {};
    array.forEach(o => {
      var group = JSON.stringify(f(o));
      groups[group] = groups[group] || [];
      groups[group].push(o);
    });
    return Object.keys(groups).map(group => {
      return groups[group];
    });
  }

  public static DistinctArray(array: any[]): any[] {
    if (!array) {
        array = [];
    }
    if (Array.isArray(array)) {
        if (array.length > 0) {
            array = array.map(item => item).filter((value, index, self) => self.indexOf(value) === index);
        }
    }
    return array;
}
  
}
