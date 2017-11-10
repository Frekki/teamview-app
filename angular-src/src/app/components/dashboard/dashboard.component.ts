import { Component, AfterViewInit, AfterContentInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

import * as d3selection from "d3-selection";
import * as d3scale from "d3-scale";
import * as d3axis from "d3-axis";
import * as d3array from "d3-array"


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
    sprint: { sprintNumber: Number, spEstimated: Number, spAchieved: Number }[];

    constructor(
        private validateService: ValidateService,
        private flashMessage: FlashMessagesService,
        private authService: AuthService,
        private router: Router
    ) { }


    submitted = true;
    private flag: boolean = true;

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
            this.sprint = this.teams.sprint;
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

                    dataset = [sTeam.sprint[j].spEstimated, sTeam.sprint[j].spAchieved];

                    if (sprint.length > 1)
                        i--;

                    const width = dataset.length * 60;
                    const height = 150;
                    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
                    const barPadding = 1;



                    const x = d3scale.scaleLinear()
                        .domain([(d3array.min(sprintsNumbers)), (d3array.max(sprintsNumbers))])
                        .rangeRound([(d3array.min(sprintsNumbers)), (d3array.max(sprintsNumbers))]);

                    const svg = d3selection.select("#chart .list-element:nth-child(" + (i + 1) + ") .graph")
                        .append("svg")
                        .attr("width", width)
                        .attr("height", height);

                    svg.selectAll("rect")
                        .data(dataset)
                        .enter()
                        .append("rect")
                        .attr("x", (d, i) => i * (width / dataset.length) - 35)
                        .attr("y", d => height - d - 25)
                        .attr("width", width / dataset.length - barPadding)
                        .attr("height", d => d + 15)
                        .attr("transform", "translate(" + (margin.left + 5) + "," + (margin.top - 35) + ")")
                        .style('fill', () => {
                            if (this.flag) {
                                this.flag = !this.flag;
                                return "rgb(0, 128, 192)";
                            } else {
                                this.flag = !this.flag;
                                return "rgb(255, 128, 0)";
                            }
                        });

                    svg.append("svg")
                        .style("font-size", "18px")
                        .attr("x", width / 2 + 5)
                        .attr("y", height - 22)
                        .call(d3axis.axisBottom(x));

                    svg.selectAll("text.value")
                        .data(dataset)
                        .enter()
                        .append("text")
                        .text((d, i) => dataset[i] == dataset[0] ? d + "E" : d + "A")
                        .attr("x", (d, i) => i * (width / dataset.length) + 25)
                        .attr("y", d => height - d - 26);
                }
            }
        },
            err => {
                console.log(err);
                return false;
            });
    }
}