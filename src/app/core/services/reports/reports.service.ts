
import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  private controllerName = 'specialReports';
  constructor(
    private httpClientService: HttpClientService
  ) { }

  getAll() {
    let url = this.controllerName;
    return this.httpClientService.get(url);
  }
  getInitialData(obj) {
    let url = this.controllerName + '/getInitialData';
    return this.httpClientService.postJson(url, obj);
  }
  getByID(userAutoID: number) {
    let url = this.controllerName + '/getByID/' + userAutoID;
    return this.httpClientService.get(url);
  }
  save(obj) {
    let url = this.controllerName
    return this.httpClientService.postJson(url, obj);
  }
  update(obj) {
    let url = this.controllerName;
    return this.httpClientService.putJson(url, obj);
  }
  
  delete(trainingCourseID: number) {
    let url = this.controllerName + '?id=' + trainingCourseID;
    return this.httpClientService.delete(url);
  }
  search(obj) {
    let url = this.controllerName + '/search'
    return this.httpClientService.postJson(url, obj);
  }
}



