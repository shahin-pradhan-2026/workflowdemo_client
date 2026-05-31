import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Routes, RouterModule } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColDef, GridOptions, Module, RowDragEndEvent } from 'ag-grid-community';
import { RoutingHelper } from 'src/app/core/helpers/routing-helper';
import { SweetAlertEnum, SweetAlertService } from 'src/app/core/helpers/sweet-alert.service';
import { UserRole } from 'src/app/core/models/settings/userRole';
import { UserRoleService } from 'src/app/core/services/settings/user-role.service';

// declare var $: any
@Component({
  selector: 'app-user-role',
  templateUrl: './user-role.component.html',
  styleUrls: ['./user-role.component.scss']
})


export class UserRoleComponent implements OnInit {
  lstUserRole: UserRole[] = new Array<UserRole>();
  selectedUserRole: UserRole = new UserRole();


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
    rowDragEntireRow: true,
    rowDragMultiRow: true,
    animateRows: true,
  }


  constructor(
    private userRoleService: UserRoleService,
    private swal: SweetAlertService,
    private router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.userRoleService.getAll().subscribe(
      (res) => {
        if (res) {
          this.lstUserRole = Object.assign(this.lstUserRole, res);
          this.lstUserRole = [...this.lstUserRole];
          this.gridOptions.api.redrawRows();
        }
      }
    );
  }
  closeResult = '';
  addUserRole(content) {
    this.selectedUserRole = new UserRole();
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', backdrop: 'static' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
    );
  }
  // private getDismissReason(reason: any): string {
  // 	if (reason === ModalDismissReasons.ESC) {
  // 		return 'by pressing ESC';
  // 	} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  // 		return 'by clicking on a backdrop';
  // 	} else {
  // 		return `with: ${reason}`;
  // 	}
  // }

  modalClose() {
    this.modalService.dismissAll();
  }
  async saveUserRole() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      if (this.selectedUserRole.userRoleID > 0) {
        this.userRoleService.updateUserRole(this.selectedUserRole).subscribe(
          (res) => {
            if (res) {
              this.modalClose();
              this.getAll();
              this.swal.message('Data Updated Successfully', SweetAlertEnum.success);
            }
          }
        );
      }
      else {
        this.userRoleService.saveUserRole(this.selectedUserRole).subscribe(
          (res) => {
            if (res) {
              this.modalClose();
              this.getAll();
              this.swal.message('Data Saved Successfully', SweetAlertEnum.success);
            }
          }
        );
      }
    }
  }

  async editUserRole(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
    );

  }

  async deleteUserRole() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      this.userRoleService.deleteUserRole(this.selectedUserRole.userRoleID).subscribe(
        (res) => {
          if (res) {
            this.lstUserRole = this.lstUserRole.filter(x => x.userRoleID != this.selectedUserRole.userRoleID);
            this.gridOptions.api.redrawRows();
            this.swal.message('User Role Deleted', SweetAlertEnum.success);
          }
        }
      );
    }
  }
  async updateOrder() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      let dataLength = this.lstUserRole.length;
      for (let i = 0; i < dataLength; i++) {
        let row = this.gridApi.getDisplayedRowAtIndex(i);
        let dbData = this.lstUserRole.find(x => x.userRoleID == row.data.userRoleID);
        dbData.orderNo = i + 1;
      }
      this.userRoleService.updateOrder(this.lstUserRole).subscribe(
        (res) => {
          if (res) {
            this.gridOptions.api.redrawRows();
            this.swal.message('Order Updated', SweetAlertEnum.success);
          }
        }
      );
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
      this.selectedUserRole = selectedRows[0];
    }
    else {
      this.selectedUserRole = new UserRole();
    }
  }
}


const dataDefaultColDef: ColDef = {
  // flex: 1,
  // width: 300,
  // resizable: true,
  sortable: true,
  // suppressMovable: true,
  filter: true,
  // cellClass: 'suppress-movable-col',
  // floatingFilter: true, suppressRowDrag
};
const dataColumnDefs = [
  { field: 'slNo', headerName: 'SL', lockPosition: true, pinned: 'left', valueGetter: "node.rowIndex + 1", resizable: false, width: 80 },
  { field: "userRoleName", headerName: 'User Role', },
  { field: "isActive", headerName: 'Is Active' },
  { field: "orderNo", headerName: 'Order' },
];

