import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColDef, GridApi, GridOptions, GridReadyEvent, RowNode } from 'ag-grid-community';
import { Observable, throwError } from 'rxjs';
import { RoutingHelper } from 'src/app/core/helpers/routing-helper';
import { SweetAlertEnum, SweetAlertService } from 'src/app/core/helpers/sweet-alert.service';
import { PageModel } from 'src/app/core/models/core/pageModel';
import { Department } from 'src/app/core/models/settings/department';
import { Designation } from 'src/app/core/models/settings/designation';
import { DepartmentService } from 'src/app/core/services/settings/department.service';
import { DesignationService } from 'src/app/core/services/settings/designation.service';

@Component({
  selector: 'app-designations',
  templateUrl: './designations.component.html',
  styleUrls: ['./designations.component.scss']
})
export class DesignationsComponent implements OnInit {

  @ViewChild("modalDesignation") modalDesignation: TemplateRef<any>;
  lstDepartment: Department[] = new Array<Department>();
  lstDesignation: Designation[] = new Array<Designation>();
  selectedDesignation: Designation = new Designation();
  public pageModel: PageModel;

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
    private designationService: DesignationService,
    private departmentService: DepartmentService,
    private swal: SweetAlertService,
    private router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.pageModel = new PageModel();
    this.getAllDepartments();
  }

  getAll() {
    this.designationService.getAll().subscribe(
      (res) => {
        if (res) {
          this.lstDesignation = Object.assign(this.lstDesignation, res);
          this.lstDesignation = [...this.lstDesignation];
          this.gridOptions.api.redrawRows();
        }
      }
    )
  }
  getAllDepartments() {
    this.departmentService.getAll().subscribe(
      (res) => {
        if (res) {
          this.lstDepartment = Object.assign(this.lstDepartment, res);
          this.lstDepartment = [...this.lstDepartment];
          this.getAll();
        }
      }
    )
  }
  addDesignation() {
    this.selectedDesignation = new Designation();
    this.modalService.open(this.modalDesignation, { size: 'md', backdrop: 'static' });

  }
  modalClose() {
    this.modalService.dismissAll(this.modalDesignation);
  }



  async saveDesignation() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      this.designationService.save(this.selectedDesignation).subscribe(
        (res: Designation) => {
          if (res && res.designationID > 0) {
            this.swal.message('Data Updated Successfully', SweetAlertEnum.success);
            this.modalClose();
            this.getAll();
          }
        },
        (error) => {
          this.swal.message(error, SweetAlertEnum.error);
        })
    }
  }


  editDesignation() {
    this.modalService.open(this.modalDesignation, { size: 'md' });
  }

    async deleteDesignation() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      this.designationService.delete(this.selectedDesignation.designationID).subscribe(
        (res) => {
          if (res) {
            this.swal.message('Data deleted Successful', SweetAlertEnum.success);
            this.getAll();
          }
        }
      );
    }
  }

  // async deleteDesignation() {
  //  alert(this.selectedDesignation.designationID);
  //   if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
  //     if (this.selectedDesignation.isActive == false) {
  //       this.designationService.delete(this.selectedDesignation.designationID).subscribe(
  //         (res) => {
  //           if (res) {
  //             this.swal.message('Data Deleted Successfully', SweetAlertEnum.success);
  //             this.getAll();
  //           }

  //         },
  //         (error) => {
  //           this.swal.message(error, SweetAlertEnum.error);
  //         })

  //     } else {
  //       this.swal.message('You canot delete this data', SweetAlertEnum.error);
  //     }
  //   }

  // }

  async updateDesignation() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      this.designationService.update(this.selectedDesignation).subscribe(
        (res: Designation) => {
          if (res && res.designationID > 0) {
            this.swal.message('Data Updated Successfully', SweetAlertEnum.success);
            this.modalClose();
            this.getAll();
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
      this.selectedDesignation = selectedRows[0];
    }
    else {
      this.selectedDesignation = new Designation();
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
  { isVisible: true, field: "designationName", headerName: 'Rank Name', width: 300 },
  { isVisible: true, field: "designationNameBangla", headerName: 'Rank Name (বাংলা)',width: 300 },
  // { isVisible: true, field: "departmentName", headerName: 'Department Name', width: 300},
  { isVisible: true, field: "orderNo", headerName: 'Order', width: 100 },
  // { isVisible: true, field: "isActive", headerName: 'Status', width: 100 }

    {
    field: 'isActive',
    headerName: 'Status',
    // params.value is expected to be boolean
    cellRenderer: (params: any) => {
      const active = !!params.value;
      return `<span class=" ${active ? 'badge bg-success' : 'badge bg-danger'}">
              ${active ? '<i class="fa fa-check"></i>' : '<i class="fa fa-times"></i>'}
                ${active ? 'Active' : 'Inactive'}
              </span>`;
    },
    sortable: true,
    filter: true,
    cellStyle: { textAlign: 'center' },
  }

];
