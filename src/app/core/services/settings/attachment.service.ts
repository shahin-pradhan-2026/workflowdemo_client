import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClientService } from 'src/app/core/services/http-client.service';
//import { GetAccessToken } from '../../models/localstorage-item';
import { LocalStorageService } from '../localstorage/localstorage.service';
import { Router } from '@angular/router';

@Injectable()
export class AttachmentService {
  private controllerName = 'Attachments';
  //BASE_URL = 'http://localhost:56006/api/';
  

  constructor(
    private httpClientService: HttpClientService,
    private http: HttpClient,
    private router: Router,
    private localStorageService: LocalStorageService
  ) { }

  getAll() {
    let url = this.controllerName;
    return this.httpClientService.get(url);
  }

  getAttachmentByComplainID(id: number) {
    let url = this.controllerName + '/getAttachmentListByComplainID/' + id;
    return this.httpClientService.get(url);
  }
  delete(id: number) {
    let url = this.controllerName + '?id=' + id;
    return this.httpClientService.delete(url);
  }

  // getAllUploadFileRef() {
  //   let url = this.controllerName + '/getAllUploadFileRef';
  //   return this.httpClientService.get(url);
  // }
  
  downloadFileAttachment(obj) {
    let url = this.controllerName + '/downloadFileAttachment';
    // return this.httpClientService.postFileJson(url, obj); 
    // return this.http.post(this.BASE_URL + url, obj, { observe: 'response', responseType: 'blob'});
    return this.httpClientService.postFile(url, obj); 
  }

  save(obj) {
    let url = this.controllerName
    return this.httpClientService.postJson(url, obj);
  }

  saveFileAttachments(obj) {
    let url = this.controllerName + '/saveFileAttachments';
    return this.httpClientService.postJson(url, obj);
  }

  assignAttachment(obj) {
    let url = this.controllerName + '/assignAttachment';
    return this.httpClientService.postJson(url, obj);
  }

  excelUpload(obj) {
    let url = this.controllerName + '/excelUpload';
    return this.httpClientService.post(url, { requestObj: JSON.stringify(obj) });
  }
}

