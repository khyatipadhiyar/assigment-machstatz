import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { User } from '@app/_models';

import { UserService, AuthenticationService } from '@app/_services';
import{HttpClient} from '@angular/common/http';

import { WeatherService } from '../weather.service';
import { Chart } from 'chart.js';


@Component({ templateUrl: 'home.component.html' })

export class HomeComponent implements OnInit, OnDestroy {
    currentUser: User;
    currentUserSubscription: Subscription;
    users: User[] = [];

    chart = []; // This will hold our chart info
    charts = []; // This will hold our chart info
    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private obj:HttpClient,
        private _weather: WeatherService
        
    ) {
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
        });
    }

ngOnInit() {
  this.loadAllUsers();
  this.fetmyitem();
  this.fetmyitem1()


      
        this._weather.dailyForecast().subscribe(res => {
        console.log(res);
            
          let temp_machine_1 = res['temp_machine_1'];
          let temp_machine_2 = res['temp_machine_2'];
          let date = res['date'];
          console.log(date);
         
        
this.chart = new Chart('canvas', {
  type: 'line',
  data: {
    //labels: weatherDates,
    labels : date,
    datasets:[{ 
                label: "temp_machine_1",
                data: temp_machine_1 ,
                borderColor: "#3cba9f",
                fill: false
              },
              { 
                label: "temp_machine_2",
                data: temp_machine_2,
                borderColor: "#ffcc00",
                fill: false
              },
            ]
        },
  options: {
    title: {
      display: true,
      text: 'TEMPERATURE CHART'
  },
    legend: {
      display: true,
      
      },
    scales: {
      xAxes:[{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'DATE',
            fontSize: 15
            
          }

          }],
      yAxes:[{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'TEMPERATURE',
            fontSize: 15
          }
      }],
    }
  }
});
})


// second chart

        this._weather.dailyForecast1().subscribe(res => {
            console.log(res);
            
            let pressure_machine_1 = res['pressure_machine_1'];
            let pressure_machine_2 = res['pressure_machine_2'];
            let date = res['date'];
    
this.charts = new Chart('canvass', {
  type: 'line',
  data: {
    //labels: weatherDates,
    labels : date,
    datasets: [
      { 
        label: "pressure_machine_1",
        data: pressure_machine_1 ,
        borderColor: "#3cba9f",
        fill: false
      },
      { 
        label: "pressure_machine_2",
       data: pressure_machine_2,
        borderColor: "#ffcc00",
        fill: false
      },
    ]
  },
  options: {
    title: {
      display: true,
      text: 'PRESSURE CHART'
  },
    legend: {
      display: true
    },
    scales: {
      xAxes: [{
        scaleLabel: {
        display: true,
        labelString: 'DATE',
        fontSize: 15
        }
      }],
      yAxes: [{
        scaleLabel: {
        display: true,
        labelString: 'PRESSURE',
        fontSize: 15
        }
      }],
    }
  }
});
 })
}

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.currentUserSubscription.unsubscribe();
    }

    deleteUser(id: number) {
        this.userService.delete(id).pipe(first()).subscribe(() => {
            this.loadAllUsers()
        });
    }

    private loadAllUsers() {
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.users = users;
        });
    }

  
    itemlist:any[];
    totalitem:string="please wait processing...";
    fetmyitem()
    {
      var url="https://gitlab.com/snippets/1872663/raw";
      this.obj.get(url).subscribe(
        response=>{
          this.itemlist=response as string[];
        
        });
    }

    itemlist1:any[];
    
    fetmyitem1()
    {
      var url="https://gitlab.com/snippets/1872664/raw";
      this.obj.get(url).subscribe(
        response=>{
          this.itemlist1=response as string[];
        
        });
    }

}



    

