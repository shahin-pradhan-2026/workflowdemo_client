import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PermissionEnum, ReturnStatus } from 'src/app/core/enums/globalEnum';
import { RoutingHelper } from 'src/app/core/helpers/routing-helper';
import { SweetAlertEnum, SweetAlertService } from 'src/app/core/helpers/sweet-alert.service';
import { Organization } from 'src/app/core/models/data/organization';
import { LOCALSTORAGE_KEY } from 'src/app/core/models/localstorage-item';
import { ResponseMessage } from 'src/app/core/models/responseMessage';
import { Department } from 'src/app/core/models/settings/department';
import { Designation } from 'src/app/core/models/settings/designation';
import { UserRole } from 'src/app/core/models/settings/userRole';
import { Users } from 'src/app/core/models/settings/users';
import { UserService } from 'src/app/core/services/settings/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})


export class UserCreateComponent implements OnInit {
  // bread crumb items
  private routeSub: Subscription;

  public objUser: Users = new Users();
  public imageURL: string;
  lstOrganization: Organization[] = new Array<Organization>();
  lstUserRole: UserRole[] = new Array<UserRole>();
  lstUserOriginalRole: UserRole[] = new Array<UserRole>();
  lstDesignation: Designation[] = new Array<Designation>();
  lstDepartment: Department[] = new Array<Department>();
  lstDepartmentOriginal: Department[] = new Array<Department>();
  imageFile: File = null;
  loginUserRoleID = 0;
  departmentID=0;
  organizationID=0;
  departmentByChangeeventID=0;
  parentUserRoleId=0;
  hasUserListAddPermission : any;
  hasUserUpdatePermission : false;
  hasUserListDeletePermission : any;

  lstParentUser: Users[] = new Array<Users>();
  lstOriginalUser: Users[] = new Array<Users>();
  constructor(
    public userService: UserService,
    private route: ActivatedRoute,
    private swal: SweetAlertService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginUserRoleID = parseInt(localStorage.getItem("ROLE_ID"));
    this.departmentID=parseInt(localStorage.getItem("DEPARTMENT_ID"));
    this.organizationID=parseInt(localStorage.getItem("ORGANIZATION_ID"));
    let permissionString = localStorage.getItem(LOCALSTORAGE_KEY.PERMISSIONS);
   // this.hasUserListAddPermission = permissionString.includes(PermissionEnum[PermissionEnum.userListAddPermission]);
    this.hasUserListDeletePermission = permissionString.includes(PermissionEnum[PermissionEnum.userListDeletePermission]);
    this.getInitialData();
    this.objUser.departmentID=0;
    this.objUser.userRoleID=0;
    this.objUser.status=0;
    this.routeSub = this.route.params.subscribe(params => {
      const userAutoID = parseInt(params['userID']);
      if (userAutoID) {
        this.objUser.userAutoID = userAutoID;
        
        this.getByID(userAutoID);
        
      }
 
    });
  
  }

  onUserDepartmentChange(newValue: any) {
    debugger; 
this.objUser.organizationID=this.organizationID;
this.departmentByChangeeventID=newValue;
    // let loginUserRole =  this.lstUserOriginalRole.find(x=>x.userRoleID == newValue);
    // this.lstUserOriginalRole = this.lstUserOriginalRole.filter(x => x.orderNo >= loginUserRole.orderNo-1);

    //   this.lstUserOriginalRole = this.lstUserOriginalRole.filter(x => x.orderNo >= loginUserRole.orderNo - 1);

    //   if (this.lstUserOriginalRole.length > 0) {
    //     this.parentUserRoleId = this.lstUserOriginalRole[0].userRoleID;
    //   } 
    //   else {

    //     this.parentUserRoleId = null; // or any default value you want
    //   }
    //   debugger;
    //   this.lstParentUser=this.lstParentUser.filter(x=>x.userRoleID==this.parentUserRoleId);


    //   this.lstParentUser = this.lstParentUser.filter(x => x.userRoleID == this.parentUserRoleId);

    //   const firstOrDefaultItem = this.lstParentUser.find(x => true);
    //   this.lstParentUser = firstOrDefaultItem ? [firstOrDefaultItem] : [];

//       this.objUser.organizationID=this.lstParentUser[0].organizationID;
      this.objUser.designationID=this.lstParentUser[0].designationID;


  }


  onUserRoleChange(newValue: any) {
debugger;
    let currentIndex = this.lstUserOriginalRole.findIndex(x => x.userRoleID == newValue);

    if (currentIndex !== -1 && currentIndex > 0) {
        // If the element is found and it's not the first element in the array
        let previousIndex = currentIndex - 1;
        let previousElement = this.lstUserOriginalRole[previousIndex];

        debugger;
      this.lstParentUser=this.lstOriginalUser;
        this.lstParentUser = this.lstParentUser.filter(x => {
 
          return x.departmentID == this.departmentByChangeeventID && x.userRoleID == previousElement.userRoleID;
      });
      
    } else {

    }
  }
  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
  getInitialData() {
    this.userService.getInitialData().subscribe((res: ResponseMessage) => {
      if (res) {
        debugger;
        this.lstOrganization = res.responseObj.lstOrganization;
        this.lstUserRole = res.responseObj.lstUserRole;
        this.lstUserOriginalRole=res.responseObj.lstUserRole;
      
        this.lstDepartment = res.responseObj.lstDepartment;
        //if LoggedIn User Role 4
        this.lstDepartmentOriginal=res.responseObj.lstDepartment;
        this.lstDepartment=this.lstDepartmentOriginal;
        if(this.loginUserRoleID==4) // Logged in DC
        {
         this.lstDepartment=this.lstDepartment.filter(x=>x.departmentID==this.departmentID);
        }
      
        this.objUser.passwordExpiryDate = this.objUser.passwordExpiryDate;
      
        this.lstDesignation = res.responseObj.lstDesignation;
        this.lstParentUser=res.responseObj.lstUser;
        this.lstOriginalUser=res.responseObj.lstUser;
       // this.objUser.departmentID=this.loginUserRoleID ;
       debugger;
        if (this.loginUserRoleID >= 1) {
          let loginUserRole =  this.lstUserRole.find(x=>x.userRoleID == this.loginUserRoleID);
          this.lstUserRole = this.lstUserRole.filter(x => x.orderNo >= loginUserRole.orderNo+1);
        }
      }
    })

  }
  getByID(userID: number) 
  {
    debugger
    this.userService.getByID(userID).subscribe((res: Users) => {
      if (res && res.userAutoID > 0) {
       debugger;
        this.objUser = res;
        this.objUser.userImagePreview = "data:image/png;base64," + this.objUser.userImage;
        this.objUser.signaturePreview = "data:image/png;base64," + this.objUser.signature;
        this.objUser.userRoleID =  this.objUser.userRoleID;
        debugger;
       // this.objUser.passwordExpiryDate = this.objUser.passwordExpiryDate;
      }
    })
    
  }

  onChangeImage(fileInput: any, type: number) {
    this.imageFile = <File>fileInput.target.files[0];
    var mimeType = this.imageFile.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    var reader = new FileReader();
    reader.readAsDataURL(this.imageFile);
    if (type == 1) {
      reader.onload = (_event) => {
        this.objUser.userImagePreview = reader.result;
        var sign = this.objUser.userImagePreview.split(',', 1) + ',';
        this.objUser.userImage = this.objUser.userImagePreview.replace(sign, '');
      }
    }
    if (type == 2) {
      reader.onload = (_event) => {
        this.objUser.signaturePreview = reader.result;
        var sign = this.objUser.signaturePreview.split(',', 1) + ',';
        this.objUser.signature = this.objUser.signaturePreview.replace(sign, '');
      }
    }
  }


  async saveUser() {
    debugger;
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) 
    {
      
          if (this.objUser.departmentID == 0 || this.objUser.departmentID == undefined) {
         Swal.fire({
           position: 'top-end',
           icon: 'warning',
           title: 'Depertment is required',
           showConfirmButton: true,
           timer: 2500
         })
       }
       
     else if (this.objUser.userRoleID == 0 || this.objUser.userRoleID == undefined) {
        Swal.fire({
          position: 'top-end',
          icon: 'warning',
          title: 'User level is required',
          showConfirmButton: true,
          timer: 2500
        })
      } 
      else if (this.objUser.userID == "" || this.objUser.userID == null) {
        Swal.fire({
          position: 'top-end',
          icon: 'warning',
          title: 'User ID is required',
          showConfirmButton: true,
          timer: 2500
        })
      }
      else if (this.objUser.password == "" || this.objUser.password == null) {
        Swal.fire({
          position: 'top-end',
          icon: 'warning',
          title: 'Password is required',
          showConfirmButton: true,
          timer: 2500
        })
      }
      else if (this.objUser.passwordExpiryDate == "" || this.objUser.passwordExpiryDate == null) {
        Swal.fire({
          position: 'top-end',
          icon: 'warning',
          title: 'Password expiry date is required',
          showConfirmButton: true,
          timer: 2500
        })
      }
      else if (this.objUser.userFullName == "" || this.objUser.userFullName == null) {
        Swal.fire({
          position: 'top-end',
          icon: 'warning',
          title: 'User Full Name is required',
          showConfirmButton: true,
          timer: 2500
        })
      }
      else
      {
        this.userService.saveUser(this.objUser).subscribe(
          (res: Users) => {
            if (res && res.userAutoID > 0) {
              this.swal.message('Data Updated Successfully', SweetAlertEnum.success);
              RoutingHelper.navigate2([], ['settings', 'user', 'user-list'], this.router);
            }
          },
          (error) => {
            this.swal.message(error, SweetAlertEnum.error);
          })
      }

    }

  }
  async updateUser() {
    debugger;

    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      debugger;
      if (this.objUser.userRoleID == 0 || this.objUser.userRoleID  == undefined) {
        Swal.fire({
          position: 'top-end',
          icon: 'warning',
          title: 'User level is required',
          showConfirmButton: true,
          timer: 2500
        })
      }
      else
      {
        if (this.objUser.userAutoID && this.objUser.userAutoID > 0) 
        {
          debugger;
          this.objUser.passwordExpiryDate=this.objUser.passwordExpiryDate;
          this.userService.updateUser(this.objUser).subscribe(
            (res: Users) => {
              if (res && res.userAutoID > 0) {
                this.swal.message('Data Updated Successfully', SweetAlertEnum.success);
                RoutingHelper.navigate2([], ['settings', 'user', 'user-list'], this.router);
              }
            },
            (error) => {
              this.swal.message(error, SweetAlertEnum.error);
            })
        }
      }

    }
  }
  async deleteUser() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      if (this.objUser.userAutoID && this.objUser.userAutoID > 0) {
        this.userService.deleteUser(this.objUser.userAutoID).subscribe((res: Users) => {
          this.swal.message('Deleted Successfully', SweetAlertEnum.success);
          RoutingHelper.navigate2([], ['settings', 'user', 'user-list'], this.router);
        })
      }
    }
  }
  async removeImage() {
    if (await this.swal.confirm_custom('Are you sure to remove image?', SweetAlertEnum.question, true, false)) {
      this.objUser.userImage = null;
      this.objUser.userImagePreview = null;
    }
  }
  async removeSignature() {
    if (await this.swal.confirm_custom('Are you sure to remove Signature?', SweetAlertEnum.question, true, false)) {
      this.objUser.signature = null;
      this.objUser.signaturePreview = "data:image/png;base64," + this.objUser.signature;
    }
  }


  async goToList() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      RoutingHelper.navigate2([], ['settings', 'user', 'user-list'], this.router);
    }
  }
}

