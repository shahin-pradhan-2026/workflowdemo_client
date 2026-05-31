// import { Observable } from 'rxjs/Observable';
// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { map } from 'rxjs/operators';
// import { finalize } from 'rxjs/operators';
// import { throwError } from 'rxjs';
// import { Router } from '@angular/router';
// import { RequestMessage } from '../models/requestMessage';
// import { LocalStorageService } from '../services/localstorage/localstorage.service';
// import { ResponseMessage } from '../models/responseMessage';

// @Injectable()
// export class HttpHelper {
//   static numberOfRequest = 0;
//   private baseUrl = '';
//   tokenExpirationTime: Date = null;
//   private requestMessage: RequestMessage = new RequestMessage();
//   constructor(
//     private httpClient: HttpClient,
//     private router: Router,
//     private localStorageService: LocalStorageService) {
//     this.getbaseURL();
//   }

//   public hideLoader() {
//     HttpHelper.numberOfRequest = 0;
//     // this.loadingSpinner.hide();
//   }
//   getbaseURL() {
//     const Ui_origin = window.location.origin;
//     let api_endpoint = 'http://localhost:56006/';
//     let pic_endpoint = 'http://localhost:56006/';
//     this.baseUrl = api_endpoint;
//   }
//   postHelperdefault(url: string, obj: [], pageIndex = 0, pageSize = 0, sortBy = '', sortOrder = '', filterBy = ''): Observable<any> {
//     url = this.baseUrl + url;
//     const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });

//     return this.httpClient.post(url, obj, { headers: headers }).pipe(map(
//       value => {


//         localStorage.setItem('currentUser', JSON.stringify(value));
//         return value;
//       },
//     ));
//   }
//   postHelper(url: string, obj: [], pageIndex = 0, pageSize = 0, sortBy = '', sortOrder = '', filterBy = ''): Observable<any> {
//     url = this.baseUrl + url;
//     const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
//     this.requestMessage = new RequestMessage();
//     this.requestMessage.RequestObj = obj;
//     this.requestMessage.Token = localStorage.getItem('token');


//    // this.requestMessage.UserAutoID = (localStorage.getItem('userAutoID') != null) ? parseInt(localStorage.getItem('userAutoID')) : 0;


//     return this.httpClient.post(url, JSON.stringify(this.requestMessage), this.getHeaders()).pipe(map(
//       (value: ResponseMessage) => {
//         localStorage.setItem('currentUser', JSON.stringify(value));
//         return value;
//       },
//     ));
//   }
//   getHeaders() {
    
//     const headers = new HttpHeaders({
//       "Content-Type": "application/json",
//       "Authorization": "bearer " + this.requestMessage.Token,
//     });

//     return {
//       headers: headers,
//       reportProgress: true
//     };
//   }
//   // postHelper(url, obj, pageIndex?, pageSize?, sortBy?, sortOrder?, filterBy?): Observable<any> {
//   //   url = this.baseUrl + url;
//   //   HttpHelper.numberOfRequest++;
//   //   // console.log(url);
//   //   if (HttpHelper.numberOfRequest === 1) {
//   //     // this.loadingSpinner.show();
//   //   }
//   //   // this.localStorageService.clear();
//   //   // this.router.navigate(["/login"]);

//   //   this.requestMessage.requestObj = obj;
//   //   this.requestMessage.userID = localStorage.getItem('userID');
//   //   this.requestMessage.unitID = (localStorage.getItem('unitID') != null) ? parseInt(localStorage.getItem('unitID')) : 0;
//   //   this.requestMessage.organizationID = (localStorage.getItem('organizationID') != null) ? parseInt(localStorage.getItem('organizationID')) : 0;
//   //   this.requestMessage.workingUnitID = (localStorage.getItem('workingUnitID') != null) ? parseInt(localStorage.getItem('workingUnitID')) : 0;
//   //   this.requestMessage.UserAutoID = (localStorage.getItem('userAutoID') != null) ? parseInt(localStorage.getItem('userAutoID')) : 0;
//   //   this.tokenExpirationTime = (localStorage.getItem('tokenExpirationTime') != null) ? new Date(localStorage.getItem('tokenExpirationTime')) : null;
//   //   this.requestMessage.token = localStorage.getItem('token');
//   //   this.requestMessage.pageIndex = pageIndex;
//   //   this.requestMessage.pageSize = pageSize;
//   //   this.requestMessage.sortBy = sortBy;
//   //   this.requestMessage.sortOrder = sortOrder;
//   //   this.requestMessage.filterBy = filterBy;
//   //   const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
//   //   return this.httpClient.post(url, obj, { headers: headers }).pipe(map(
//   //     value => {
//   //       return value;
//   //     },
//   //     error => {
//   //       alert('error');
//   //     },
//   //   )).catch(this.handleError.bind(this)).pipe(finalize(() => {
//   //     HttpHelper.numberOfRequest--;
//   //     if (HttpHelper.numberOfRequest === 0) {
//   //       // this.loadingSpinner.hide();
//   //     }
//   //   }));
//   // }


//   postFileHelper(url, obj, pageIndex?, pageSize?, sortBy?, sortOrder?, filterBy?): Observable<any> {
//     url = this.baseUrl + url;
//     HttpHelper.numberOfRequest++;
//     if (HttpHelper.numberOfRequest === 1) {
//       // this.loadingSpinner.show();
//     }

//     // this.requestMessage.requestObj = obj;
//     this.requestMessage.userID = localStorage.getItem('userID');
//     this.requestMessage.unitID = (localStorage.getItem('unitID') != null) ? parseInt(localStorage.getItem('unitID')) : 0;
//     // this.requestMessage.token = localStorage.getItem('token');
//     this.requestMessage.pageIndex = pageIndex;
//     this.requestMessage.pageSize = pageSize;
//     this.requestMessage.sortBy = sortBy;
//     this.requestMessage.sortOrder = sortOrder;
//     this.requestMessage.filterBy = filterBy;

//     const httpOptions = {
//       responseType: 'blob' as 'json',
//       headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' })
//     };
//     const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });

//     return this.httpClient.post(url, JSON.stringify(this.requestMessage), httpOptions).pipe(map(
//       value => {
//         return value;
//       },
//       error => {
//         alert('error');
//       },
//     )).catch(this.handleError.bind(this)).pipe(finalize(() => {
//       HttpHelper.numberOfRequest--;
//       if (HttpHelper.numberOfRequest === 0) {
//         // this.loadingSpinner.hide();
//       }
//     }));
//   }
//   getHelper(url): Observable<any> {
//     HttpHelper.numberOfRequest++;
//     console.log(url);
//     if (HttpHelper.numberOfRequest === 1) {
//       // this.loadingSpinner.show();
//     }

//     return this.httpClient.get(url).pipe(map(
//       value => {
//         // this.loadingSpinner.hide();
//         return value;

//       },
//       function (error) {
//         alert('error');
//       },
//     )).catch(this.handleError.bind(this)).pipe(finalize(() => {
//       HttpHelper.numberOfRequest--;
//       if (HttpHelper.numberOfRequest === 0) {
//         // this.loadingSpinner.hide();
//       }
//     }));
//   }



//   postHelperWithoutLoading(url, obj): Observable<any> {
//     url = this.baseUrl + url;
//     console.log(url);

//     // this.requestMessage.requestObj = obj;
//     this.requestMessage.branchID = 1;
//     // this.requestMessage.token = this.localStorageService.get('token');
//     this.requestMessage.pageIndex = 1;
//     this.requestMessage.pageSize = 0;
//     const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });

//     return this.httpClient.post(url, JSON.stringify(this.requestMessage), { headers: headers }).pipe(map(
//       value => {

//         // console.log('----------------Response Object----------------------------');
//         //  console.log(JSON.stringify(value, null, 2));
//         // console.log('----------------Response Object----------------------------');
//         return value;
//       },
//       error => {
//         alert('error');
//       },
//     )).pipe(finalize(() => {

//     }));
//   }

//   handleError(error: any) {
//     console.log(error);
//     let errMsg = (error.message) ? error.message :
//       error.status ? `${error.status} - ${error.statusText}` : 'Server error';
//     if (HttpHelper.numberOfRequest == 1) {
//       if (error.status == 401) {
//         this.localStorageService.clear();
//         this.router.navigate(['/login']);
//         // this.messageHelper.showMessage(1000, "Session Timeout. Please Log in Again");
//       } else if (error.message == 'Timeout has occurred') {
//         // this.messageHelper.showMessage(1000, "response time out");
//       } else {
//         // this.messageHelper.showMessage(1000, "error connection");
//       }
//     }
//     return throwError(errMsg);
//   }


// }
