import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColDef, GridOptions } from 'ag-grid-community';
import { SweetAlertEnum, SweetAlertService } from 'src/app/core/helpers/sweet-alert.service';
import { PageModel } from 'src/app/core/models/core/pageModel';
import { AgentReport } from 'src/app/core/models/pioms/agentReport';
import { AgentReportService } from 'src/app/core/services/pioms/agent-report.service';

@Component({
  selector: 'app-agent-report',
  templateUrl: './agent-report.component.html',
  styleUrls: ['./agent-report.component.css']
})
export class AgentReportComponent implements OnInit {


  @ViewChild("modalAgentReport") modalAgentReport: TemplateRef<any>;

  lstAgentReport: AgentReport[] = new Array<AgentReport>();
  selectedAgentReport: AgentReport = new AgentReport();
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
    private agentReportService: AgentReportService,
    private swal: SweetAlertService,
    private router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    // this.selectedAgentReport.isActive = true;
    this.pageModel = new PageModel();
    this.getAll();
    this.dataStatic();
  }
  dataStatic() {
    this.lstAgentReport = [
      {
        agentReportID: 1,
        reportDate: '03-09-2025',
        agentName: 'Agent A',
        complainID: 'ID5789643150',
        accusedBP: 'BP66412255469',
        reportDetails: 'Details 1',
        attachments: 'Attachment 1',
        isActive: true
      },
      {
        agentReportID: 2,
        reportDate: '04-09-2025',
        agentName: 'Agent B',
        complainID: 'ID5789643150',
        accusedBP: 'BP2285445568',
        reportDetails: 'Details 2',
        attachments: 'Attachment 1',
        isActive: true
      }
    ];

  }
  getAll() {
    this.agentReportService.getAll().subscribe(
      (res) => {
        if (res) {
          this.lstAgentReport = Object.assign(this.lstAgentReport, res);
          this.lstAgentReport = [...this.lstAgentReport];
          this.gridOptions.api.redrawRows();
        }
      }
    )
  }
  addAgentReport() {
    this.selectedAgentReport = new AgentReport();
    this.modalService.open(this.modalAgentReport, { size: 'md', backdrop: 'static' });

  }
  modalClose() {
    this.modalService.dismissAll(this.modalAgentReport);
  }

  filterByDate() {

  }

  async saveAgentReport() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      this.agentReportService.save(this.selectedAgentReport).subscribe(
        (res: AgentReport) => {
          if (res && res.agentReportID > 0) {
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
  editAgentReport() {
    this.modalService.open(this.modalAgentReport, { size: 'md' });

  }

  async updateAgentReport() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      this.agentReportService.update(this.selectedAgentReport).subscribe(
        (res: AgentReport) => {
          if (res && res.agentReportID > 0) {
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
      this.selectedAgentReport = selectedRows[0];
    }
    else {
      this.selectedAgentReport = new AgentReport();
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
  { isVisible: true, field: "reportDate", headerName: 'Report Date' },
  { isVisible: true, field: "agentName", headerName: 'Agent Name' },
  { isVisible: true, field: "complainID", headerName: 'Complain ID' },
  { isVisible: true, field: "accusedBP", headerName: 'Accused BP' },
  { isVisible: true, field: "reportDetails", headerName: 'Report Details' },
  { isVisible: true, field: "attachments", headerName: 'Attachments' }


];
