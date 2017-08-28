import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from "@angular/router";

import * as d3 from "d3-selection";   //
import * as d3Array from "d3-array";
import * as d3Axis from "d3-axis";
import * as d3Scale from "d3-scale";    //

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    user: Object;
    teams: any;
    //teamName: Object;

    private width: number;  //
    private height: number;
    private margin = { top: 20, right: 20, bottom: 30, left: 40 };

    private x: any;
    private y: any;
    private svg: any;
    private g: any;     //

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
            console.log(teams);
            this.teams = Object.keys(teams).map(key => teams[key]);
            console.log(this.teams[0][1].spAchieved);
            console.log(this.teams);

            var dataset = [this.teams[0][0].spAchieved, this.teams[0][0].spEstimated];
            var w = 100;
            var h = 100;
            var barPadding = 1;

            console.log(dataset[1]);

            var svg = d3.select("body")
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

            // const dataArray = [this.teams.spAchieved, this.teams.spEstimated];

            // const widthScale = d3Scale.scaleLinear()
            //     .domain([0, 100])
            //     .range([0, 500]);

            // // const color = d3Scale.scaleLinear()
            // //     .domain([0, teams.spAchieved])
            // //     .range();

            // const axis = d3Axis.axisBottom(widthScale)
            //     .ticks(5);

            // const canvas = d3.select("li")
            //     .append("svg")
            //     .attr("width", 500)
            //     .attr("height", 500)
            //     .append("g")
            //     .attr("transform", "translate(20, 0)");

            // console.log(dataArray);
            // console.log(this.teams.spAchieved);

            // const bars = canvas.selectAll("rect")
            //     .data(dataArray)
            //     .enter()
            //     .append("rect")
            //     .attr("width", d => widthScale(d))
            //     .attr("height", 50)
            //     // .attr("fill", d => color(d))
            //     .attr("y", (d, i) => i * 100);

            // canvas.append("g")
            //     .attr("transform", "translate(0, 400)")
            //     .call(axis);

            // console.log("I'm alive!");

            // const initSvg = () => {     //
            //     this.svg = d3.select("svg");
            //     this.width = +this.svg.attr("width") - this.margin.left - this.margin.right;
            //     this.height = +this.svg.attr("height") - this.margin.top - this.margin.bottom;
            //     this.g = this.svg.append("g")
            //         .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
            // };

            // const initAxis = () => {
            //     this.x = d3Scale.scaleBand().rangeRound([0, this.width]).padding(0.1);
            //     this.y = d3Scale.scaleLinear().rangeRound([this.height, 0]);
            //     this.x.domain(teams.map((d) => d.spAchieved));
            //     this.y.domain([0, teams.spEstimated]);
            // };

            // const drawAxis = () => {
            //     this.g.append("g")
            //         .attr("class", "axis axis--x")
            //         .attr("transform", "translate(0," + this.height + ")")
            //         .call(d3Axis.axisBottom(this.x));
            //     this.g.append("g")
            //         .attr("class", "axis--y")
            //         .call(d3Axis.axisLeft(this.y).ticks(10, " tasks"))
            //         .append("text")
            //         .attr("class", "axis-title")
            //         .attr("transform", "rotate(-90)")
            //         .attr("y", 6)
            //         .attr("dy", "0.71em")
            //         .attr("text-anchor", "end")
            //         .text("Achieved");
            // };

            // const drawBars = () => {
            //     this.g.selectAll(".bar")
            //         .data(this.teams)
            //         .enter().append("rect")
            //         .attr("class", "bar")
            //         .attr("x", d => this.x(d.teams.spAchieved))
            //         .attr("y", d => this.y(d.teams.spEstimated))
            //         .attr("width", this.x.bandwidth())
            //         .attr("height", d => this.height - this.y(d.spEstimated));
            // };

            // initSvg()
            // initAxis();
            // drawAxis();
            // drawBars();     //
        },
            err => {
                console.log(err);
                return false;
            });
    }
}