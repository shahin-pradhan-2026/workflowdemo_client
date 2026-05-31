export enum Action {
    Insert = 1,
    Update,
    View,
    Delete,
}
export enum ReturnStatus {
    Success = 1,
    Failed = -1,
    Duplicate = 2,
    PendingOTPAuthentication = 3,
}
export enum PermissionType
{
    Menu = 1,
    Button = 2,
    Role = 3,
}
export enum PermissionEnum {
    trainingScheduleEdit = 1,
    trainingScheduleDelete = 2,
    trainingScheduleApprove = 3,
    trainingScheduleAddForAll = 16,
    trainingCourseAdminAccess = 17,
    userListAddPermission = 4,
    userListDeletePermission = 5,
    dailyReportEdit = 6,
    dailyReportDelete = 7,
    dailyReportApprove = 8,
    specialReportEdit = 9,
    specialReportDelete = 10,
    specialReportApprove = 11,
    reportSubmittedForPQHBox = 12,
    reportSubmittedForAdminBox = 13,
    dailyReportSubmit = 14,
    specialReportSubmit = 15,



    organizationList = 16,
    trainingCourseList = 17,
    trainingScheduleList = 18,
    userCreate = 19,
    trainingCategory = 20,
    trainingCenterCourseMap = 21,
    userList = 22,
    summaryReport = 23,
    specialReportEntry = 24,
    dailyReportEntry = 25
}
export enum ReportStatus {
    Initialize = 1,
    Submitted = 2,
    Approved = 3
}
export enum NotificationType
{
    All = 0,
    SMS = 1,
    Email = 2,
    Push = 3,
}
export enum NotificationAreaEnum
{
    UserRegistration = 1,
    UserLogin = 2,
}
export enum OrganizationType {
    General = 1,
    InService = 2
}
export enum GeoFenceType
{
    None = 0,
    All = 1
}
export enum DurationUnit {
    Day = 1,
    Week = 2,
    Month = 3,
    Year = 4
}
export enum GlobalSettingEnum {
    Login_Session_Time = 1,
    SMS_Base_Url = 2,
    Google_Map_Key = 3
}
export enum ApplicationType
{
    BCCase = 1,
    SpecialCase = 2,
    LUC = 3,
    OccupancyCertificate = 4,
    Others = 5,
}
export enum ApplicationStatus
{
    Initialize = 1,
    Running = 2,
    Completed = 3,
}
export enum AttachmentType {
    Audio = 1,
    Image = 2,
    Video = 3,
    Map = 4,
    File = 5
}
export enum InspectionFileType {
    OfficialReport = 1,
    TechnicalReport = 2
}
export enum InspectionRoleType {
    OfficerInCharge = 1,
    AssistantOfficer = 1
}

export enum BuildingType {
    Null = 1
}

export enum LandType {
    FirmingLand = 1,
    LivingLand = 2
}

export enum ElectricLineType {
    LowTension = 1,
    HighTension = 2
}
export enum CourseType {
    Basic = 1,
    InService = 2,
    Renewal = 3,
    Technical = 4

}
export enum TrainingScheduleStatus {
    Initialize = 1,
    Approved = 2,
    Completed = 3
}