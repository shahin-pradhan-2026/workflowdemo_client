import { Injectable } from '@angular/core';
import { HttpClientService } from 'src/app/core/services/http-client.service';

@Injectable({
  providedIn: 'root'
})
export class PreventionViolentExtrimismService {

  private controllerName = 'PreventionViolentExtrimism';
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
    debugger;
    let url = this.controllerName
    return this.httpClientService.postJson(url, obj);
  }
  update(obj) {
    debugger;
    let url = this.controllerName + '/put';
    return this.httpClientService.postJson(url, obj);
  }
  
  delete(id: number) {
    let url = this.controllerName + '?id=' + id;
    return this.httpClientService.delete(url);
  }
  
}

