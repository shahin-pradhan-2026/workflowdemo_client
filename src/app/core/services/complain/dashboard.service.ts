import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {


  private controllerName = 'Dashboard';
  constructor(
    private httpClientService: HttpClientService
  ) { }

  getAll() {
    
    let url = this.controllerName;
    return this.httpClientService.get(url);
  }

  search(obj) {
    let url = this.controllerName + '/search';
    return this.httpClientService.postJson(url, obj);
  }
  searchBycomplainRelatedInfo(obj) {
    let url = this.controllerName + '/searchBycomplainRelatedInfo';
    return this.httpClientService.postJson(url, obj);
  }
  getAllDashboardChart(obj) {
    let url = this.controllerName + '/getAllDashboardChart';
    return this.httpClientService.postJson(url, obj);
  }
}