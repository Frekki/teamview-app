import { Component, AfterViewInit, AfterContentInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from "@angular/router";

import * as d3 from "d3-selection";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit, AfterContentInit {
    user: Object;
    teams: any;
    // { teamName: String, sprint: Array<number>, completedAt: Date, completed: Boolean};
    sprint: { sprintNumber: Number, spEstimated: Number, spAchieved: Number }[];

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    ngAfterContentInit() {
        this.authService.getProfile().subscribe(profile => {
            this.user = profile.user;
        },
            err => {
                console.log(err);
                return false;
            });

        this.authService.getAllTeams().subscribe(teams => {
            // console.log(teams);
            // for(let i = 0; teams.length >= i; i++){
            //     this.teams = teams[i];
            // }
            this.teams = Object.keys(teams).map(key => teams[key]);
            // console.log(this.teams);
        },
            err => {
                console.log(err);
                return false;
            });
    }

    ngAfterViewInit() {
        this.authService.getAllTeams().subscribe((teams: { xxxx: Number, spEstimated: Number, spAchieved: Number }) => {
            // console.log(this.teams[0][4]);
            let team = [];
            team = this.teams[0];

            let sprint = [];
            sprint = this.teams[0][0].sprint[0];

            for (let i = 0; i < team.length; i++) {
                let dataset = [];
                // console.log(team.length);

                for (let j = 0; j < team.length; j++) {
                    dataset = [team[i].sprint[j].spAchieved, team[i].sprint[j].spEstimated];
                    console.log(dataset);

                    const w = 100;
                    const h = 100;
                    const barPadding = 1;

                    const svg = d3.select("#chart .list-element:nth-child(" + (i + 1) + ") .graph")
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
                        .attr("y", d => h - d);
                }
            }
        },
            err => {
                console.log(err);
                return false;
            });
    }
}