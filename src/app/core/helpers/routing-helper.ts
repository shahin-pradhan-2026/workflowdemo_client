import { Router } from "@angular/router";

export class RoutingHelper {
    // with reload
    static navigate(linkPrefix: any[], urlObjList: any[]): void {
        let url = '';
        if (linkPrefix.length) {
            linkPrefix.forEach(x => {
                url = url + x + '/';
            });
        }
        if (urlObjList.length) {
            urlObjList.forEach(x => {
                url = url + x + '/';
            });
        }
        location.href = url.slice(0, -1);
    }
    // without reload
    static navigate2(linkPrefix: any[], urlObjList: any[], router: Router): void {
        let url = '';
        if (linkPrefix.length) {
            linkPrefix.forEach(x => {
                url = url + x + '/';
            });
        }
        if (urlObjList.length) {
            urlObjList.forEach(x => {
                url = url + x + '/';
            });
        }
        let makeUrl = url.slice(0, -1);
        router.navigate(['/' + makeUrl]);
    }
    static navigate3(commands: any[], extras: any[], router: Router, queryParams: any) {
        router.navigate([...commands, ...extras], { queryParams: queryParams });
      }
      static navigate4(commands: any[], extras: any[], router: Router, queryParams: any) {
        router.navigate([...commands, ...extras], { queryParams: queryParams });
      }
      static navigate5(commands: any[], extras: any[], router: Router, queryParams: any) {
        router.navigate([...commands, ...extras], { queryParams: queryParams });
      }
      static navigate6(commands: any[], extras: any[], router: Router, queryParams: any) {
        router.navigate([...commands, ...extras], { queryParams: queryParams });
      }
      static navigate7(commands: any[], extras: any[], router: Router, queryParams: any) {
        router.navigate([...commands, ...extras], { queryParams: queryParams });
      }
      static navigate8(commands: any[], extras: any[], router: Router, queryParams: any) {
        router.navigate([...commands, ...extras], { queryParams: queryParams });
      }
      static navigate9(commands: any[], extras: any[], router: Router, queryParams: any) {
        router.navigate([...commands, ...extras], { queryParams: queryParams });
      }
}
