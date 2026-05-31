import { Injectable } from '@angular/core';
import { HttpClientService } from 'src/app/core/services/http-client.service';



@Injectable()
export class RoleTypeService {
  private controllerName = 'RoleType';
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

  
  // getAllWithCourseCount() {
  //   let url = this.controllerName + '/getAllWithCourseCount';
  //   return this.httpClientService.get(url);
  // }
  saveRoleType(obj) {
    
    let url = this.controllerName;
    return this.httpClientService.postJson(url, obj);
  }

  updateRoleType(obj) {
    debugger;
    let url = this.controllerName;
    return this.httpClientService.putJson(url, obj);
  }
  delete(id: number) {
    let url = this.controllerName + '?id=' + id;
    return this.httpClientService.delete(url);
  }

  getInitialData() {
    let url = this.controllerName + '/getInitialData';
    return this.httpClientService.get(url);
  }
}
