import { Component, AfterViewInit, AfterContentInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

import * as d3 from "d3-selection";
// import { scaleLinear } from "d3-scale";


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
        private validateService: ValidateService,
        private flashMessage: FlashMessagesService,
        private authService: AuthService,
        private router: Router
    ) { }


    submitted = true;

    openForm(team: any) {
        this.teamId = <string>team._id;
        team.showForm = true;
        this.submitted = false;
    }

    closeForm(team: any) {
        team.showForm = false;
        this.submitted = true;
    }

    onSubmit() {
        this.submitted = true;

        const sprint = {
            spEstimated: this.spEstimated,
            spAchieved: this.spAchieved,
            sprintNumber: this.sprintNumber
        };

        if (!this.validateService.validateNewSprint(sprint)) {
            this.flashMessage.show('Please fill in all fields', { cssClass: 'alert-danger', timeout: 3000 });
            return false;
        }

        this.authService.addSprint(this.teamId, sprint).subscribe(data => {
            if (data) {
                this.flashMessage.show('You add new sprint', { cssClass: 'alert-success', timeout: 3000 });
                location.reload();
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
            // this.sprintNumber = this.teams.sprint.sprintNumber;
        },
            err => {
                console.log(err);
                return false;
            });
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

                    let sprintsNumbers = [];
                    sprintsNumbers = [sTeam.sprint[j].sprintNumber];
                    // this.sprintNumber = sprintsNumbers;
                    console.log(sprintsNumbers);

                    dataset = [sTeam.sprint[j].spEstimated, sTeam.sprint[j].spAchieved];
                    dataset.sort();

                    if (sprint.length > 1)
                        i--;

                    const w = 100;
                    const h = 100;
                    const barPadding = 1;

                    // const x = d3.scaleLinear()
                    //     .rangeRound([0, w]);

                    // const y = d3.scaleLinear()
                    //     .rangeRound([0, h]);

                    const svg = d3.select("#chart .list-element:nth-child(" + (i + 1) + ") .graph")
                        .append("svg")
                        .attr("width", w)
                        .attr("height", h);

                    // svg.append("svg")
                    //     .attr("class", "axis axis--s")
                    //     .attr("transform", "translate(0," + h + ")")
                    //     .call(d3.axisBottom(x));

                        // svg.append("svg")
                        // .attr("class", "axis axis--s")
                        // .attr("transform", "translate(0," + w + ")")
                        // .call(d3.axisBottom(y));


                    svg.selectAll("rect")
                        .data(dataset)
                        .enter()
                        .append("rect")
                        .attr("x", (d, i) => i * (w / dataset.length))
                        .attr("y", d => h - d)
                        .attr("width", w / dataset.length - barPadding)
                        .attr("height", d => d)
                        .attr("fill", (d) => "rgb(100, 0, " + (d * 4) + ")");

                    svg.selectAll("text.value")
                        .data(dataset)
                        .enter()
                        .append("text")
                        .text(d => d)
                        .attr("x", (d, i) => i * (w / dataset.length) + 15)
                        .attr("y", d => h - d);

                    svg.selectAll("text.title")
                        .data(sprintsNumbers)
                        .enter()
                        .append("text")
                        .text(d => d)
                        .style("font-size", "34px")
                        .style("color", "black")
                        .attr("x", (d, i) => i * (w / dataset.length) + 40)
                        .attr("y", 90);
                }
            }
        },
            err => {
                console.log(err);
                return false;
            });
    }
}