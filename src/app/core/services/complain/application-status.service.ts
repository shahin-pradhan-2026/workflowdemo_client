import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Observable } from 'rxjs';
import { ResponseMessage } from '../../models/responseMessage';

@Injectable({
  providedIn: 'root'
})
export class ApplicationStatusService  {

 private controllerName = 'ApplicationStatus';

  constructor(
    private httpClientService: HttpClientService
  ) { }

   getAll() {
    let url = this.controllerName;
    return this.httpClientService.get(url);
  }
}