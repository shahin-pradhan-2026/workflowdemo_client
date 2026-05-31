import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColDef, GridOptions } from 'ag-grid-community';
import { SweetAlertEnum, SweetAlertService } from 'src/app/core/helpers/sweet-alert.service';
import { PageModel } from 'src/app/core/models/core/pageModel';
import { AgentFaceRegistration } from 'src/app/core/models/pioms/agentFaceRegistration';
import { ResponseMessage } from 'src/app/core/models/responseMessage';
import { AgentFaceRegistrationService } from 'src/app/core/services/pioms/agent-face-registration.service';

@Component({
  selector: 'app-agent-face-registration',
  templateUrl: './agent-face-registration.component.html',
  styleUrls: ['./agent-face-registration.component.css']
})
export class AgentFaceRegistrationComponent implements OnInit {


  @ViewChild("modalAgentFaceRegistration") modalAgentFaceRegistration: TemplateRef<any>;

  lstAgentFaceRegistrationAll: AgentFaceRegistration[] = new Array<AgentFaceRegistration>();
  lstAgentFaceRegistration: AgentFaceRegistration[] = new Array<AgentFaceRegistration>();
  selectedAgentFaceRegistration: AgentFaceRegistration = new AgentFaceRegistration();
  objAgentFaceRegistration: AgentFaceRegistration = new AgentFaceRegistration();
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
    private agentFaceRegistrationService: AgentFaceRegistrationService,
    private swal: SweetAlertService,
    private router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    // this.selectedAgentFaceRegistration.isActive = true;
    this.selectedAgentFaceRegistration = new AgentFaceRegistration();
    this.pageModel = new PageModel();
    this.getAll();
  }

  getAll() {
    this.agentFaceRegistrationService.getAll().subscribe(
      (res:ResponseMessage) => {
        if (res) {
          this.lstAgentFaceRegistration = Object.assign(this.lstAgentFaceRegistration, res.responseObj);
          this.lstAgentFaceRegistration = [...this.lstAgentFaceRegistration];
          this.gridOptions.api.redrawRows();
        }
      }
    )
  }
  addAgentFaceRegistration() {
    this.selectedAgentFaceRegistration = new AgentFaceRegistration();
    this.modalService.open(this.modalAgentFaceRegistration, { size: 'md', backdrop: 'static' });

  }
  modalClose() {
    this.modalService.dismissAll(this.modalAgentFaceRegistration);
  }

  filterByDate() {

  }
  acceptFace() {

  }
  rejectFace() {

  }

  editAgentFaceRegistration() {
    this.objAgentFaceRegistration = Object.assign(this.selectedAgentFaceRegistration);

  }
  changeRequestStatus(reqID) {
    this.lstAgentFaceRegistration = this.lstAgentFaceRegistrationAll.filter(x=>x.requestStatusID == reqID);
  }
  async updateAgentFaceRegistration() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      this.agentFaceRegistrationService.update(this.selectedAgentFaceRegistration).subscribe(
        (res: AgentFaceRegistration) => {
          if (res && res.agentFaceRegistrationID > 0) {
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

  // }
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    let nodes = this.gridApi.getRenderedNodes();
    if (nodes.length) {
      nodes[0].setSelected(false); //selects the first row in the rendered view
    }
  }
  onSelect() {
    const selectedRows = this.gridApi.getSelectedRows();
    if (selectedRows && selectedRows.length == 1) {
      this.selectedAgentFaceRegistration = selectedRows[0];
    }
    else {
      this.selectedAgentFaceRegistration = new AgentFaceRegistration();
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
  { field: 'agentName', headerName: 'Agent Name' },
  { field: 'bpNumber', headerName: 'BP Number' },
  { field: 'agentCode', headerName: 'Agent Code' },
  { field: 'presentUnit', headerName: 'Present Unit' },
  { field: 'mobile', headerName: 'Mobile' },

  {
    field: 'requestedOn',
    headerName: 'Requested On',
    width: 140,
    valueFormatter: (params) => params.value ? new Date(params.value).toLocaleDateString() : ''
  },
  { field: 'status', headerName: 'Status', width: 120 }

];
