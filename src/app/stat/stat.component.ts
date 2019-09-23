import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../shared/services/user.service';
import { BaseChartDirective } from 'ng2-charts';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.css']
})
export class StatComponent implements OnInit {
  @ViewChild(BaseChartDirective)
  public chart: BaseChartDirective;

  userNumbers: any;

  public barChartLabels = [''];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartOptions: ChartOptions =  {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };

  public barChartData: any = [];

  constructor(private userService: UserService) {

  }

  ngOnInit() {
    this.userService.usersCount().subscribe(res => {
      this.barChartData = [
        {
          data: [7],
          label: 'CRM'
        },
        {
          data: [8],
          label: 'Besoins'
        },
        {
          data: [5],
          label: 'Projets'
        }
      ]
      let userNumbers = res;
      this.barChartData.push({ data: [userNumbers], label: 'utilisateurs' });
      console.log(this.barChartOptions)
      this.chart.chart.update();
    });
  }

}


