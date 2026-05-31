import { HttpErrorResponse } from "@angular/common/http";
import { ErrorHandler, Injectable, Injector, NgZone } from "@angular/core";
import { SweetAlertEnum, SweetAlertService } from "../helpers/sweet-alert.service";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(
    private swal: SweetAlertService,
    private zone: NgZone,
    private injector: Injector
  ) { }

  handleError(error: any): void {
    // Check if it's an error from an HTTP response
    if (!(error instanceof HttpErrorResponse)) {
      error = error.rejection || error.stack || error.message; // get the error object
    }
    // this.zone.run(() =>
    //   this.swal.message(error?.message || 'Undefined client error' + 'G-001', SweetAlertEnum.error)
    // );

    console.error('Error from global error handler', error);
  }
}