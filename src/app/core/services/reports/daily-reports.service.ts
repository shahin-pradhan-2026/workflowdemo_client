
import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class DailyReportsService {

  private controllerName = 'dailyReports';
  constructor(
    private httpClientService: HttpClientService
  ) { }

  getAll() {
    let url = this.controllerName;
    return this.httpClientService.get(url);
  }
  getAllInformationForDailyReportByDate(obj) {
    let url = this.controllerName + '/getByDate'
    return this.httpClientService.postJson(url, obj);
  }
  getByID(dailyReportID: number) {
    let url = this.controllerName + '/getByID/' + dailyReportID;
    return this.httpClientService.get(url);
  }

  getDailyReportAdminInfoByID(dailyReportID: number) {
    let url = this.controllerName + '/getDailyReportAdminInfoByID/' + dailyReportID;
    return this.httpClientService.get(url);
  }

  getDailyReportTrainingInfo(obj) {
    let url = this.controllerName + '/getDailyReportTrainingInfo'
    return this.httpClientService.postJson(url, obj);
  }

  save(obj) {
    let url = this.controllerName
    return this.httpClientService.postJson(url, obj);
  }
  update(obj) {
    let url = this.controllerName;
    return this.httpClientService.putJson(url, obj);
  }

  updateReportStatus(obj) {
    let url = this.controllerName + '/updateReportStatus'
    return this.httpClientService.postJson(url, obj);
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



