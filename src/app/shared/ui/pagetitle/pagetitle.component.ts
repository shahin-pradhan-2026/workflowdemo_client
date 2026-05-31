import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Output, EventEmitter } from '@angular/core';
import { PermissionType } from 'src/app/core/enums/globalEnum';
import { LOCALSTORAGE_KEY } from 'src/app/core/models/localstorage-item';
import { Permission } from 'src/app/core/models/settings/permission';

@Component({
  selector: 'app-page-title',
  templateUrl: './pagetitle.component.html',
  styleUrls: ['./pagetitle.component.scss']
})
export class PagetitleComponent implements OnInit {

  breadcrumbItems: any;
  @Input() title: string;
  @Input() toggleSearch: string;
  @Output() newItemEvent = new EventEmitter<boolean>();
  private routeSub: Subscription;
  currentPermissionID: number;
  lstmenuItems: Permission[] = new Array<Permission>();



  monitoringSearchTogglerAction: boolean =false;

  constructor(
    // private route: ActivatedRoute,
    // private router : Router
  ) { }

  ngOnInit() {
    this.currentPermissionID = parseInt(localStorage.getItem(LOCALSTORAGE_KEY.ACTIVE_PERMISSION_ID));
    this.lstmenuItems = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY.PERMISSIONS));
    this.lstmenuItems = this.lstmenuItems.filter(x => x.permissionID != 1);
    this.makeBreadcrumb();

    // this.routeSub = this.route.params.subscribe(params => {
    //   const userAutoID = parseInt(params['userID']);
    //   if (userAutoID) {
    //   }
    // });
  }
  
  makeBreadcrumb() {
    this.breadcrumbItems = [];
    let dataList = [];
    let currentPermission = this.lstmenuItems.find(x => x.permissionID == this.currentPermissionID);
    while (currentPermission != null && currentPermission.permissionType == PermissionType.Menu) {
      dataList.push({ label: currentPermission.displayName })
      currentPermission = this.getParent(currentPermission)
    }
    if (dataList) {
      while (dataList && dataList.length > 0) {
        this.breadcrumbItems.push(dataList.pop());
      }
    }
  }
  getParent(permission: Permission) {
    return this.lstmenuItems.find(x => x.permissionID == permission.parentPermissionID);
  }

  monitoringSearchToggler(){
    this.newItemEvent.emit(this.monitoringSearchTogglerAction != this.monitoringSearchTogglerAction);
    
  }
  // ngOnDestroy() {
  //   this.routeSub.unsubscribe();
  // }

}
