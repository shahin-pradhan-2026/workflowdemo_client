import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColDef, GridApi, GridOptions, GridReadyEvent, RowNode } from 'ag-grid-community';
import { SweetAlertEnum, SweetAlertService } from 'src/app/core/helpers/sweet-alert.service';
import { PageModel } from 'src/app/core/models/core/pageModel';
import { DivisionService } from 'src/app/core/services/settings/division.service';
import { CategoriesService } from 'src/app/core/services/settings/categories.service';
import { QueryObject } from 'src/app/core/models/core/queryObject';
import { Categories } from 'src/app/core/models/settings/categories';
import { ResponseMessage } from 'src/app/core/models/responseMessage';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {


  @ViewChild("modalCategories") modalCategories: TemplateRef<any>;
  // lstDivisionMaster: Division[] = new Array<Division>();
  objCategories: Categories = new Categories();
  lstCategories: Categories[] = new Array<Categories>();
  selectedCategories: Categories = new Categories();
  reactiveFormCategories = new FormGroup({});
  public pageModel: PageModel;
  queryObject: QueryObject = new QueryObject();

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
    private categoriesService: CategoriesService,
    private swal: SweetAlertService,
    private modalService: NgbModal
  ) {
    this.reactiveFormCategories = new FormGroup({
      categoriesName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      categoriesNameBangla: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      isActive: new FormControl(''),

    })
  }

  ngOnInit() {
    this.pageModel = new PageModel();
    this.getAllCategory();
  }

  getAllCategory() {

    this.categoriesService.getAll().subscribe(
      (res: ResponseMessage) => {
        if (res) {
          this.lstCategories = res.responseObj;
          this.gridOptions.api.redrawRows();
        }
      }
    )
  }
  add() {
    this.objCategories = new Categories();
    this.modalService.open(this.modalCategories, { size: 'md', backdrop: 'static' });
  }
  modalClose() {
    this.modalService.dismissAll(this.modalCategories);
  }

  async save() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      this.categoriesService.save(this.objCategories).subscribe(
        (res: Categories) => {
          if (res) {
            this.swal.message('Data Save Successful', SweetAlertEnum.success);
            this.modalClose();
            this.getAllCategory();
          }
        },
        (error) => {
          this.swal.message(error, SweetAlertEnum.error);
        })
    }
  }
  edit() {
    this.objCategories = Object.assign(this.selectedCategories);
    this.modalService.open(this.modalCategories, { size: 'md', backdrop: 'static' });
  }

  async update() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      this.categoriesService.update(this.selectedCategories).subscribe(
        (res: Categories) => {
          if (res && res.complainCategoryID > 0) {
            this.swal.message('Data Updated Successful', SweetAlertEnum.success);
            this.modalClose();
            this.getAllCategory();
          }
        },
        (error) => {
          this.swal.message(error, SweetAlertEnum.error);
        })
    }
  }
  async remove() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      this.categoriesService.delete(this.selectedCategories.complainCategoryID).subscribe(
        (res) => {
          if (res) {
            this.swal.message('Data deleted Successful', SweetAlertEnum.success);
            this.getAllCategory();
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
      nodes[0].setSelected(true);
    }
  }
  onSelect() {
    debugger
    const selectedRows = this.gridApi.getSelectedRows();
    if (selectedRows && selectedRows.length == 1) {
      this.selectedCategories = selectedRows[0];
    }
    else {
      this.selectedCategories = new Categories();
    }
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
  { isVisible: true, field: 'slNo', filter: false, headerName: 'SL', lockPosition: true, pinned: 'left', suppressMovable: true, valueGetter: "node.rowIndex + 1", resizable: false, width: 80 },
  { isVisible: true, field: "categoryName", headerName: 'Categories Name' },
  { isVisible: true, field: "categoryNameBn", headerName: 'Categories Name (বাংলা)' },
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
  } as ColDef,
];    
