export class ApplicationStatus {
  applicationStatusID: number;
  applicationStatusName: string;
  isActive?: boolean;
  orderNo: number;

  constructor(params?: Partial<ApplicationStatus>) {
    Object.assign(this, params);
  }
}
