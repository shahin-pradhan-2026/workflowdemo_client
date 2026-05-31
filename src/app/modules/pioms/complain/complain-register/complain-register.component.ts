import { Component, OnInit } from '@angular/core';
import { SweetAlertEnum, SweetAlertService } from 'src/app/core/helpers/sweet-alert.service';
import { ComplainService } from 'src/app/core/services/complain/complain.service';
import { ResponseMessage } from 'src/app/core/models/responseMessage';
import { ComplainDetails } from 'src/app/core/models/complain/complain';
import { Attachment } from 'src/app/core/models/common/attachment';
import { Users } from 'src/app/core/models/settings/users';
import { ApplicationStatus } from 'src/app/core/models/applicationStatus';
import { ApplicationStatusService } from 'src/app/core/services/complain/application-status.service';
import { UserService } from 'src/app/core/services/settings/user.service';
import { ActivatedRoute } from '@angular/router';
import { LOCALSTORAGE_KEY } from 'src/app/core/models/localstorage-item';

@Component({
  selector: 'app-sponsorship-register',
  templateUrl: './complain-register.component.html',
  styleUrls: ['./complain-register.component.css'],
})
export class ComplainRegisterComponent implements OnInit {
  labelPageTitle: string = "Sponsorship Request Register";

  objComplainDetails: ComplainDetails = new ComplainDetails();
  lstAttachment: Attachment[] = [];
  selectedFile: File | null = null;
  attachmentTypeID: number = 0;
  attachmentDescription: string = '';
  lstUser: Users[] = [];
  lstApplicationStatus: ApplicationStatus[] = [];

  // 🔹 Numeric role ID from localStorage
  currentUserRoleId: number = 0;

  lstSponsorshipTypes = [
    { sponsorshipTypeId: 1, name: 'Event Sponsorship' },
    { sponsorshipTypeId: 2, name: 'Charity Sponsorship' },
    { sponsorshipTypeId: 3, name: 'Training Sponsorship' },
    { sponsorshipTypeId: 4, name: 'Marketing Sponsorship' }
  ];

  constructor(
    private complainService: ComplainService,
    private userService: UserService,
    private applicationStatusService: ApplicationStatusService,
    private swal: SweetAlertService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.objComplainDetails.sponsorshipTypeId = 0;
    this.objComplainDetails.agentID = 0;

    // Read role ID from localStorage
    const roleId = localStorage.getItem(LOCALSTORAGE_KEY.ROLE_ID);
    this.currentUserRoleId = roleId ? Number(roleId) : 0;

    this.getAllUser();
    this.getAllApplicationStatus();

    // Check if we have an ID in the route
    const compainID = Number(this.route.snapshot.paramMap.get('id'));
    if (compainID && compainID > 0) {
      this.getByID(compainID);
    }
  }

  getAllUser() {
    this.userService.getAll().subscribe(
      (res: Users[]) => {
        if (res) {
          this.lstUser = res;
        }
      },
      (error) => {
        this.swal.message(error, SweetAlertEnum.error);
      }
    );
  }

getAllApplicationStatus() {
  this.applicationStatusService.getAll().subscribe(
    (res: ResponseMessage) => {
      if (res && res.statusCode === 1) {
        const allStatuses = res.responseObj as ApplicationStatus[];

        // 🔹 Requestor role (ID = 13) → Draft, Pending Manager Approval, Cancelled
        if (this.currentUserRoleId === 13) {
          this.lstApplicationStatus = allStatuses.filter(s =>
            [1, 2, 6].includes(s.applicationStatusID)
          );
          if (this.objComplainDetails.applicationStatusID === 1) {
            this.objComplainDetails.applicationStatusID = 1; // Draft
          }
        }
        // 🔹 Manager role (ID = 11) → Pending Manager Approval, Pending Finance Review, Rejected
        else if (this.currentUserRoleId === 11)
           {
          this.lstApplicationStatus = allStatuses.filter(s =>
            [2, 3, 5].includes(s.applicationStatusID)
          );
          if (this.objComplainDetails.applicationStatusID === 2) {
            this.objComplainDetails.applicationStatusID = 2; // Pending Manager Approval
          }
        }
        // 🔹 Finance Admin role (ID = 4) → Approved, Rejected
        else if (this.currentUserRoleId === 4) {
          this.lstApplicationStatus = allStatuses.filter(s =>
            [4, 5].includes(s.applicationStatusID)
          );
          if ([4, 5].includes(this.objComplainDetails.applicationStatusID)) {
            this.objComplainDetails.applicationStatusID = this.objComplainDetails.applicationStatusID;
          }
        }
        // 🔹 Other roles → see all statuses
        else {
          this.lstApplicationStatus = allStatuses;
        }
      } else {
        this.swal.message('Failed to load Application Status', SweetAlertEnum.error);
      }
    },
    (error) => {
      this.swal.message(error, SweetAlertEnum.error);
    }
  );
}



  getByID(compainID: number) {
    this.complainService.getByID(compainID).subscribe((res: ResponseMessage) => {
      if (res && res.statusCode === 1 && res.responseObj) {
        this.objComplainDetails = res.responseObj as ComplainDetails;

        // 🔹 Convert Date object into yyyy-MM-dd string
        if (this.objComplainDetails.eventDate) {
          const d = new Date(this.objComplainDetails.eventDate);
          this.objComplainDetails.eventDate = d.toISOString().split('T')[0] as any;
        }
      }
    });
  }

  saveComplain() {
    if (!this.objComplainDetails.title || this.objComplainDetails.title.trim() === '') {
      this.swal.message('Request Title is required.', SweetAlertEnum.warning);
      return;
    }
    if (!this.objComplainDetails.sponsorshipTypeId || this.objComplainDetails.sponsorshipTypeId === 0) {
      this.swal.message('Sponsorship Type is required.', SweetAlertEnum.warning);
      return;
    }
    if (!this.objComplainDetails.eventDate) {
      this.swal.message('Event Date is required.', SweetAlertEnum.warning);
      return;
    }


   // this.objComplainDetails.lstAttachment = this.lstAttachment;
this.objComplainDetails.status=this.objComplainDetails.applicationStatusID;
    this.complainService.saveComplain(this.objComplainDetails).subscribe(
      (res: ResponseMessage) => {
        if (res) {
          this.swal.message('Sponsorship Request Saved Successfully', SweetAlertEnum.success);
        }
      },
      (error) => {
        this.swal.message(error, SweetAlertEnum.error);
      }
    );
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadFile() {
    if (!this.selectedFile) return;

    const reader = new FileReader();
    reader.onload = () => {
      const selectedAttachment = new Attachment();
      selectedAttachment.AttachmentID = 0;
      selectedAttachment.FileFormat = this.getFileExtension(this.selectedFile!.name);
      selectedAttachment.AttachmentName = this.selectedFile!.name;
      selectedAttachment.AttachementTypeID = this.attachmentTypeID;
      selectedAttachment.Description = this.attachmentDescription;
      selectedAttachment.CreatedDate = new Date();

      this.lstAttachment.push(selectedAttachment);
      this.selectedFile = null;
    };
    reader.readAsDataURL(this.selectedFile);
  }

  getTypeNameByID(typeID: number) {
    if (typeID == 1) return 'Image';
    if (typeID == 2) return 'Document';
    if (typeID == 3) return 'Audio';
    if (typeID == 4) return 'Video';
    return '';
  }

  private getFileExtension(fileName: string): string {
    return fileName.split('.').pop() || '';
  }

  removeFile(index: number) {
    this.lstAttachment.splice(index, 1);
  }
}
