import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColDef, GridOptions } from 'ag-grid-community';
import { SweetAlertEnum, SweetAlertService } from 'src/app/core/helpers/sweet-alert.service';
import { PageModel } from 'src/app/core/models/core/pageModel';
import { AgentMacApproval } from 'src/app/core/models/pioms/agentMacApproval';
import { ResponseMessage } from 'src/app/core/models/responseMessage';
import { AgentMacApprovalService } from 'src/app/core/services/pioms/agent-mac-approval.service';

@Component({
  selector: 'app-agent-mac-approval',
  templateUrl: './agent-mac-approval.component.html',
  styleUrls: ['./agent-mac-approval.component.css']
})
export class AgentMacApprovalComponent implements OnInit {


  @ViewChild("modalAgentMacApproval") modalAgentMacApproval: TemplateRef<any>;

  lstAgentMacApproval: AgentMacApproval[] = new Array<AgentMacApproval>();
  selectedAgentMacApproval: AgentMacApproval = new AgentMacApproval();
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
    private agentMacApprovalService: AgentMacApprovalService,
    private swal: SweetAlertService,
    private router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    // this.selectedAgentMacApproval.isActive = true;
    this.pageModel = new PageModel();
    this.getAll();
  }
  
  getAll() {
    debugger
    this.agentMacApprovalService.getAll().subscribe(
      (res:ResponseMessage) => {
        if (res) {
          this.lstAgentMacApproval = Object.assign(this.lstAgentMacApproval, res.responseObj);
          this.lstAgentMacApproval = [...this.lstAgentMacApproval];
          this.gridOptions.api.redrawRows();
        }
      }
    )
  }
  addAgentMacApproval() {
    this.selectedAgentMacApproval = new AgentMacApproval();
    this.modalService.open(this.modalAgentMacApproval, { size: 'md', backdrop: 'static' });

  }
  modalClose() {
    this.modalService.dismissAll(this.modalAgentMacApproval);
  }

  filterByDate() {

  }

  async saveAgentMacApproval() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      this.agentMacApprovalService.save(this.selectedAgentMacApproval).subscribe(
        (res: AgentMacApproval) => {
          if (res && res.agentMacApprovalID > 0) {
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
  editAgentMacApproval() {
    this.modalService.open(this.modalAgentMacApproval, { size: 'md' });

  }

  async updateAgentMacApproval() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      this.agentMacApprovalService.update(this.selectedAgentMacApproval).subscribe(
        (res: AgentMacApproval) => {
          if (res && res.agentMacApprovalID > 0) {
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
      nodes[0].setSelected(true); //selects the first row in the rendered view
    }
  }
  onSelect() {
    const selectedRows = this.gridApi.getSelectedRows();
    if (selectedRows && selectedRows.length == 1) {
      this.selectedAgentMacApproval = selectedRows[0];
    }
    else {
      this.selectedAgentMacApproval = new AgentMacApproval();
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
  { isVisible: true, field: 'userID', headerName: 'User ID', width: 120 },
  { isVisible: true, field: 'agentName', headerName: 'Name', width: 150 },
  { isVisible: true, field: 'mobile', headerName: 'Mobile', width: 140 },
  { isVisible: true, field: 'unit', headerName: 'Unit', width: 100 },
  { isVisible: true, field: 'requestedMAC', headerName: 'Requested MAC', width: 180 },
  {
    isVisible: true,
    field: 'requestedDate',
    headerName: 'Requested Date',
    width: 150,
    valueFormatter: (params) => params.value ? new Date(params.value).toLocaleDateString('en-GB') : ''
  },
  { isVisible: true, field: 'status', headerName: 'Status', width: 120 }
];