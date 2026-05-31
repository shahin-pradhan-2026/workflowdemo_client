export class Attachment {
    AttachmentID: number;
    ReferenceID: number = parseInt(localStorage.getItem('profileID'));
    AttachementTypeID: number;
    FileFormat: string;
    AttachmentName: string;
    AttachmentLink: string;
    FileContent: string;
    Notes: string;
    Status: number = 1;
    CreatedBy: string;
    CreatedDate: Date;
    UpdatedBy: number;
    UpdatedDate: Date;
    Description: string;
  
}