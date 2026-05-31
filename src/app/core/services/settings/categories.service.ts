import { Injectable } from '@angular/core';
import { HttpClientService } from 'src/app/core/services/http-client.service';

@Injectable()
export class CategoriesService {
  private controllerName = 'ComplainCategory';
  constructor(
    private httpClientService: HttpClientService
  ) { }

  getAll() {
    let url = this.controllerName;
    return this.httpClientService.get(url);
  }

  save(obj) {
    let url = this.controllerName+'/save';
    return this.httpClientService.postJson(url, obj);
  }
  update(obj) {
    let url = this.controllerName;
    return this.httpClientService.putJson(url, obj);
  }
  delete(catID: number) {
    let url = this.controllerName + '?id=' + catID;
    return this.httpClientService.delete(url);
  }

}
