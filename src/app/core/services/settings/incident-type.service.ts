import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class IncidentTypeService {

  private controllerName = 'incidentType';
  constructor(
    private httpClientService: HttpClientService
  ) { }

  getAll() {
    let url = this.controllerName;
    return this.httpClientService.get(url);
  }
  getByID(incidentTypeID: number) {
    let url = this.controllerName + '/getByID/' + incidentTypeID;
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
  delete(incidentTypeID: number) {
    let url = this.controllerName + '?id=' + incidentTypeID;
    return this.httpClientService.delete(url);
  }
}
