import { DailyReport } from "./dailyReport";
import { DailyReportAdminInfo } from "./dailyReportAdminInfos";
import { DailyReportTrainingInfo } from "./dailyReportTrainingInfo";
import { TrainingCourse } from "./trainingCourse";
import { TrainingSchedule, TrainingScheduleDetail } from "./trainingSchedule";
import { VMDailyTraining } from "./vmDailyTraining";


export class VMDailyRportCRUD {
    objDailyReport: DailyReport = new DailyReport();
    // objTrainingCourse: TrainingCourse = new TrainingCourse();
    // objTrainingSchedule: TrainingSchedule= new TrainingSchedule();
    // objTrainingScheduleDetail: TrainingScheduleDetail = new TrainingScheduleDetail();
    lstDailyReportAdminInfo: Array<DailyReportAdminInfo> = new Array<DailyReportAdminInfo>();
    lstDailyReportTrainingInfo: Array<DailyReportTrainingInfo> = new Array<DailyReportTrainingInfo>();
    //lstDailyReportTrainingInfo: Array<VMDailyTraining> = new Array<VMDailyTraining>();

}