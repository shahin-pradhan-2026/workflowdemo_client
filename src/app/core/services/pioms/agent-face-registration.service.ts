import { Injectable } from '@angular/core';
import { HttpClientService } from 'src/app/core/services/http-client.service';

@Injectable()
export class AgentFaceRegistrationService {
  private controllerName = 'AgentFaceRegistration';
  constructor(
    private httpClientService: HttpClientService
  ) { }

  getAll() {
    let url = this.controllerName;
    return this.httpClientService.get(url);
  }
  update(obj) {
    let url = this.controllerName;
    return this.httpClientService.postJson(url, obj);
  }
  delete(userAutoID: number) {
    let url = this.controllerName + '?id=' + userAutoID;
    return this.httpClientService.delete(url);
  }

}

