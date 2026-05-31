import { Component , OnInit} from '@angular/core';
import { LOCALSTORAGE_KEY } from './core/models/localstorage-item';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {
   
  isPageLoader: boolean = true;

  public secretKey = 'my-secret-key';
  // public mapApiKey: string = 'AIzaSyBiols4lFvOc7_rGeOZVI6l-YE617w7xR0';

  ngOnInit() {
    // localStorage.setItem(LOCALSTORAGE_KEY.MAP_API_KEY, '');
    // var encryptedData = CryptoJS.AES.encrypt(this.mapApiKey, this.secretKey).toString();
    // localStorage.setItem(LOCALSTORAGE_KEY.MAP_API_KEY, encryptedData);
  }
  // localError() {
  //   throw Error("The app component has thrown an error!");
  // }
}   
