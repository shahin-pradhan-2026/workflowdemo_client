import { Organization } from "../data/organization";
import { IncidentType } from "../settings/incidentType";

export class QueryObject {
    requestObj: object;
    fromDate: Date;
    toDate: Date;
    departmentID: number;
    applicationType: number;
    designation: number;
    accessRight: number;
    bPNumber: string;
    appliedPost: number;
    userAutoID: number;
    userID: number;
    unitID: number;
    applicantName: string;
    sessionID: number;
    userRoleID: number;
    countryID: number = 0;
    organizationID: number;
    divisionID: number = 0;
    districtID: number = 0;
    upazilaCityCorporationID: number = 0;
    thanaID: number = 0;
    dpzID: number = 0;
    mouzaID: number = 0;
    unionWardID: number = 0;
    villageAreaID: number;
    territoryID: number;
    territoryName: string;
    fileNo: string;
    isVisited: boolean;
    visitType: number;
    referenceNo: string;
    dailyReportID: number;
    isQuickSearch: boolean = true;

    crimeMainCategoryID:number;
    crimeSubCategoryID:number;
    assignedADCID:number;
    assignedACID:number;
    assignedIOID:number;
    pageID:number;
    IsIntelCti: boolean;
    ComplainStatusID: number
    // batchID: number;
    // trainingCenterIDs: string;
    // trainingCourseIDs: string;
    // organizations: Organization[];
    // incidentTypes: IncidentType[];
    // trainingSessionID: number;
    // trainingCategoryID: number;
    // trainingScheduleStatusID: number;


}