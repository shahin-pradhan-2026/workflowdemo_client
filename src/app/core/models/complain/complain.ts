import { Attachment } from "../common/attachment";
import { pimsProfile } from "./pimsProfile";
import { Punishment } from "./punishment";
import { Reward } from "./reward";

export class ComplainDetails {
    complainID: number = 0;
    bpNumber: string = '';
    complainCategoryID: number;
    presentUnitID: number;
    presentRankID: number;
    mainUnitName: string = '';
    presentRank: string = '';
    recordDate: Date;
    agentID: number = 0;
    complainDetails: string = '';
    complainComment: string = '';
    currentPosition: string = '';
    pimsProfile: pimsProfile = new pimsProfile();
    lstReward: Reward[] = new Array<Reward>();
    lstPunishment: Punishment[] = new Array<Punishment>();
    lstAttachment: Attachment[] = new Array<Attachment>();
    createdDate: Date;
    toDate: Date;
    fromDate: Date;
    agentName: string = '';
    bangla_name: string = '';


    sponsorshipTypeId: number;
    requestedAmount: number;
    purpose: string = '';
    renarks: string = ''; // consider renaming to remarks
    priority: number;
    complainNo: number;
    latitude: number;
    longitude: number;
    complainerLatitude: number;
    complainerLongitude: number;
    complainStatusID: number;
    notes: string = '';
    status: number;
    updatedDate: Date;
    createdBy: number;
    updatedBy: number;
    eventDate:Date;
    title:string = '';
    eventName:string = '';
    statusName:string = '';
    applicationStatusID: number;
     remarks:string = '';
}
