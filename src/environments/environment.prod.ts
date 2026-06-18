let api_endpoint = '';
const Ui_origin = window.location.origin;

switch (Ui_origin) {
  case 'http://13.53.197.48:8092': //for public ip
    api_endpoint = 'http://13.53.197.48:8090/api/';
  
    break;

  default:
    break;
}


export const environment = {
  production: true,
  baseUrl: api_endpoint,
  MAP_API_KEY: 'AIzaSyBiols4lFvOc7_rGeOZVI6l-YE617w7xR0',


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
