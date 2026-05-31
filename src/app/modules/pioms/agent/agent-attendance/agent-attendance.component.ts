import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColDef, GridOptions } from 'ag-grid-community';
import { SweetAlertEnum, SweetAlertService } from 'src/app/core/helpers/sweet-alert.service';
import { PageModel } from 'src/app/core/models/core/pageModel';
import { AgentAttendance } from 'src/app/core/models/pioms/agentAttendance';
import { ResponseMessage } from 'src/app/core/models/responseMessage';
import { AgentAttendanceService } from 'src/app/core/services/pioms/agent-attendance.service';

@Component({
  selector: 'app-agent-attendance',
  templateUrl: './agent-attendance.component.html',
  styleUrls: ['./agent-attendance.component.css']
})
export class AgentAttendanceComponent implements OnInit {

  @ViewChild("modalAgentAttendance") modalAgentAttendance: TemplateRef<any>;
  @ViewChild("modalViewAgentAttendance") modalViewAgentAttendance: TemplateRef<any>;

  lstAgentAttendance: AgentAttendance[] = new Array<AgentAttendance>();
  objAgentAttendance: AgentAttendance = new AgentAttendance();
  objQueryAttendance: AgentAttendance = new AgentAttendance();
  selectedAgentAttendance: AgentAttendance = new AgentAttendance();
  public pageModel: PageModel;

  //=======================Agm Map
  zoom: number = 15;
  
  // initial center position for the map
  lat: number = 23.785227;
  lng: number = 90.397879;
  lat2: number = 23.964876;
  lng2: number = 90.654488;


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
    private agentAttendanceService: AgentAttendanceService,
    private swal: SweetAlertService,
    private router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    // this.selectedAgentAttendance.isActive = true;
    this.pageModel = new PageModel();
    this.getAll();
  }

  mapClicked($event: MouseEvent) {

  }
  getAll() {
    this.agentAttendanceService.getAll().subscribe(
      (res:ResponseMessage) => {
        if (res) {
          this.lstAgentAttendance = Object.assign(this.lstAgentAttendance, res.responseObj);
          this.lstAgentAttendance = [...this.lstAgentAttendance];
          this.gridOptions.api.redrawRows();
        }
      }
    )
  }
  addAgentAttendance() {
    this.selectedAgentAttendance = new AgentAttendance();
    this.modalService.open(this.modalAgentAttendance, { size: 'md', backdrop: 'static' });

  }
  modalClose() {
    this.modalService.dismissAll(this.modalAgentAttendance);
  }

  // filterByDate() {
  //   this.agentAttendanceService.getAttendanceListByFilter(this.selectedAgentAttendance).subscribe(
  //       (res: AgentAttendance) => {
  //         if (res && res.agentAttendanceID > 0) {         
            
  //           this.getAll();
  //         }
  //       },
  //       (error) => {
  //         this.swal.message(error, SweetAlertEnum.error);
  //       });
  // }

  filterByDate() {
  const filterObj = {
    ComplainID: this.objQueryAttendance.complainID || null,
    BPNumber: this.objQueryAttendance.bpNumber || null,
    DutyPlace: this.objQueryAttendance.dutyPlace || null,    
    DateFrom: this.objQueryAttendance.fromDate || null,
    DateTo: this.objQueryAttendance.toDate || null
  };

  this.agentAttendanceService.getAttendanceListByFilter(filterObj).subscribe(
    (res: ResponseMessage) => {
      if (res.statusCode == 1) {
        this.lstAgentAttendance = res.responseObj;
      } else {
        this.swal.message(res.message, SweetAlertEnum.error);
      }
    },
    (error) => {
      this.swal.message(error, SweetAlertEnum.error);
    }
  );
}

  async saveAgentAttendance() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      this.agentAttendanceService.save(this.selectedAgentAttendance).subscribe(
        (res: AgentAttendance) => {
          if (res && res.agentAttendanceID > 0) {
            this.swal.message('Data Save Successfully', SweetAlertEnum.success);
            this.modalClose();
            this.getAll();
          }
        },
        (error) => {
          this.swal.message(error, SweetAlertEnum.error);
        })
    }
  }
  editAgentAttendance() {
    this.objAgentAttendance = this.selectedAgentAttendance;
    this.modalService.open(this.modalAgentAttendance, { size: 'md' });

  }
  viewAgentAttendance() {
    this.modalService.open(this.modalViewAgentAttendance, { size: 'lg' });

  }

  async updateAgentAttendance() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      this.agentAttendanceService.update(this.selectedAgentAttendance).subscribe(
        (res: AgentAttendance) => {
          if (res && res.agentAttendanceID > 0) {
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
      this.selectedAgentAttendance = selectedRows[0];
    }
    else {
      this.selectedAgentAttendance = new AgentAttendance();
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
  { isVisible: true, field: "agentName", headerName: 'Agent Name' },
  { isVisible: true, field: "agentBPNumber", headerName: 'Agent BP' },
  { isVisible: true, field: "complainNo", headerName: 'ComplainID' },
  { isVisible: true, field: "dutyPlace", headerName: 'Duty Place' },
  { isVisible: true, field: "firstAttendanceTime", headerName: 'First Attendance Time' },
  { isVisible: true, field: "secondAttendanceTime", headerName: 'Second Attendance Time' },
  { isVisible: true, field: "remarks", headerName: 'Remarks' },


];
