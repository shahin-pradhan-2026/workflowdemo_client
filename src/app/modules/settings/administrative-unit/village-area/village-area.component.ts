import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColDef, GridApi, GridOptions, GridReadyEvent, RowNode } from 'ag-grid-community';
import { Observable, throwError } from 'rxjs';
import { RoutingHelper } from 'src/app/core/helpers/routing-helper';
import { SweetAlertEnum, SweetAlertService } from 'src/app/core/helpers/sweet-alert.service';
import { PageModel } from 'src/app/core/models/core/pageModel';
import { QueryObject } from 'src/app/core/models/core/queryObject';
import { ResponseMessage } from 'src/app/core/models/responseMessage';
import { Country } from 'src/app/core/models/settings/country';
import { District } from 'src/app/core/models/settings/district';
import { Division } from 'src/app/core/models/settings/division';
import { Thana } from 'src/app/core/models/settings/thana';
import { UnionWard } from 'src/app/core/models/settings/unionWard';
import { UpazilaCityCorporation } from 'src/app/core/models/settings/upazilaCityCorporation';
import { UnionWardVillageAreaMap, VillageArea } from 'src/app/core/models/settings/villageArea';
import { CountryService } from 'src/app/core/services/settings/country.service';
import { OrganizationAdministrativeUnitMapService } from 'src/app/core/services/settings/organization-administrative-unit-map.service';
import { UnionWardService } from 'src/app/core/services/settings/union-ward.service';
import { VillageAreaService } from 'src/app/core/services/settings/village-area.service';


@Component({
  selector: 'app-village-area',
  templateUrl: './village-area.component.html',
  styleUrls: ['./village-area.component.scss']
})
export class VillageAreaComponent implements OnInit {

  allUnitList: any;
  @ViewChild("modalVillageArea") modalVillageArea: TemplateRef<any>;
  lstCountry: Country[] = new Array<Country>();
  lstDivision: Division[] = new Array<Division>();
  lstDistrict: District[] = new Array<District>();
  lstUpazilaCityCorporation: UpazilaCityCorporation[] = new Array<UpazilaCityCorporation>();
  lstThana: Thana[] = new Array<Thana>();
  lstUnionWard: UnionWard[] = new Array<UnionWard>();
  lstVillageArea: VillageArea[] = new Array<VillageArea>();

  selectedVillageArea: VillageArea = new VillageArea();
  reactiveForm = new FormGroup({});
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
    private organizationAdministrativeUnitMapService: OrganizationAdministrativeUnitMapService,
    private countryService: CountryService,
    private villageAreaService: VillageAreaService,
    private unionWardService: UnionWardService,
    private swal: SweetAlertService,
    private router: Router,
    private modalService: NgbModal
  ) {
    this.reactiveForm = new FormGroup({
      unionWardID: new FormControl(0, [Validators.required]),
      villageAreaName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      villageAreaCode: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      villageAreaNameBangla: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      isActive: new FormControl(''),

    })
  }

  ngOnInit() {
    this.pageModel = new PageModel();
    this.getAllAdministrativeUnitList();
    this.getAll();
    // this.getAllUnionWard();
    // this.getAllCountry();
  }
  getAllAdministrativeUnitList() {
    this.organizationAdministrativeUnitMapService.getAllAdministrativeUnitList().subscribe(
      (res: ResponseMessage) => {
        if (res) {
          this.allUnitList = res.responseObj;
          this.lstCountry = res.responseObj.lstCountry;
        }
      }
    )
  }
  // getAllCountry() {
  //   this.countryService.getAll().subscribe(
  //     (res) => {
  //       if (res) {
  //         this.lstCountry = Object.assign(this.lstCountry, res);
  //         this.lstCountry = [...this.lstCountry];
  //       }
  //     }
  //   )
  // }
  // getAllUnionWard() {
  //   this.unionWardService.getAll().subscribe(
  //     (res) => {
  //       if (res) {
  //         this.lstUnionWard = Object.assign(this.lstUnionWard, res);
  //         this.lstUnionWard = [...this.lstUnionWard];

  //         this.gridOptions.api.redrawRows();
  //       }
  //     }
  //   );
  // }
  getAll() {
    this.villageAreaService.getAll().subscribe(
      (res) => {
        if (res) {
          this.lstVillageArea = Object.assign(this.lstVillageArea, res);
          this.lstVillageArea = [...this.lstVillageArea];
          this.gridOptions.api.redrawRows();
        }
      }
    )
  }
  add() {
    this.selectedVillageArea = new VillageArea();
    this.modalService.open(this.modalVillageArea, { size: 'md', backdrop: 'static' });
  }
  modalClose() {
    this.modalService.dismissAll(this.modalVillageArea);
  }
  onSubmit() {
    if (this.selectedVillageArea.villageAreaID > 0) {
      this.update();
    }
    if (!this.selectedVillageArea.villageAreaID) {
      this.save();
    }
  }

  async save() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      this.villageAreaService.save(this.selectedVillageArea).subscribe(
        (res: VillageArea) => {
          if (res && res.villageAreaID > 0) {
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
  edit() {
    if (!this.selectedVillageArea.unionWardVillageAreaMap) {
      var map = new UnionWardVillageAreaMap();
      map.villageAreaID = this.selectedVillageArea.villageAreaID;
      map.unionWardID = 0;
      map.isActive = true;
      this.selectedVillageArea.unionWardVillageAreaMap = map;
    }
    this.modalService.open(this.modalVillageArea, { size: 'md', backdrop: 'static' });
  }

  async update() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      this.villageAreaService.update(this.selectedVillageArea).subscribe(
        (res: VillageArea) => {
          if (res && res.villageAreaID > 0) {
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
  async remove() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      this.villageAreaService.delete(this.selectedVillageArea.villageAreaID).subscribe(
        (res) => {
          if (res) {
            this.swal.message('Data deleted', SweetAlertEnum.success);
            this.getAll();
          }
        }
      );
    }
  }
  // async updateOrder() {
  //   if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
  //     let dataLength = this.lstVillageArea.length;
  //     for (let i = 0; i < dataLength; i++) {
  //       let row = this.gridApi.getDisplayedRowAtIndex(i);
  //       let dbData = this.lstVillageArea.find(x => x.villageAreaID == row.data.villageAreaID);
  //       // dbData.unionWardVillageAreaMap.orderNo = i + 1;
  //     }
  //     this.villageAreaService.updateOrder(this.lstVillageArea).subscribe(
  //       (res) => {
  //         if (res) {
  //           this.gridOptions.api.redrawRows();
  //           this.swal.message('Order Updated', SweetAlertEnum.success);
  //         }
  //       }
  //     );
  //   }
  // }
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    let nodes = this.gridApi.getRenderedNodes();
    if (nodes.length) {
      nodes[0].setSelected(true);
    }
  }
  onSelect() {
    const selectedRows = this.gridApi.getSelectedRows();
    if (selectedRows && selectedRows.length == 1) {
      this.selectedVillageArea = selectedRows[0];
    }
    else {
      this.selectedVillageArea = new VillageArea();
    }
  }
  onBtnExport() {
    this.gridApi.exportDataAsCsv();
  }

  onChangeCountry() {
    this.lstDivision = this.allUnitList.lstDivision;
    if (this.queryObject.countryID > 0) {
      this.lstDivision = this.lstDivision.filter(x => x.countryID == this.queryObject.countryID);
    }
  }
  onChangeDivision() {
    this.lstDistrict = this.allUnitList.lstDistrict;
    if (this.queryObject.divisionID > 0) {
      this.lstDistrict = this.lstDistrict.filter(x => x.divisionID == this.queryObject.divisionID);
    }
  }
  onChangeDistrict() {
    this.lstUpazilaCityCorporation = this.allUnitList.lstUpazilaCityCorporation;
    if (this.queryObject.districtID > 0) {
      this.lstUpazilaCityCorporation = this.lstUpazilaCityCorporation.filter(x => x.districtID == this.queryObject.districtID);
    }
  }
  onChangeUpazila() {
    this.lstThana = this.allUnitList.lstThana;
    if (this.queryObject.upazilaCityCorporationID > 0) {
      this.lstThana = this.lstThana.filter(x => x.upazilaCityCorporationID == this.queryObject.upazilaCityCorporationID);
    }
  }
  onChangeThana() {
    this.lstUnionWard = this.allUnitList.lstUnionWard;
    if (this.queryObject.thanaID > 0) {
      this.lstUnionWard = this.lstUnionWard.filter(x => x.thanaID == this.queryObject.thanaID);
    }
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
  { isVisible: true, field: "unionWardName", headerName: 'UnionWard Name' },
  { isVisible: true, field: "villageAreaName", headerName: 'VillageArea Name' },
  { isVisible: true, field: "villageAreaCode", headerName: 'VillageArea Code' },
  { isVisible: true, field: "villageAreaNameBangla", headerName: 'VillageArea Name (বাংলা)' },
  { isVisible: true, field: "unionWardVillageAreaMap.isActive", headerName: 'Is Active' },
];    
