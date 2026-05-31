// const api_endpoint = 'http://10.1.0.12:8020/api/' 
import * as CryptoJS from 'crypto-js';
import { LOCALSTORAGE_KEY } from 'src/app/core/models/localstorage-item';
const api_endpoint = 'http://localhost:56006/api/';

// var secretKey = 'my-secret-key';

// var mapApiKey = localStorage.getItem('MAP_API_KEY');

let googlemapAPi = localStorage.getItem(LOCALSTORAGE_KEY.GOOGLE_MAP_API_KEY);
googlemapAPi = JSON.parse(googlemapAPi);
if(googlemapAPi){
  var mapApiKeyxz = CryptoJS.AES.decrypt(googlemapAPi, 'my-secret-key').toString(CryptoJS.enc.Utf8);
}




export const environment = {
  production: false,
  baseUrl: api_endpoint,
  signalrHubUrl: 'http://localhost:56006/messageHub',
  // MAP_API_KEY_D: googlemapAPi,
  MAP_API_KEY: googlemapAPi,
  
  defaultauth: 'fackbackend',
  firebaseConfig: {
    apiKey: '',
    authDomain: '',
    databaseURL: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',
    measurementId: ''
  }
};



