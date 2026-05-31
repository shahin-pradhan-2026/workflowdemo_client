import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColDef, GridApi, GridOptions, GridReadyEvent, RowNode } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { RoutingHelper } from 'src/app/core/helpers/routing-helper';
import { SweetAlertEnum, SweetAlertService } from 'src/app/core/helpers/sweet-alert.service';
import { PageModel } from 'src/app/core/models/core/pageModel';
import { Organization } from 'src/app/core/models/data/organization';
import { OrganizationService } from 'src/app/core/services/settings/organization.service';

@Component({
  selector: 'app-organization-list',
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.scss'],
})


export class OrganizationListComponent implements OnInit {
  // bread crumb items
  lstOrganization: Organization[] = new Array<Organization>();
  selectedOrganization: Organization = new Organization();
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
    private organizationService: OrganizationService,
    private swal: SweetAlertService,
    private router: Router
  ) { }

  ngOnInit() {
    this.pageModel = new PageModel();
    this.getAll();
  }
  // getInitialData() {
  //   this.organizationService.getAll().subscribe(
  //     (res) => {
  //       if (res) {
  //         this.lstOrganization = Object.assign(this.lstOrganization, res);
  //         this.lstOrganization = [...this.lstOrganization];
  //         this.gridOptions.api.redrawRows();
  //       }
  //     }
  //   );
  // }
  getAll() {
    this.organizationService.getAll().subscribe(
      (res) => {
        if (res) {
          this.lstOrganization = Object.assign(this.lstOrganization, res);
          this.lstOrganization = [...this.lstOrganization];
          this.lstOrganization = this.lstOrganization.filter(x=>x.parentOrganizationID > 0);
          this.gridOptions.api.redrawRows();
        }
      }
    )
  }
  addOrganization() {
    RoutingHelper.navigate2([], ['settings', 'organization', 'organization-create', 0], this.router);
  }
  async editOrganization() {
    if (this.selectedOrganization.organizationID > 0) {
      RoutingHelper.navigate2([], ['settings', 'organization', 'organization-create', this.selectedOrganization.organizationID], this.router);
    }
    else {
      this.swal.message('No organization selected', SweetAlertEnum.error);
    }
  }
  async viewOrganization() {
    if (this.selectedOrganization.organizationID > 0) {
      RoutingHelper.navigate2([], ['settings', 'organization', 'organization-create', this.selectedOrganization.organizationID], this.router);
    }
    else {
      this.swal.message('No organization selected', SweetAlertEnum.error);
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
      this.selectedOrganization = selectedRows[0];
    }
    else {
      this.selectedOrganization = new Organization();
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
  { isVisible: true, field: "organizationName", lockPosition: true, pinned: 'left', suppressMovable: true, headerName: 'Training Center Name', width: 400 },
  { isVisible: true, field: "organizationNameBangla", lockPosition: true, pinned: 'left', suppressMovable: true, headerName: 'Training Center Name(বাংলা)', width: 400 },
  { isVisible: true, field: "organizationTypeStr", lockPosition: true, pinned: 'left', headerName: 'Type' },
  { isVisible: true, field: "isActive", lockPosition: true, pinned: 'left', headerName: 'Active' },
  // { isVisible: true, field: "organizationShortName", headerName: 'Short Name' },
  // { isVisible: true, field: "organizationCode", headerName: 'Code' },
];