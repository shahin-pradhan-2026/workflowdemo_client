import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DateTimeAdapter } from 'ng-pick-datetime';
import { SweetAlertService } from 'src/app/core/helpers/sweet-alert.service';
import { TextFilterService } from 'src/app/core/helpers/text-filter.service';
import { Dashboard } from 'src/app/core/models/complain/dashboard';
import { QueryObject } from 'src/app/core/models/core/queryObject';
import { RoutingHelper } from 'src/app/core/helpers/routing-helper';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexResponsive,
  ApexXAxis,
  ApexLegend,
  ApexFill
} from "ng-apexcharts";
import { DashboardService } from 'src/app/core/services/complain/dashboard.service';



export type ChartOptions = {
  color: ApexPlotOptions;
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
  xaxis: ApexXAxis;
  legend: ApexLegend;
  fill: ApexFill;
};
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  queryObject: QueryObject = new QueryObject();
  lstDashboard: Dashboard[] = new Array<Dashboard>();
  lstDashboardChart: Dashboard[] = new Array<Dashboard>();
  totalComplain = 0;
  totalInAction = 0;
  totalSolved = 0;
  totalPending = 0;
  totalOverDue = 0;
  loginUserRoleID = 0;
  departmentID = 0;
  loginUserID = 0;
  jcDepartmentID=0;
  pageID = 1;
  lstCrimeCategory = {};
  lstMonthData = [];
  // lstMonthlyComplain = [];
  @ViewChild("modalTrainingInfo") modalTrainingInfo: TemplateRef<any>;
  // hasOrganizationList: boolean;
  // hasTrainingCourseList: boolean;
  // hasTrainingScheduleList: boolean;
  // hasUserCreate: boolean;
  // hasTrainingCategory: boolean;
  // hasTrainingCenterCourseMap: boolean;
  // hasUserList: boolean;
  // hasSummaryReport: boolean;

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;


  constructor(
    private dashboardService: DashboardService,
    dateTimeAdapter: DateTimeAdapter<any>,
    public textFilterService: TextFilterService,
    private swal: SweetAlertService,
    private router: Router,
    private modalService: NgbModal

  ) {
    dateTimeAdapter.setLocale('en-IN');

    // this.chartOptions = {
    //   series: this.lstCatTotalComplain,
    //   // series: [10,20,50,60,70],
    //   chart: {
    //     width: "70%",
    //     type: "pie"
    //   },
    //   labels: this.lstCrimeCategory,
    //   // labels: ['A','B','C','D','E'],
    //   theme: {
    //     monochrome: {
    //       enabled: true
    //     }
    //   },
    //   title: {
    //     text: "Month Name",
    //     align: 'left',
    //     margin: 0,
    //     offsetX: 0,
    //     offsetY: 0,
    //     floating: false,
    //     style: {
    //       fontSize:  '14px',
    //       fontWeight:  'bold',
    //       color:  '#000'
    //     },
    //   },
    //   responsive: [
    //     {
    //       breakpoint: 480,
    //       options: {
    //         chart: {
    //           width: 200
    //         },
    //         legend: {
    //           position: "bottom"
    //         }
    //       }
    //     }
    //   ]
    // };

  }

  ngOnInit() {
    //  this.pieChartOption();
    this.loginUserRoleID = parseInt(localStorage.getItem("ROLE_ID"));
    this.loginUserID = parseInt(localStorage.getItem("USER_AUTO_ID"));
    this.departmentID = parseInt(localStorage.getItem("DEPARTMENT_ID"));
    // this.getAll();
    // this.getAllDashboardChart();

  }
  getAllDashboardChart() {

    this.queryObject.userID = this.loginUserID;
    this.queryObject.userRoleID = this.loginUserRoleID;
    this.queryObject.departmentID = this.departmentID;
    this.queryObject.crimeMainCategoryID = this.queryObject.crimeMainCategoryID
    this.queryObject.crimeSubCategoryID = this.queryObject.crimeSubCategoryID;
    this.queryObject.pageID = this.pageID;
    this.dashboardService.getAllDashboardChart(this.queryObject).subscribe(
      (res: Dashboard) => {
        if (res) {
          // this.lstDashboardChart =  [...res];
          this.lstDashboardChart = Object.assign(this.lstDashboardChart, res);
          this.lstDashboardChart = [...this.lstDashboardChart];

          this.lstDashboardChart.forEach((item, index) => {
            this.lstMonthData[index] = item;
          });
          // this.lstDashboardChart.forEach(element => {
          //   this.objChartData.name = element.name
          // });

         

        }
      }
    );
  }

  pieChartOption() {
    this.chartOptions = {
      // colors : ['#4d3a96', '#4576b5'],
      series: this.lstMonthData,
      // [

      //   {
      //     color:'#000',
      //     name: "বিকাশ/ নগদ/ রকেটসহ অন্যান্য এমএফএস সংক্রান্ত প্রতারণা",
      //     data: [44, 55, 41, 67, 22, 43, 44, 55, 41, 67, 22, 43]
      //   },
      //   {
      //     color: '#ff0000',
      //     name: "	অনলাইনে সন্ত্রাসবাদ/জঙ্গীবাদ",
      //     data: [13, 23, 20, 8, 13, 27, 44, 55, 41, 67, 22, 43]
      //   },
      //   {
      //     name: "	অনলাইনে সন্ত্রাসবাদ/জঙ্গীবাদ",
      //     data: [11, 17, 15, 15, 21, 14, 44, 55, 41, 67, 22, 43]
      //   },
      //   {
      //     name: "হানি ট্র্যাপ/ রোমান্স স্ক্যাম",
      //     data: [21, 7, 25, 13, 22, 8, 44, 55, 41, 67, 22, 43]
      //   }
      // ]

      chart: {
        type: "bar",
        height: 350,
        stacked: true,
        toolbar: {
          show: true
        },
        zoom: {
          enabled: true
        }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: "bottom",
              offsetX: -10,
              offsetY: 0
            }
          }
        }
      ],
      plotOptions: {
        bar: {
          horizontal: false,
          dataLabels: {
            total: {
              enabled: true,

            }
          }
        }
      },
      xaxis: {
        type: "category",
        categories: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "Jun",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ]
      },
      legend: {
        position: "right",
        offsetY: 40
      },
      fill: {
        opacity: 1
      }
    };



  }


  getAll() {

    this.queryObject.userID = this.loginUserID;
    this.queryObject.userRoleID = this.loginUserRoleID;
    this.queryObject.departmentID = this.departmentID;
    this.queryObject.crimeMainCategoryID = this.queryObject.crimeMainCategoryID
    this.queryObject.crimeSubCategoryID = this.queryObject.crimeSubCategoryID;
    this.queryObject.pageID = this.pageID;
    this.dashboardService.search(this.queryObject).subscribe(
      (res: Dashboard) => {
        if (res) {
          this.lstDashboard = Object.assign(this.lstDashboard, res);
          this.lstDashboard = [...this.lstDashboard];
          this.lstDashboard = this.lstDashboard;
          this.jcDepartmentID= this.departmentID;
          this.totalComplain = this.lstDashboard[0].totalComplain;
          this.totalInAction = this.lstDashboard[0].totalInAction;
          this.totalSolved = this.lstDashboard[0].totalResolved;
          this.totalPending = this.lstDashboard[0].totalPendingComplain;
          this.totalOverDue = this.lstDashboard[0].totalOverdue;
      
          // this.gridOptions.api.redrawRows();
          //alert(this.lstDashboard );

        }
      }
    );
  }
  calculateTotalComplaints(item: any): number {
    return item.newComplain + item.inAction + item.pendingComplain + item.resolved + item.overdue + item.unImportant + item.fake;
  }
  goToToalComplain() {
    
    RoutingHelper.navigate2([], ['complain', 'new-complain'], this.router);
  }

  // goToToalNewComplain(id) {
  //   if (id > 0) {
  //     let ComplainId = id
  //     RoutingHelper.navigate2([], ['complain', 'new-complain', ComplainId], this.router);
  //   }
  // }
  goToToalNewComplain(departmentID: number, complainStatusID: number) 
  {
    debugger;
    if (departmentID > 0) 
    {
      if(complainStatusID==1)
      {
        RoutingHelper.navigate3([], ['complain', 'new-complain'], this.router, {
          departmentID: departmentID,
          complainStatusID: complainStatusID
        });
      }
      else if(complainStatusID==2) //assigned
      {
        RoutingHelper.navigate4([], ['complain', 'assigned-complain'], this.router, {
          departmentID: departmentID,
          complainStatusID: complainStatusID
        });
      }
      else if(complainStatusID==3)
      {
        RoutingHelper.navigate3([], ['complain', 'assigned-complain'], this.router, {
          departmentID: departmentID,
          complainStatusID: complainStatusID
        });
      }

      else if(complainStatusID==4) // resolved
      {
        RoutingHelper.navigate4([], ['complain', 'resolved-complain'], this.router, {
          departmentID: departmentID,
          complainStatusID: complainStatusID
        });
      }
      else 
      {
        RoutingHelper.navigate3([], ['complain', 'new-complain'], this.router, {
          departmentID: departmentID,
          complainStatusID: complainStatusID
        });
      }
 
    }
  }

  goToToalPending() {
    RoutingHelper.navigate2([], ['complain', 'assigned-complain'], this.router);
  }
  goToToalComplete() {
    RoutingHelper.navigate2([], ['complain', 'resolved-complain'], this.router);
  }
  // getAdminDashboard(isCheck: boolean) {
  //   this.totalTrainingCenter = 0;
  //   this.totalSchedule = 0;
  //   this.totalReportSubmitted = 0;
  //   this.totalReportInitialized = 0;
  //   this.totalReportApproved = 0;
  //   this.totalIncident = 0;

  //   if (isCheck) {
  //     let fromDate = this.queryObject.fromDate;
  //     let toDate = this.queryObject.toDate;

  //     this.queryObject.fromDate = CommonHelper.getDateHelper(new Date(fromDate));
  //     this.queryObject.toDate = CommonHelper.getDateHelper(new Date(toDate));
  //   }

  // }
  // search() {
  //   this.getAdminDashboard(true);
  // }




}