import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColDef, GridOptions } from 'ag-grid-community';
import { SweetAlertEnum, SweetAlertService } from 'src/app/core/helpers/sweet-alert.service';
import { PageModel } from 'src/app/core/models/core/pageModel';
import { Department } from 'src/app/core/models/settings/department';
import { DPZ } from 'src/app/core/models/settings/dpz';
import { UserDPZMap } from 'src/app/core/models/settings/userDpzMap';
import { Users } from 'src/app/core/models/settings/users';
import { DepartmentService } from 'src/app/core/services/settings/department.service';
import { DPZService } from 'src/app/core/services/settings/dpz.service';
import { UserDpzMapService } from 'src/app/core/services/settings/user-dpz-map.service';
import { UserService } from 'src/app/core/services/settings/user.service';

@Component({
  selector: 'app-user-dpz-map',
  templateUrl: './user-dpz-map.component.html',
  styleUrls: ['./user-dpz-map.component.scss']
})
export class UserDpzMapComponent implements OnInit {

  selectedUserDpzMap: UserDPZMap = new UserDPZMap();
  onSelectUserDpzMap: UserDPZMap = new UserDPZMap();


  lstUserDpzMap: UserDPZMap[] = new Array<UserDPZMap>();
  lstUser: Users[] = new Array<Users>();
  lstDpz: DPZ[] = new Array<DPZ>();
  lstDepartment: Department[] = new Array<Department>();
  selectedUser: Users = new Users();
  selectedDPZ: DPZ = new DPZ();
  public pageModel: PageModel;
  selectedDepartmentID : number;

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
    private userDpzMapService: UserDpzMapService,
    private departmentService : DepartmentService,
    private userService: UserService,
    private dpzService: DPZService,
    private swal: SweetAlertService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.pageModel = new PageModel();
    this.getAllDepartment();
    this.getAllDpz();
    this.getAllUserDpzMap();
  }
  getAllDepartment() {
    let orgID = parseInt(localStorage.getItem('ORGANIZATION_ID'));
    this.departmentService.getListByOrganizationID(orgID).subscribe(
      (res: DPZ) => {
        if (res) {
          this.lstDepartment = Object.assign(this.lstDepartment, res);
          this.lstDepartment = [...this.lstDepartment];
        }
      }
    );
  }
  getAllDpz() {
    this.dpzService.getAll().subscribe(
      (res: DPZ) => {
        if (res) {
          this.lstDpz = Object.assign(this.lstDpz, res);
          this.lstDpz = [...this.lstDpz];
        }
      }
    );
  }
  getAllByDepartmentID() {
    this.lstUser = [];
    // let orgID = parseInt(localStorage.getItem('ORGANIZATION_ID'));
    this.userService.getAllByDepartmentID(this.selectedDepartmentID).subscribe(
      (res: Users) => {
        if (res) {
          this.lstUser = Object.assign(this.lstUser, res);
          this.lstUser = [...this.lstUser];
        }
      }
    );
  }


  getAllUserDpzMap() {
    this.lstUserDpzMap = [];
    this.userDpzMapService.getAll().subscribe(
      (res: UserDPZMap) => {
        if (res) {
          this.lstUserDpzMap = Object.assign(this.lstUserDpzMap, res);
          this.lstUserDpzMap = [...this.lstUserDpzMap];
        }
      }
    );
  }


  onChangeUser() {
    this.selectedUser = this.lstUser.find(x => x.userAutoID == this.selectedUserDpzMap.userID);
    this.selectedUser.userImagePreview = "data:image/png;base64," + this.selectedUser.userImage;
  }
  onChangeDPZ() {
    this.selectedDPZ = this.lstDpz.find(x => x.dpzid == this.selectedUserDpzMap.dpzid);
  }


  async Save() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      this.userDpzMapService.save(this.selectedUserDpzMap).subscribe(
        (res: UserDPZMap) => {
          if (res) {
            if (res) {
              this.swal.message('Data Save Successfully', SweetAlertEnum.success);
              this.getAllUserDpzMap();
            }
          }
        },
        (error) => {
          this.swal.message(error, SweetAlertEnum.error);
        })
    }
  }

  editUserDpzMap() {
    this.selectedUserDpzMap = this.onSelectUserDpzMap;
  }

  async update() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      this.userDpzMapService.update(this.selectedUserDpzMap).subscribe(
        (res: UserDPZMap) => {
          if (res) {
            if (res) {
              this.swal.message('Data Updated Successfully', SweetAlertEnum.success);
              this.getAllUserDpzMap();
            }
          }
        },
        (error) => {
          this.swal.message(error, SweetAlertEnum.error);
        })
    }
  }

  reset() {
    this.selectedUserDpzMap = new UserDPZMap();
  }

  async deleteMap() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      this.userDpzMapService.delete(this.onSelectUserDpzMap.userDPZMapID).subscribe(
        (res) => {
          if (res) {
            if (res) {
              this.swal.message('Data Deleted Successfully', SweetAlertEnum.success);
              this.getAllUserDpzMap();
            }
          }
        },
        (error) => {
          this.swal.message(error, SweetAlertEnum.error);
        })
    }
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
      this.onSelectUserDpzMap = selectedRows[0];
    }
    else {
      this.onSelectUserDpzMap = new UserDPZMap();
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
  { isVisible: true, field: "userName", headerName: 'User Name', },
  { isVisible: true, field: "dpzName", headerName: 'DPZ Name' },
  {
    headerName: 'From Date', field: 'fromDate',
    cellRenderer: (data) => {
      return data.value ? (new Date(data.value)).toUTCString() : '-';
    }
  },
  {
    headerName: 'To Date', field: 'toDate',
    cellRenderer: (data) => {
      return data.value ? (new Date(data.value)).toUTCString() : '-';
    }
  },
  { isVisible: true, field: "isActive", headerName: 'Status' },
];
