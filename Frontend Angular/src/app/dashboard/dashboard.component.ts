import { Component, AfterViewInit } from '@angular/core';
import { GlobalConstants } from '../shared/global-constants';
import { SnackbarService } from '../services/snackbar.service';
import { StudentService } from '../services/student.service';
import { Chart } from 'chart.js';
import { EventService } from '../services/event.service';
import { ToolService } from '../services/tool.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements AfterViewInit {
  responseMessage: any;
  data: any;
  eventData: any;
  toolData: any;
  chartType: string = 'pie';
  chartData: number[] = [0, 0, 0, 0, 0];
  chartLabels: string[] = [
    'Students',
    'Teachers',
    'Publications',
    'Events',
    'Tools',
  ];
  chart: any = [];

  ngAfterViewInit() {
    this.updateChart();
  }

  constructor(
    private studentService: StudentService,
    private eventService: EventService,
    private toolService: ToolService,
    private snackbarService: SnackbarService
  ) {
    this.dashboardData();
  }
  dashboardData() {
    this.studentService.getDetails().subscribe(
      (response: any) => {
        this.data = response;
        this.updateChartData();
        console.log(this.data);
      },
      (error: any) => {
        console.log(error);
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = GlobalConstants.genericError;
        }
        this.snackbarService.openSnackBar(
          this.responseMessage,
          GlobalConstants.error
        );
      }
    );
    this.eventService.getEvents().subscribe(
      (response: any) => {
        this.eventData = response.length;
        this.updateChartData();
      },
      (error: any) => {
        console.log(error);
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = GlobalConstants.genericError;
        }
        this.snackbarService.openSnackBar(
          this.responseMessage,
          GlobalConstants.error
        );
      }
    );
    this.toolService.getTools().subscribe(
      (response: any) => {
        this.toolData = response.length;
        this.updateChartData();
      },
      (error: any) => {
        console.log(error);
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = GlobalConstants.genericError;
        }
        this.snackbarService.openSnackBar(
          this.responseMessage,
          GlobalConstants.error
        );
      }
    );
  }
  updateChartData() {
    this.chartData = [
      this.data.Students,
      this.data.Teachers,
      5,
      this.eventData,
      this.toolData,
    ];

    this.updateChart();
  }
  updateChart() {
    this.chart = new Chart('canvas', {
      type: this.chartType,
      data: {
        labels: this.chartLabels,
        datasets: [
          {
            data: this.chartData,
            backgroundColor: [
              '#3e95cd',
              '#8e5ea2',
              '#3cba9f',
              '#ffcc00',
              '#ff6600',
            ],
            borderWidth: 1,
          },
        ],
      },
    });
  }
}
