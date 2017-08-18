import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    user: Object;
    teams: any;
    //teamName: Object;

    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    ngOnInit() {
        this.authService.getProfile().subscribe(profile => {
            this.user = profile.user;
        },
        err => {
            console.log(err);
            return false;
        });

        this.authService.getAllTeams().subscribe(teams => {
            // for(let i = 0; i < teams.length; i++){
            //     this.teams.push(JSON.stringify(teams));
            // }
            console.log(teams);
            this.teams = Object.keys(teams).map(key => teams[key]);
            console.log(this.teams);
        },
        err => {
            console.log(err);
            return false;
        });
    }
}