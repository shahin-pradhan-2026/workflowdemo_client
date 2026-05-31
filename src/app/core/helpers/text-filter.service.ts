import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TextFilterService {

  public emailExp  = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  constructor() { }
  disableRightClick(event) {
    event.preventDefault();
  }
  onlyPositiveIntNumber(event: any) {
    const numberRegEx = /^[0-9]*[0-9][0-9]*$/;
    let inputCharacter = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !numberRegEx.test(inputCharacter)) {
      event.preventDefault();
    }
    if (event.type == "paste") {
      event.preventDefault();
    }
  }
  onlyLocationLatLon(event: any, data?: string) {
    const numberRegEx = /^[-+]?\d*\.?\d*\,?[-+]?\d*\.?\d*$/;
    let inputCharacter = String.fromCharCode(event.charCode);
    if (event.type == "keypress") {
      if (event.keyCode != 8 && !numberRegEx.test(inputCharacter)) {
        event.preventDefault();
      }
    }
    if (event.type == "paste" && data == 'html') {
      event.preventDefault();
    }
    if (event.type == "keydown") {
      if (!numberRegEx.test(inputCharacter)) {
        event.preventDefault();
      }
    }
    if (event.type == "change") {
      if (!numberRegEx.test(data)) {
        event.preventDefault();
        return false;
      }
      else {
        return true;
      }
    }
    if (event.type == "keyup") {
      if (!numberRegEx.test(data)) {
        event.preventDefault();
        return false;
      }
      else {
        return true;
      }
    }
  }

  onlyDecimalNumber(event: any) {
    const numberRegEx = /^-?\d*\.?\d*$/;
    let inputCharacter = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !numberRegEx.test(inputCharacter)) {
      event.preventDefault();
    }
  }
  onPasteDisable(event: ClipboardEvent) {
    event.preventDefault();
  }
  englishToBanglaDigit(digitNumber: number) {
    var banglaNumber = '';
    var strNumber: string;
    var count = 0;
    while (banglaNumber.length != digitNumber.toString().length) {

      strNumber = digitNumber.toString().substr(count, 1);
      let en = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
      let bn = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
      var index = en.indexOf(strNumber);
      banglaNumber += bn[index];
      count++;
    }
    return banglaNumber;
  }
  
}