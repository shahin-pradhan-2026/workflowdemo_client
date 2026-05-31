import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import {
  ColDef,
  GridApi,
  GridOptions,
  GridReadyEvent,
  RowNode,
} from "ag-grid-community";
import { Observable, throwError } from "rxjs";
import { RoutingHelper } from "src/app/core/helpers/routing-helper";
import {
  SweetAlertEnum,
  SweetAlertService,
} from "src/app/core/helpers/sweet-alert.service";
import { PageModel } from "src/app/core/models/core/pageModel";
import { VillageArea } from "src/app/core/models/settings/villageArea";
import { VillageAreaParaMap, Para } from "src/app/core/models/settings/para";
import { ParaService } from "src/app/core/services/settings/para.service";
import { VillageAreaService } from "src/app/core/services/settings/village-area.service";
import { QueryObject } from "src/app/core/models/core/queryObject";
import { CountryService } from "src/app/core/services/settings/country.service";
import { Country } from "src/app/core/models/settings/country";

@Component({
  selector: "app-para",
  templateUrl: "./para.component.html",
  styleUrls: ["./para.component.scss"],
})
export class ParaComponent implements OnInit {
  @ViewChild("modalPara") modalPara: TemplateRef<any>;

  lstCountry: Country[] = new Array<Country>();
  lstPara: Para[] = new Array<Para>();
  lstVillageArea: VillageArea[] = new Array<VillageArea>();
  selectedPara: Para = new Para();
  reactiveForm = new FormGroup({});
  public pageModel: PageModel;
  queryObject: QueryObject = new QueryObject();

  private gridApi;
  private gridColumnApi;
  columnDefs = dataColumnDefs;
  gridOptions: GridOptions = {
    pagination: true,
    rowSelection: "single",
    suppressDragLeaveHidesColumns: true,
    suppressRowDrag: false,
    rowDragManaged: true,
    getRowHeight: (params) => 40,
    defaultColDef: dataDefaultColDef,
  };

  constructor(
    private countryService: CountryService,
    private paraService: ParaService,
    private villageAreaService: VillageAreaService,
    private swal: SweetAlertService,
    private router: Router,
    private modalService: NgbModal
  ) {
    this.reactiveForm = new FormGroup({
      villageAreaID: new FormControl(0, [Validators.required]),
      paraName: new FormControl("", [
        Validators.required,
        Validators.maxLength(50),
      ]),
      paraCode: new FormControl("", [
        Validators.required,
        Validators.maxLength(20),
      ]),
      paraNameBangla: new FormControl("", [
        Validators.required,
        Validators.maxLength(50),
      ]),
      isActive: new FormControl(""),
    });
  }

  ngOnInit() {
    this.pageModel = new PageModel();
    this.getAll();
    this.getAllVillageArea();
    this.getAllCountry();
  }

  getAllCountry() {
    this.countryService.getAll().subscribe(
      (res) => {
        if (res) {
          this.lstCountry = Object.assign(this.lstCountry, res);
          this.lstCountry = [...this.lstCountry];
        }
      }
    )
  }

  getAllVillageArea() {
    this.villageAreaService.getAll().subscribe((res) => {
      if (res) {
        this.lstVillageArea = Object.assign(this.lstVillageArea, res);
        this.lstVillageArea = [...this.lstVillageArea];

        this.gridOptions.api.redrawRows();
      }
    });
  }
  getAll() {
    this.paraService.getAll().subscribe((res) => {
      if (res) {
        this.lstPara = Object.assign(this.lstPara, res);
        this.lstPara = [...this.lstPara];
        this.gridOptions.api.redrawRows();
      }
    });
  }
  add() {
    this.selectedPara = new Para();
    this.modalService.open(this.modalPara, { size: "md", backdrop: "static" });
  }
  modalClose() {
    this.modalService.dismissAll(this.modalPara);
  }
  onSubmit() {
    if (this.selectedPara.paraID > 0) {
      this.update();
    }
    if (!this.selectedPara.paraID) {
      this.save();
    }
  }

  async save() {
    if (
      await this.swal.confirm_custom(
        "Are you sure?",
        SweetAlertEnum.question,
        true,
        false
      )
    ) {
      this.paraService.save(this.selectedPara).subscribe(
        (res: Para) => {
          if (res && res.paraID > 0) {
            this.swal.message(
              "Data Updated Successfully",
              SweetAlertEnum.success
            );
            this.modalClose();
            this.getAll();
          }
        },
        (error) => {
          this.swal.message(error, SweetAlertEnum.error);
        }
      );
    }
  }
  edit() {
    if (!this.selectedPara.villageAreaParaMap) {
      var map = new VillageAreaParaMap();
      map.paraID = this.selectedPara.paraID;
      map.villageAreaID = 0;
      map.isActive = true;
      this.selectedPara.villageAreaParaMap = map;
    }
    this.modalService.open(this.modalPara, { size: "md", backdrop: "static" });
  }

  async update() {
    if (
      await this.swal.confirm_custom(
        "Are you sure?",
        SweetAlertEnum.question,
        true,
        false
      )
    ) {
      this.paraService.update(this.selectedPara).subscribe(
        (res: Para) => {
          if (res && res.paraID > 0) {
            this.swal.message(
              "Data Updated Successfully",
              SweetAlertEnum.success
            );
            this.modalClose();
            this.getAll();
          }
        },
        (error) => {
          this.swal.message(error, SweetAlertEnum.error);
        }
      );
    }
  }
  async remove() {
    if (
      await this.swal.confirm_custom(
        "Are you sure?",
        SweetAlertEnum.question,
        true,
        false
      )
    ) {
      this.paraService.delete(this.selectedPara.paraID).subscribe((res) => {
        if (res) {
          this.swal.message("Data deleted", SweetAlertEnum.success);
          this.getAll();
        }
      });
    }
  }
  // async updateOrder() {
  //   if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
  //     let dataLength = this.lstPara.length;
  //     for (let i = 0; i < dataLength; i++) {
  //       let row = this.gridApi.getDisplayedRowAtIndex(i);
  //       let dbData = this.lstPara.find(x => x.paraID == row.data.paraID);
  //       // dbData.villageAreaParaMap.orderNo = i + 1;
  //     }
  //     this.paraService.updateOrder(this.lstPara).subscribe(
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
      this.selectedPara = selectedRows[0];
    } else {
      this.selectedPara = new Para();
    }
  }
  onBtnExport() {
    this.gridApi.exportDataAsCsv();
  }
  reset() {}
  search() {}
  filter() {}
}

const dataDefaultColDef: ColDef = {
  resizable: true,
  sortable: true,
  suppressMovable: false,
  filter: true,
  cellClass: "suppress-movable-col",
};
const dataColumnDefs = [
  {
    isVisible: true,
    field: "slNo",
    filter: false,
    headerName: "SL",
    lockPosition: true,
    pinned: "left",
    suppressMovable: true,
    valueGetter: "node.rowIndex + 1",
    resizable: false,
    width: 80,
  },
  { isVisible: true, field: "villageAreaName", headerName: "VillageArea Name" },
  { isVisible: true, field: "paraName", headerName: "Para Name" },
  { isVisible: true, field: "paraCode", headerName: "Para Code" },
  { isVisible: true, field: "paraNameBangla", headerName: "Para Name (বাংলা)" },
  {
    isVisible: true,
    field: "villageAreaParaMap.isActive",
    headerName: "Is Active",
  },
];
