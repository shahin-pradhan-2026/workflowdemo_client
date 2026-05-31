import { GlobalSetting } from "./settings/globalSetting";

export class AuthUser {
    userAutoID: number;
    userID: string;
    userTypeID: number;
    organizationID: number;
    organizationName: string;
    organizationNameBangla: string;
    designationID: number;
    userFullName: string;
    userRoleID: number;
    tokenResult: TokenResult;
    permissions: [];
    globalSettings: GlobalSetting[];
    password: string;
    userImage: string;
    trainingSessionID: number;
    trainingSessionName: string;
    trainingSessionNameBangla: string;
    departmentID:number;
    rememberMe: boolean;
}
export class TokenResult {
    access_token: string;
    expiration: string | null;
    userEmail: string;
    statusCode: number;
    message: string;
}