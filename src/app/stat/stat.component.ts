import {Component, OnInit} from '@angular/core';
import {UserService} from '../shared/services/user.service';

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.css']
})
export class StatComponent implements OnInit {

  userNumbers: any;

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartLabels = [''];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData: any = [
    {
      data: [],
      label: ''
    },
    {
      data: [44],
      label: 'CRM'
    },
    {
      data: [21],
      label: 'Besoins'
    },
    {
      data: [8],
      label: 'Projets'
    }
  ];

  constructor(private userService: UserService) {

  }

  ngOnInit() {
    this.userService.usersCount().subscribe(res => {
      console.log(res);
      this.userNumbers = res;
      this.barChartData.push({ data: this.userNumbers, label: '' });
      console.log(':::::' + this.userNumbers);
    });
  }

}


