import { ReportStatus } from "../../enums/globalEnum";

export class SpecialReport {
    specialReportID: number;
    trainingCenterID: number;
    reportDate: Date;
    reportDateOnly: any;
    reportTimeOnly: any;
    placeName: string;
    description: string;
    damage: string;
    actionTaken: string;
    notes: string;
    reportStatus: ReportStatus;
    reportStatusName: string;
    approvedBy: number | null;
    approvedDate: string | null;
    createdBy: number;
    createdDate: string;
    trainingCenterName: string;
    trainingCenterNameBangla: string;
    incidentTypeID: number;
    incidentTypeName: string
}