import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from "@angular/common/http";
import { Router } from '@angular/router';
import { LocalStorageService } from './localstorage/localstorage.service';
import { environment } from 'src/environments/environment';
import { GetAccessToken } from '../models/localstorage-item';
import { RequestMessage } from '../models/requestMessage';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  private requestMessage: RequestMessage = new RequestMessage();
  public BASE_URL: string;
  public Finance_URL: string;
  public Common_URL: string;
  public Auth_URL: string;
  token: string;
  headers;
  constructor(

    public http: HttpClient,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {
    this.BASE_URL = environment.baseUrl;
    // this.Finance_URL = environment.client.finance_url;
    // this.Common_URL = environment.client.common_url;
    // this.Auth_URL = environment.client.auth_url;
    this.setTokenAndHeader();
  }

  setToken() {
    let user = GetAccessToken()
    if (user) {
      try {
        this.token = user.access_token;
      }
      catch (error) {
        this.localStorageService.clearAllLocalStorageKeyAndValue();
        this.router.navigate(['/login']);
      }
    } else {
      this.localStorageService.clearAllLocalStorageKeyAndValue();
      this.router.navigate(['/login']);
    }
  }

  setTokenAndHeader() {
    let user = GetAccessToken()
    if (user) {
      try {
        this.token = user.access_token;
        this.createAuthorizationHeaders();
      }
      catch (error) {
        this.localStorageService.clearAllLocalStorageKeyAndValue();
        this.router.navigate(['/login']);
      }
    }
  }

  createAuthorizationHeaders() {
    let headers = new HttpHeaders();
    headers.append("Authorization", "bearer " + this.token);
    this.headers = { headers };
  }

  appendAuthorizationHeader(headers: HttpHeaders) {
    this.setToken();
    headers.append("Authorization", "bearer " + this.token);
    return headers;
  }

  postToAuth(url: string, data: any) {
    return this.http.post(this.BASE_URL + url + "?", data, this.getHeaders());
  }

  get(url: string) {
    return this.http.get(this.BASE_URL + url, this.getHeaders());
  }

  post(url: string, data: any) {
    // return this.http.post(this.BASE_URL + url, data, this.headers);
    return this.http.post(this.BASE_URL + url, data, this.getHeaders());
  }
  postJson(url: string, data: any, token = "") {
    this.requestMessage.RequestObj = data;
    return this.http.post(this.BASE_URL + url, this.requestMessage, this.getHeaders());
  }

  put(url: string, data: any) {
    return this.http.put(this.BASE_URL + url, data, this.getHeaders());
  }
  putJson(url: string, data: any, token = "") {
    this.requestMessage.RequestObj = data;
    return this.http.put(this.BASE_URL + url, this.requestMessage, this.getHeaders());
  }

  delete(url: string, data?: any) {
    const options = {
      ...this.getHeaders(),
      body: data
    }
    return this.http.delete(this.BASE_URL + url, this.getHeaders());
  }

  getHeaders() {
    this.setToken();
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": "bearer " + this.token,
    });

    return {
      headers: headers,
      reportProgress: true
    };
  }


  getFile(url: string) {
    this.setToken();
    const httpOptions = {
      responseType: 'blob' as 'json',
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": "bearer " + this.token,
      })
    };
    return this.http.get(this.BASE_URL + url, httpOptions);
  }
  postFile(url: string, data: any, token = "") {
    const req = new HttpRequest('POST', this.BASE_URL + url, data, this.getFileHeaders());
    return this.http.request(req);
  }
  getFileHeaders() {
    this.setToken();
    const headers = new HttpHeaders({
      "Authorization": "bearer " + this.token
    });

    return {
      headers: headers,
      reportProgress: true,
      observe: 'events'
    };
  }
  get BaseUrl() {
    return this.BASE_URL;
  }
  /**
   * T is the Response model 
   * @param url 
   * @returns T
   */
  getT<T>(url: string) {
    return this.http.get<T>(this.BASE_URL + url, this.getHeaders());
  }
  /**
   * T is the POST model 
   * @param url 
   * @param data 
   * @returns any
   */
  postJsonT<T>(url: string, data: T) {
    return this.http.post<any>(this.BASE_URL + url + "?", data, this.getHeaders());
  }
  /**
   * R is the Response model 
   * @param url 
   * @param data 
   * @returns R
   */
  postJsonR<R>(url: string, data: any) {
    return this.http.post<R>(this.BASE_URL + url + "?", data, this.getHeaders());
  }
  /**
   * T is the POST model 
   * 
   * R is the Response model
   * @param url 
   * @param data 
   * @returns R
   */
  postJsonTR<T, R>(url: string, data: T) {
    return this.http.post<R>(this.BASE_URL + url + "?", data, this.getHeaders());
  }
  // putT<T>(url: string, data: any) {
  //   return this.http.put<T>(this.BASE_URL + url, data, this.getHeaders());
  // }
  // deleteT<T>(url: string, data?: any) {
  //   const options = {
  //     ...this.getHeaders(),
  //     body: data
  //   }
  //   return this.http.delete<T>(this.BASE_URL + url, options);
  // }

  /// --- http request with retry ---//
  // getWithRetry(url: string, delay: number = 1000, maxRetry: number = 3, backoff: number = 1000) {
  //   return this.http.get(this.BASE_URL + url, this.getHeaders()).pipe(
  //     retryBackoff(delay, maxRetry, backoff),
  //     catchError(error => {
  //       console.error(error);
  //       return EMPTY;
  //     }),
  //     shareReplay()
  //   );
  // }
  // postJsonWithRetry(url: string, data: any, delay: number = 1000, maxRetry: number = 3, backoff: number = 1000) {
  //   return this.http.post(this.BASE_URL + url + '?', data, this.getHeaders()).pipe(
  //     retryBackoff(delay, maxRetry, backoff),
  //     catchError(error => {
  //       console.error(error);
  //       return EMPTY;
  //     }),
  //     shareReplay()
  //   );
  // }
  // putWithRetry(url: string, data: any, delay: number = 1000, maxRetry: number = 3, backoff: number = 1000) {
  //   return this.http.put(this.BASE_URL + url, data, this.getHeaders()).pipe(
  //     retryBackoff(delay, maxRetry, backoff),
  //     catchError(error => {
  //       console.error(error);
  //       return EMPTY;
  //     }),
  //     shareReplay()
  //   );
  // }
  // deleteWithRetry(url: string, data?: any, delay: number = 1000, maxRetry: number = 3, backoff: number = 1000) {
  //   const options = {
  //     ...this.getHeaders(),
  //     body: data
  //   };
  //   return this.http.delete(this.BASE_URL + url, options).pipe(
  //     retryBackoff(delay, maxRetry, backoff),
  //     catchError(error => {
  //       console.error(error);
  //       return EMPTY;
  //     }),
  //     shareReplay()
  //   );
  // }
  ///-----------------------finance----------------------//
  postToFinance(url: string, data: any) {
    return this.http.post(
      this.Finance_URL + url + "?",
      data,
      this.getFinanceHeaders()
    );
  }
  postToCommon(url: string, data: any) {
    return this.http.post(this.Common_URL + url + "?", data, this.getHeaders());
  }


  getFromFinance(url: string) {
    return this.http.get(this.Finance_URL + url, this.getHeaders());
  }
  getFromCommon(url: string) {
    return this.http.get(this.Common_URL + url, this.getHeaders());
  }
  getUnAuthorized(url) {
    return this.http.get(this.BaseUrl + url, this.headers);
  }
  getFinanceHeaders() {
    const headers = new HttpHeaders();
    headers.set("Content-Type", "application/json");
    headers.append(
      "Authorization",
      "Bearer cc665a8062cc4caef58bdafde7d8baf676134c80dcc89d197a008549737f0505"
    );
    return { headers };
  }
}
