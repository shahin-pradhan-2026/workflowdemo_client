import { Injectable } from '@angular/core';
import { HttpClientService } from 'src/app/core/services/http-client.service';

@Injectable()
export class AgentAttendanceService {
  private controllerName = 'AgentAttendance';
  constructor(
    private httpClientService: HttpClientService
  ) { }

  getAll() {
    let url = this.controllerName;
    return this.httpClientService.get(url);
  }
  getByID(userAutoID: number) {
    let url = this.controllerName + '/getByID/' + userAutoID;
    return this.httpClientService.get(url);
  }
  save(obj) {
    let url = this.controllerName+'/save';
    return this.httpClientService.postJson(url, obj);
  }
  update(obj) {
    let url = this.controllerName+'/put';
    return this.httpClientService.putJson(url, obj);
  }
  delete(userAutoID: number) {
    let url = this.controllerName + '?id=' + userAutoID;
    return this.httpClientService.delete(url);
  }
  updateOrder(obj) {
    let url = this.controllerName + '/updateOrder'
    return this.httpClientService.putJson(url, obj);
  }
  getListByOrganization(obj) {
    let url = this.controllerName + '/getListByOrganization/';
    return this.httpClientService.postJson(url, obj);
  }
    getAttendanceListByFilter(obj) {
    let url = this.controllerName + '/getAttendanceListByFilter/';
    return this.httpClientService.postJson(url, obj);
  }
}

