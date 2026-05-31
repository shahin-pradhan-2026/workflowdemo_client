import { Organization } from "../data/organization";

export class AdminDashboard {
    adminDashboardScheduleSummarys: AdminDashboardScheduleSummary[];
    adminDashboardCourses: AdminDashboardCourse[];
    // adminDashboardTrainingCenters : Organization[];
}

export class AdminDashboardScheduleSummary {
    organizationID: number;
    organizationName: string;
    organizationNameBangla: string;
    // trainingDate: string;
    totalSchedule: number;
    reportInitialized: number;
    reportSubmitted: number;
    reportApproved: number;
    incedents: number;
}
export class AdminDashboardCourse {
    organizationID: number;
    organizationName: string;
    organizationNameBangla: string;
    trainingCourseID: number;
    trainingCourseName: string;
    trainingCourseNameBangla: string;
}