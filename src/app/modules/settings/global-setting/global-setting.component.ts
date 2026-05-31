import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Routes, RouterModule } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColDef, GridOptions, Module, RowDragEndEvent } from 'ag-grid-community';
import { GlobalSettingEnum } from 'src/app/core/enums/globalEnum';
import { RoutingHelper } from 'src/app/core/helpers/routing-helper';
import { SweetAlertEnum, SweetAlertService } from 'src/app/core/helpers/sweet-alert.service';
import { GlobalSetting } from 'src/app/core/models/settings/globalSetting';
import { EncryptionDecryptionUsingSymmetricKey } from 'src/app/core/security/encryption/encryptionDecryptionUsingSymmetricKey';
import { GlobalSettingService } from 'src/app/core/services/settings/global-setting.service';

@Component({
  selector: 'app-global-setting',
  templateUrl: './global-setting.component.html',
  styleUrls: ['./global-setting.component.scss']
})
export class GlobalSettingComponent implements OnInit {
  lstGlobalSetting: GlobalSetting[] = new Array<GlobalSetting>();
  selectedGlobalSetting: GlobalSetting = new GlobalSetting();

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
    animateRows: true,
  }


  constructor(
    private globalSettingService: GlobalSettingService,
    private swal: SweetAlertService,
    private router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.globalSettingService.getAll().subscribe(
      (res) => {
        if (res) {
          this.lstGlobalSetting = Object.assign(this.lstGlobalSetting, res);
          this.lstGlobalSetting = [...this.lstGlobalSetting];
          this.gridOptions.api.redrawRows();
        }
      }
    );
  }
  closeResult = '';
  addGlobalSetting(content) {
    this.selectedGlobalSetting = new GlobalSetting();
    this.modalService.open(content, { centered: true, size: 'lg' });
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
  async saveGlobalSetting() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      if (this.selectedGlobalSetting.globalSettingID > 0) {
        this.globalSettingService.updateGlobalSetting(this.selectedGlobalSetting).subscribe(
          (res) => {
            if (res) {
              this.modalClose();
              this.getAll();
              this.swal.message('Data Updated Successfully', SweetAlertEnum.success);
            }
          }
        );
      }
    }
  }   

  async editGlobalSetting(content) {
    if (this.selectedGlobalSetting.globalSettingID > 0) {
      // if(this.selectedGlobalSetting.globalSettingID == GlobalSettingEnum.Google_Map_Key){

      // this.selectedGlobalSetting.valueInString = EncryptionDecryptionUsingSymmetricKey.decrypt("b14ca5898a4e4133bbce2ea2315a1916", this.selectedGlobalSetting.valueInString);
      // }
      this.modalService.open(content, { centered: false, size: 'lg', backdrop: 'static' });
    }
    else {
      this.swal.message('Please select any!', SweetAlertEnum.warning);
      return;
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
      this.selectedGlobalSetting = selectedRows[0];
    }
    else {
      this.selectedGlobalSetting = new GlobalSetting();
    }
  }
}


const dataDefaultColDef: ColDef = {
  sortable: true,
  filter: true,
  resizable: true
};
const dataColumnDefs = [
  { field: 'slNo', headerName: 'SL', lockPosition: true, pinned: 'left', valueGetter: "node.rowIndex + 1", resizable: false, width: 80 },
  { field: "globalSettingName", headerName: 'Global Setting Name' },
  { field: "value", headerName: 'Value', width: 150 },
  { field: "valueInString", headerName: 'Value In String', width: 400 },
  { field: "isActive", headerName: 'Is Active' },
];

