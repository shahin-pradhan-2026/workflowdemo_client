import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColDef, GridOptions } from 'ag-grid-community';
import { PermissionEnum } from 'src/app/core/enums/globalEnum';
import { RoutingHelper } from 'src/app/core/helpers/routing-helper';
import { SweetAlertEnum, SweetAlertService } from 'src/app/core/helpers/sweet-alert.service';
import { PageModel } from 'src/app/core/models/core/pageModel';
import { LOCALSTORAGE_KEY } from 'src/app/core/models/localstorage-item';
import { Users } from 'src/app/core/models/settings/users';
import { UserService } from 'src/app/core/services/settings/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})


export class UserListComponent implements OnInit {
  // bread crumb items
  lstUser: Users[] = new Array<Users>();
  lstUserOrig: Users[] = new Array<Users>();
  selectedUser: Users = new Users();
  public pageModel: PageModel;
  hasUserListAddPermission: any;
  loginUserRoleID=0;
  loginUserID=0;
  departmentID=0;
  isAdminLoggedIn: boolean = false;
  private gridApi;
  private gridColumnApi;
  columnDefs = dataColumnDefs;
  gridOptions: GridOptions = {
    pagination: true,
    rowSelection: 'single',
    suppressDragLeaveHidesColumns: true,
    suppressRowDrag: false,
    rowDragManaged: true,
    getRowHeight: (params) => 40,
    defaultColDef: dataDefaultColDef,
  }


  constructor(
    private userService: UserService,
    private swal: SweetAlertService,
    private router: Router
  ) { }

  ngOnInit() {
    debugger;
    this.loginUserRoleID = parseInt(localStorage.getItem("ROLE_ID"));
    this.loginUserID = parseInt(localStorage.getItem("USER_AUTO_ID"));
    this.departmentID = parseInt(localStorage.getItem("DEPARTMENT_ID"));
    this.pageModel = new PageModel();
    let permissionString = localStorage.getItem(LOCALSTORAGE_KEY.PERMISSIONS);
    this.hasUserListAddPermission = permissionString.includes(PermissionEnum[PermissionEnum.userListAddPermission]);
    this.getAll();
    if(this.loginUserRoleID==1 || this.loginUserRoleID==3)
    {
    //  this.isAdminLoggedIn=true;
    }
  }
  getAll() {
    this.userService.getAllByOrganizationID().subscribe(
      (res) => {
        if (res) {
          debugger;
          this.lstUserOrig = Object.assign(this.lstUserOrig, res);
          debugger;
          this.lstUserOrig = [...this.lstUserOrig];
          //this.lstUserOrig=[...this.lstUser];
          this.lstUser=this.lstUserOrig;
          if(this.loginUserRoleID==1)
          {

          }
          else if(this.loginUserRoleID==3)
          {

          }
          else if(this.loginUserRoleID==1012)
          {

          }
          else{
            this.lstUser = this.lstUser.filter(x=>x.departmentID==this.departmentID);
          }
          
          this.lstUser.forEach(x => {
            x.statusStr = x.status == 1 ? 'Active' : 'Inactive';
          })
          this.gridOptions.api.redrawRows();
        }
      }
    );
  }
  addUser() {
    RoutingHelper.navigate2([], ['settings', 'user', 'user-create', 0], this.router);
  }
  editUser() {
    if (this.selectedUser.userAutoID > 0) {
      RoutingHelper.navigate2([], ['settings', 'user', 'user-create', this.selectedUser.userAutoID], this.router);
    }
    else {
      this.swal.message('No user selected', SweetAlertEnum.error);
    }
  }

  viewUser() {

    if (this.selectedUser.userAutoID > 0) {
      RoutingHelper.navigate2([], ['settings', 'user', 'user-create', this.selectedUser.userAutoID], this.router);
    }
    else {
      this.swal.message('No user selected', SweetAlertEnum.error);
    }
  }

  filterToggler() {
    this.pageModel.isActiveFilter = !this.pageModel.isActiveFilter;
  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    let nodes = this.gridApi.getRenderedNodes();
    if (nodes.length) {
      nodes[0].setSelected(true); //selects the first row in the rendered view
    }
  }
  onSelect() {
    const selectedRows = this.gridApi.getSelectedRows();
    if (selectedRows && selectedRows.length == 1) {
      this.selectedUser = selectedRows[0];
    }
    else {
      this.selectedUser = new Users();
    }
  }
  onChangeColName(colDef: ColDef) {
    const columns = this.gridOptions.columnApi.getAllColumns();
    const valueColumn = columns.filter(column => column.getColDef().headerName === colDef.headerName)[0];
    const newState = !valueColumn.isVisible();
    this.gridOptions.columnApi.setColumnVisible(valueColumn, newState);
    this.gridOptions.api.sizeColumnsToFit();
  }
  onBtnExport() {
    this.gridApi.exportDataAsCsv();
  }
}

const dataDefaultColDef: ColDef = {
  // flex: 1,
  // width: 300,
  resizable: true,
  sortable: true,
  suppressMovable: false,
  filter: true,
  cellClass: 'suppress-movable-col',
  // floatingFilter: true,
};
const dataColumnDefs = [
  { isVisible: true, field: 'slNo', headerName: 'SL', lockPosition: true, pinned: 'left', suppressMovable: true, valueGetter: "node.rowIndex + 1", resizable: false, width: 80 },
  { isVisible: true, field: "userID", headerName: 'User ID', lockPosition: true, pinned: 'left', suppressMovable: false, width: 150 },
  // { isVisible: true, field: "userCode", headerName: 'BP Number', lockPosition: true, pinned: 'left', suppressMovable: false, width: 150 },
  { isVisible: true, field: "userFullName", headerName: 'Full Name', lockPosition: true, pinned: 'left', width: 250 },
  { isVisible: true, field: "departmentName", headerName: 'Department', width: 300 },
  { isVisible: true, field: "userRoleName", headerName: 'User Level' },
  // { isVisible: true, field: "designationName", headerName: 'Designation' },
  { isVisible: true, field: "userFullNameBangla", headerName: 'Full Name (বাংলা)', },
  { isVisible: true, field: "statusStr", headerName: 'Status', },
  // { isVisible: true, field: "mobileNo", headerName: 'Mobile No' },
];

