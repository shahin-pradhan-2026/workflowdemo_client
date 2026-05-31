import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ColDef, GridOptions } from 'ag-grid-community';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { QueryObject } from 'src/app/core/models/core/queryObject';
import { SweetAlertEnum, SweetAlertService } from 'src/app/core/helpers/sweet-alert.service';
import { ComplainService } from 'src/app/core/services/complain/complain.service';
import { ResponseMessage } from 'src/app/core/models/responseMessage';
import { RoutingHelper } from 'src/app/core/helpers/routing-helper';
import { pimsProfile } from 'src/app/core/models/complain/pimsProfile';
import { ComplainDetails } from 'src/app/core/models/complain/complain';
import { ReturnStatus } from 'src/app/core/enums/globalEnum';
import { Categories } from 'src/app/core/models/settings/categories';
import { ComplainCategoryService } from 'src/app/core/services/complain/complain-category.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LOCALSTORAGE_KEY } from 'src/app/core/models/localstorage-item';
declare var $: any;
@Component({
  selector: 'app-complain-list',
  templateUrl: './complain-list.component.html',
  styleUrls: ['./complain-list.component.css']
})
export class ComplainListComponent implements OnInit {
  labelPageTitle: string = "Complain List";
  // bread crumb items
  queryObject: QueryObject = new QueryObject();
  objPimsProfile: pimsProfile = new pimsProfile();

  reactiveFormSearchComplain: FormGroup;
  currentUserRoleId: number = 0;
  bpNumber: string = '';
  objComplainDetails: ComplainDetails = new ComplainDetails();
  selectedComplainDetails: ComplainDetails = new ComplainDetails();
  lstComplainDetails: ComplainDetails[] = new Array<ComplainDetails>();
  lstCategories: Categories[] = new Array<Categories>();
  lstCrimeMainCategory: any;
  lstCrimeSubCategory: any;

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
    private fb: FormBuilder,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private complainService: ComplainService,
    private swal: SweetAlertService,
    private router: Router,
    private complainCategoryService: ComplainCategoryService,

  ) {

  }

  ngOnInit() {
    this.getAllComplain();

    this.initReactiveForm();
        // Read role ID from localStorage
    const roleId = localStorage.getItem(LOCALSTORAGE_KEY.ROLE_ID);
    this.currentUserRoleId = roleId ? Number(roleId) : 0;

  }

  // getAllComplain() {
  //   this.complainService.getAllComplain().subscribe((response: ResponseMessage) => {
  //     if (response.statusCode == ReturnStatus.Success) {
  //       this.lstComplainDetails = response.responseObj;
  //       this.objPimsProfile = this.objComplainDetails.pimsProfile;
  //     } else {
  //       this.swal.message(response.message, SweetAlertEnum.error);
  //     }
  //   });
  // }


  getAllComplain() {
  this.complainService.getAllComplain().subscribe((response: ResponseMessage) => {
    if (response.statusCode == ReturnStatus.Success) {
      let allData = response.responseObj as ComplainDetails[];
debugger;
      // 🔹 Role-based filtering
      if (this.currentUserRoleId === 13) {
        // Requestor → only see ApplicationStatusID = 1
        this.lstComplainDetails = allData.filter(x => x.status === 1);
      }
      else if (this.currentUserRoleId === 11) {
        // Manager → only see ApplicationStatusID = 2
        this.lstComplainDetails = allData.filter(x => x.status === 2);
      }
      else if (this.currentUserRoleId === 4) {
        // Finance Admin → only see ApplicationStatusID = 3
        this.lstComplainDetails = allData.filter(x => x.status === 3);
      }
      else {
        // Other roles → show records with ApplicationStatusID = 1 or 3
        this.lstComplainDetails = allData.filter(x => [1, 3].includes(x.status));
      }

      // Keep profile reference if needed
      if (this.lstComplainDetails.length) {
        this.objPimsProfile = this.lstComplainDetails[0].pimsProfile;
      }
    } else {
      this.swal.message(response.message, SweetAlertEnum.error);
    }
  });
}

  initReactiveForm() {
    this.reactiveFormSearchComplain = this.fb.group({
      fromDate: [null],
      toDate: [null],
      complainID: [''],
      bpNumber: [''],
      recordDate: [null],
      agentName: [''],
      complainCategoryID: [null]
    });
  }

  // use reactive form values to call backend filter endpoint
  searchComplain() {
    debugger
    const vmComplain = {
      fromDate: this.reactiveFormSearchComplain.value.fromDate || null,
      toDate: this.reactiveFormSearchComplain.value.toDate || null,
      complainID: this.reactiveFormSearchComplain.value.complainID || '',
      bpNumber: this.reactiveFormSearchComplain.value.bpNumber || '',
      recordDate: this.reactiveFormSearchComplain.value.recordDate || null,
      agentName: this.reactiveFormSearchComplain.value.agentName || '',
      complainCategoryID: this.reactiveFormSearchComplain.value.complainCategoryID || null
    };

    this.complainService.getComplainListByFilter(vmComplain).subscribe(
      (res: ResponseMessage) => {
        if (res && res.statusCode === 1 && res.responseObj) {
          this.lstComplainDetails = Array.isArray(res.responseObj) ? res.responseObj : [];
        } else {
          this.lstComplainDetails = [];
        }
      },
      (err) => {
        // console.error('Filter error', err);
      }
    );
  }


  // Grid ready
  onGridReady(params: any): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    setTimeout(() => {
      const nodes = this.gridApi.getRenderedNodes();
      if (nodes.length) nodes[0].setSelected(true);
    }, 200);
  }

  addNewComplain() {
    // this.router.navigate(['pioms/complain/complain-register']);
    RoutingHelper.navigate2([], ['complain', 'complain-register', 0], this.router);
  }
  editComplain() {
    if (this.selectedComplainDetails && this.selectedComplainDetails.complainID) {
      RoutingHelper.navigate2([], ['complain', 'complain-register', this.selectedComplainDetails.complainID], this.router);
    }
    else {
      this.swal.message('Please select a complain to edit.', SweetAlertEnum.info);
    }
  }
  changeSubCategory() { }

  onSelect() {

    // this.selectedComplain = new ComplainList();
    const selectedRows = this.gridApi.getSelectedRows();
    if (selectedRows && selectedRows.length == 1) {
      this.selectedComplainDetails = selectedRows[0];
    }
    else {
      // this.selectedComplain = new ComplainList();
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
  resizable: true,
  sortable: true,
  suppressMovable: false,
  filter: true,
  cellClass: 'suppress-movable-col',
};
const dataColumnDefs = [
  { isVisible: true, field: 'slNo', headerName: 'SL', lockPosition: true, pinned: 'left', suppressMovable: true, valueGetter: "node.rowIndex + 1", resizable: false, width: 80 },
  { isVisible: true, field: "userFullName", headerName: 'Name', },
  {
    isVisible: true, field: "recordDate", headerName: 'Applied Date',
    valueFormatter: function (params) {
      // Format the date using 'dd-MM-yyyy hh:mm a' format
      const options: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      };

      const formattedDate = new Date(params.value).toLocaleString('en-US', options);
      const datePart = formattedDate.split(',')[0];
      const timePart = formattedDate.split(',')[1].trim();

      return `${datePart}, ${timePart}`;
    },
  },
 { isVisible: true, field: "requestedAmount", headerName: 'Amount' },
  { isVisible: true, field: "statusName", headerName: 'Current Status' }

];


