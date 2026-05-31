import { OrganizationType, ReportStatus } from "../../enums/globalEnum";
export class DailyReport {
  dailyReportID: number;
  trainingCenterID: number;
  reportDate: Date;
  reportDateOnly: any;
  reportTimeOnly: any;
  reportStatus: ReportStatus;
  trainingRelatedProblem: string;
  otherInformation: string;
  approvedBy: number | null;
  approvedDate: string | null;
  createdBy: number;
  createdDate: string;
  trainingCenterName : string;
  trainingCenterNameBangla : string;
  reportStatusName: string;
}