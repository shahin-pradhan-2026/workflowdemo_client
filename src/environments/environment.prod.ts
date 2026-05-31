let api_endpoint = '', singalR_endpoint = '';
const Ui_origin = window.location.origin;

switch (Ui_origin) {
  case 'http://localhost:4200': //for local development      
    api_endpoint = 'http://localhost:56006/api/';
    singalR_endpoint = 'http://localhost:56006/messageHub';
    break;
  // case 'http://localhost:4300': //for local development      
  //   api_endpoint = 'http://localhost:56006/api/';
  //   break;
  // case 'http://localhost:4400': //for local development      
  //   api_endpoint = 'http://localhost:56006/api/';
  //   break;
  // case 'http://localhost:4500': //for local development      
  //   api_endpoint = 'http://localhost:56006/api/';
  //   break;
  //   case 'http://localhost:4600': //for local development      
  //   api_endpoint = 'http://localhost:56006/api/';
  //   break;
  case 'http://10.1.0.12:7087': //for staging 
    api_endpoint = 'http://10.1.0.12:7088/api/';
    //singalR_endpoint = 'http://10.1.0.12:8018/messageHub';
    break;

  case 'http://182.160.105.228:7087': //for public ip
    api_endpoint = 'http://182.160.105.228:7088/api/';
   // singalR_endpoint = 'http://182.160.105.228:8018/messageHub';
    break;
  // case 'http://115.127.139.59:8017': //for public ip
  //   api_endpoint = 'http://115.127.139.59:8018/api/';
  //   singalR_endpoint = 'http://115.127.139.59:8018/messageHub';
  //   break;
  // case 'http://localhost:8017': //for server localhost
  //   api_endpoint = 'http://localhost:8018/api/';
  //   singalR_endpoint = 'http://localhost:8018/messageHub';
  //   break;
  default:
    break;
}


export const environment = {
  production: true,
  baseUrl: api_endpoint,
  signalrHubUrl: singalR_endpoint,
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
