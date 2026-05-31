import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root'
})
export class CrimeSubCategoryService {


  private controllerName = 'CrimeSubCategory';

  constructor(
    private httpClientService: HttpClientService
  ) { }

  getAll() {
    let url = this.controllerName;
    return this.httpClientService.get(url);
  }
  getAllByDepartmentID(id) {
    let url = this.controllerName+'/getAllByDepartmentID/'+id;
    return this.httpClientService.get(url);
  }

}
