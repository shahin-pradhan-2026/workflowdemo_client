import { TrainingScheduleStatus } from "../../enums/globalEnum";
import { Designation } from "../settings/designation";

export class TrainingSchedule {
    trainingScheduleID: number;
    trainingCenterID: number;
    trainingCourseID: number;
    trainingCategoryID: number;
    trainingSessionID: number;
    trainingScheduleStatus : TrainingScheduleStatus
    ageFrom: number;
    ageTo: number;
    durationNumber: number;
    durationUnit: number;
    batchQty: number;
    traineeQty: number;
    maleQty: number;
    femaleQty: number;
    requirements: string;
    notes: string;
    trainingScheduleDetails: TrainingScheduleDetail[];
    trainingScheduleRankMaps: TrainingScheduleRankMap[];
    designations: Designation[];

    trainingCenterName: string;
    trainingCenterNameBangla: string;
    trainingCourseName: string;
    trainingCourseNameBangla: string;
    trainingCategoryName: string;
    trainingCategoryNameBangla : string;
    trainingSessionName: string;
    trainingSessionNameBangla: string;
    courseDurationStr: string;
    trainingScheduleStatusStr : string;
}

export class TrainingScheduleDetail {
    trainingScheduleDetailID: number;
    trainingScheduleID: number;
    startDate: Date;
    endDate: Date;
    sLNo: number;
    notes: string;
    batchNo: number;
}
export class TrainingScheduleRankMap {
    trainingScheduleRankMapID: number;
    trainingScheduleID: number;
    rankID: number;
    designationName: string;
    designationNameBangla: string;
    designationID: number;
}