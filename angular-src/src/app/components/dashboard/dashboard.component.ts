import { Component, AfterViewInit, AfterContentInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

import * as d3 from "d3-selection";

import { Sprint } from './sprint';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit, AfterContentInit {
    user: Object;
    teams: any;
    teamId: any;
    sprintNumber: Number;
    spEstimated: Number;
    spAchieved: Number;
    // { teamName: String, sprint: Array<number>, completedAt: Date, completed: Boolean};
    sprint: { sprintNumber: Number, spEstimated: Number, spAchieved: Number }[];

    constructor(
        private flashMessage: FlashMessagesService,
        private authService: AuthService,
        private router: Router
    ) { }

    model = new Sprint(
        this.spEstimated,
        this.spAchieved,
        this.sprintNumber
    );

    submitted = true;

    openForm() {
        // let id = event.target || event.srcElement || event.currentTarget;
        // let id = target.attribute.id;
        // let value = id.nodeValue;
        this.submitted = false;
    }
    closeForm() { this.submitted = true; }

    onSubmit() {
        this.submitted = true;

        const sprint = {
            spEstimated: this.spEstimated,
            spAchieved: this.spAchieved,
            sprintNumber: this.sprintNumber
        };

        // const id = this.teams._id;

        // this.router.navigate(['./dashboard/' + id]);

        this.authService.getId();
        this.authService.addSprint(sprint).subscribe(data => {
            // let id = this.teams._id;
            if (data.success) {
                this.flashMessage.show('You add new team', { cssClass: 'alert-success', timeout: 3000 });
                this.router.navigate(['/dashboard']);
            } else {
                this.flashMessage.show('Something went wrong', { cssClass: 'alert-danger', timeout: 3000 });
            }
        })
    }

    ngAfterContentInit() {
        this.authService.getProfile().subscribe(profile => {
            this.user = profile.user;
        },
            err => {
                console.log(err);
                return false;
            });

        this.authService.getAllTeams().subscribe(teams => {
            this.teams = Object.keys(teams).map(key => teams[key]);
        },
            err => {
                console.log(err);
                return false;
            });

        // this.authService.getId().subscribe(team => {})    
        //    this.authService.addSprint(sprint).subscribe(sprint => {
        //        let team = this.teamId;
        //    });
    }

    ngAfterViewInit() {
        this.authService.getAllTeams().subscribe((teams: { teamName: String, sprint: Array<number>, completedAt: Date, completed: Boolean }) => {
            let team = [];
            team = this.teams[0];

            for (let i = 0; i < team.length; i++) {
                let sTeam = team[i];
                let dataset = [];

                for (let j = 0; j < team[i].sprint.length; j++) {
                    let sprint = [];
                    sprint = [team[i].sprint[i]];

                    dataset = [sTeam.sprint[j].spAchieved, sTeam.sprint[j].spEstimated];

                    if (sprint.length > 1)
                        i--;

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