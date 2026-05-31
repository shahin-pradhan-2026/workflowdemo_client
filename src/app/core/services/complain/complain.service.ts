import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Observable } from 'rxjs';
import { ResponseMessage } from '../../models/responseMessage';

@Injectable({
  providedIn: 'root'
})
export class ComplainService {


  private complainControllerName = 'Complain';
  private proxycontrollerName = 'Proxy';
   private ComplainCategoryControllerName = 'ComplainCategory';
  constructor(
    private httpClientService: HttpClientService
  ) { }


  getAllComplain() {
    let url = this.complainControllerName;
    return this.httpClientService.get(url);
  }
  getComplainListByID(cID) {
    let url = this.complainControllerName+'/getComplainListByID/'+cID;
    return this.httpClientService.get(url);
  }
  getByID(cID) {
    let url = this.complainControllerName+'/getByID/'+cID;
    return this.httpClientService.get(url);
  }
  saveComplain(obj) {
    let url = this.complainControllerName + '/saveComplain';
    return this.httpClientService.postJson(url, obj);
  }
  getComplainListByFilter(vmComplain: any) {
    let url = this.complainControllerName + '/GetComplainListByFilter';
    return this.httpClientService.postJson(url, vmComplain);
  }
  
 

}