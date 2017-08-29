import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from "@angular/router";

import * as d3 from "d3-selection";   //

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
    ) { }

    ngOnInit() {
        this.authService.getProfile().subscribe(profile => {
            this.user = profile.user;
        },
            err => {
                console.log(err);
                return false;
            });

        this.authService.getAllTeams().subscribe(teams => {
            // console.log(teams);
            this.teams = Object.keys(teams).map(key => teams[key]);
            // console.log(this.teams);

            var team = [];
            team = teams.teams;
            for (var i = 0; i < team.length; i++) {
                var dataset = [];
                dataset = [team[i].spAchieved, team[i].spEstimated];
                // console.log(dataset);

                var w = 100;
                var h = 100;
                var barPadding = 1;

                var svg = d3.select("#chart")
                    .append("svg")
                    .attr("width", w)
                    .attr("height", h);

                svg.selectAll("rect")
                    .data(dataset)
                    .enter()
                    .append("rect")
                    .attr("x", (d, i) => i * (w / dataset.length))
                    .attr("y", d => h - d)
                    .attr("width", w / dataset.length - barPadding)
                    .attr("height", d => d)
                    .attr("fill", (d) => "rgb(100, 0, " + (d * 5) + ")");

                svg.selectAll("text")
                    .data(dataset)
                    .enter()
                    .append("text")
                    .text(d => d)
                    .attr("x", (d, i) => i * (w / dataset.length) + 15)
                    .attr("y", d => h - (d * 4) + 45);
            };
        },
            err => {
                console.log(err);
                return false;
            });
    }
}