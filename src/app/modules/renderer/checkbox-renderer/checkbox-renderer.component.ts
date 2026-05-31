import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-checkbox-renderer',
  templateUrl: './checkbox-renderer.component.html',
  styleUrls: ['./checkbox-renderer.component.scss']
})

export class CheckboxRendererComponent implements ICellRendererAngularComp {

  params : any;
  label: string;
  class: string;
  icon: string;
  type: string;

  agInit(params): void {
    this.params = params;
    this.label = this.params.label || null;
    this.class = this.params.class || null;
    this.icon = this.params.icon || null;
    this.type = this.params.type || null;
  }

  refresh(params?: any): boolean {
    return true;
  }

  onChecked(event) {
    let checked = event.target.checked;
    let colId = this.params.column.colId;
    this.params.node.setDataValue(colId, checked);
}
}