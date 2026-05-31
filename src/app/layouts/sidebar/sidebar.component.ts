import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, Input, OnChanges } from '@angular/core';
import MetisMenu from 'metismenujs/dist/metismenujs';
import { EventService } from '../../core/services/event.service';
import { Router, NavigationEnd } from '@angular/router';

import { HttpClient } from '@angular/common/http';

import { MENU } from './menu';
import { MenuItem } from './menu.model';
import { TranslateService } from '@ngx-translate/core';
import { LOCALSTORAGE_KEY } from 'src/app/core/models/localstorage-item';
import { Permission } from 'src/app/core/models/settings/permission';
import { RoutingHelper } from 'src/app/core/helpers/routing-helper';
import { PermissionType } from 'src/app/core/enums/globalEnum';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

/**
 * Sidebar component
 */
export class SidebarComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('componentRef') scrollRef;
  @Input() isCondensed = false;
  menu: any;
  data: any;

  menuItems = [];
  lstmenuItems: Permission[] = new Array<Permission>();
  selectedPermission: Permission;
  @ViewChild('sideMenu') sideMenu: ElementRef;

  constructor(private eventService: EventService, private router: Router, public translate: TranslateService, private http: HttpClient) {
    router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        this._activateMenuDropdown();
        this._scrollElement();
      }
    });   
  }

  ngOnInit() {
    this.initialize();
    this._scrollElement();
    this.lstmenuItems = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY.PERMISSIONS));
    // this.lstmenuItems = this.lstmenuItems.filter(x => x.permissionID != 1);
    this.lstmenuItems = this.lstmenuItems.filter(x => x.permissionType == PermissionType.Menu);
    this.lstmenuItems.forEach(x => {
      x.isCollapsed = true;
    });
    this.list_to_tree(this.lstmenuItems);
    this.lstmenuItems = this.lstmenuItems.filter(x => x.parentPermissionID == 1);
    // console.log('this.lstmenuItems', this.lstmenuItems);

    // this.lstmenuItems[0].isCollapsed = false;
  }

  list_to_tree(list: Permission[]) {
    var map = {}, node: Permission, roots = [], i;
    for (i = 0; i < list.length; i += 1) {
      map[list[i].permissionID] = i;
      list[i].childList = [];
    }

    for (i = 0; i < list.length; i += 1) {
      node = list[i];
      if (node.parentPermissionID !== 0 && list[map[node.parentPermissionID]]) {
        list[map[node.parentPermissionID]].childList.push(node);
      } else {
        roots.push(node);
      }
    }
    return roots;
  }
  onToggle(oItem: Permission) {
    if(this.selectedPermission){
      this.selectedPermission.isLinkActive = false
    }
    if(oItem.hasChild){
      oItem.isCollapsed = !oItem.isCollapsed;
    }
    else{
      oItem.isCollapsed = false;
    }
    if (oItem.routePath && oItem.routePath.trim().length > 0 && oItem.permissionType == PermissionType.Menu) {
      localStorage.setItem(LOCALSTORAGE_KEY.ACTIVE_PERMISSION_ID, oItem.permissionID.toString());

      oItem.isLinkActive = true;
      this.selectedPermission = oItem;
      RoutingHelper.navigate2([], [oItem.routePath], this.router);
    }
  }


  //==============Custome Menu Code
  collapseToggle(oItem: Permission) {
    oItem.isCollapsed = !oItem.isCollapsed;
    if (oItem.isCollapsed) {
      oItem.childList = [];
    }
    else {
      oItem.childList = this.lstmenuItems.filter(x => x.parentPermissionID == oItem.permissionID);
      if (oItem.childList.length == 0) {
        oItem.isCollapsed = true;
      }
    }
    if (oItem.routePath) {
      RoutingHelper.navigate2([], [oItem.routePath], this.router);
    }
  }

  ngAfterViewInit() {
    this.menu = new MetisMenu(this.sideMenu.nativeElement);
    this._activateMenuDropdown();
  }

  toggleMenu(event) {
    event.currentTarget.nextElementSibling.classList.toggle('mm-show');
  }

  ngOnChanges() {
    if (!this.isCondensed && this.sideMenu || this.isCondensed) {
      setTimeout(() => {
        this.menu = new MetisMenu(this.sideMenu.nativeElement);
      });
    } else if (this.menu) {
      this.menu.dispose();
    }
  }
  _scrollElement() {
    setTimeout(() => {
      if (document.getElementsByClassName("mm-active").length > 0) {
        const currentPosition = document.getElementsByClassName("mm-active")[0]['offsetTop'];
        if (currentPosition > 500)
          if (this.scrollRef.SimpleBar !== null)
            this.scrollRef.SimpleBar.getScrollElement().scrollTop =
              currentPosition + 300;
      }
    }, 300);
  }

  /**
   * remove active and mm-active class
   */
  _removeAllClass(className) {
    const els = document.getElementsByClassName(className);
    while (els[0]) {
      els[0].classList.remove(className);
    }
  }

  /**
   * Activate the parent dropdown
   */
  _activateMenuDropdown() {
    this._removeAllClass('mm-active');
    this._removeAllClass('mm-show');
    const links = document.getElementsByClassName('side-nav-link-ref');
    let menuItemEl = null;
    // tslint:disable-next-line: prefer-for-of
    const paths = [];
    for (let i = 0; i < links.length; i++) {
      paths.push(links[i]['pathname']);
    }
    var itemIndex = paths.indexOf(window.location.pathname);
    if (itemIndex === -1) {
      const strIndex = window.location.pathname.lastIndexOf('/');
      const item = window.location.pathname.substr(0, strIndex).toString();
      menuItemEl = links[paths.indexOf(item)];
    } else {
      menuItemEl = links[itemIndex];
    }
    if (menuItemEl) {
      menuItemEl.classList.add('active');
      const parentEl = menuItemEl.parentElement;
      if (parentEl) {
        parentEl.classList.add('mm-active');
        const parent2El = parentEl.parentElement.closest('ul');
        if (parent2El && parent2El.id !== 'side-menu') {
          parent2El.classList.add('mm-show');
          const parent3El = parent2El.parentElement;
          if (parent3El && parent3El.id !== 'side-menu') {
            parent3El.classList.add('mm-active');
            const childAnchor = parent3El.querySelector('.has-arrow');
            const childDropdown = parent3El.querySelector('.has-dropdown');
            if (childAnchor) { childAnchor.classList.add('mm-active'); }
            if (childDropdown) { childDropdown.classList.add('mm-active'); }
            const parent4El = parent3El.parentElement;
            if (parent4El && parent4El.id !== 'side-menu') {
              parent4El.classList.add('mm-show');
              const parent5El = parent4El.parentElement;
              if (parent5El && parent5El.id !== 'side-menu') {
                parent5El.classList.add('mm-active');
                const childanchor = parent5El.querySelector('.is-parent');
                if (childanchor && parent5El.id !== 'side-menu') { childanchor.classList.add('mm-active'); }
              }
            }
          }
        }
      }
    }

  }

  /**
   * Initialize
   */
  initialize(): void {
    this.menuItems = MENU;
  }

  /**
   * Returns true or false if given menu item has child or not
   * @param item menuItem
   */
  hasItems(item: MenuItem) {
    return item.subItems !== undefined ? item.subItems.length > 0 : false;
  }
}
