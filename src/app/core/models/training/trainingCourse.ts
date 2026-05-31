import { CourseType } from "../../enums/globalEnum";
export class TrainingCourse {
    trainingCourseID: number;
    trainingCourseName: string;
    trainingCourseNameBangla: string;
    trainingCourseCode: string;
    courseType: CourseType;
    orderNo: number;
    isActive: boolean;
    otherAPIID: number | null;
    organizationID: number | null;
    organizationName: string;
    isChecked: boolean;
    courseTypeStr: string;

    trainingCenterCourseMapID : number;
}