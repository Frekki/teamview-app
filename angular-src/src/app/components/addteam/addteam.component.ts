import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
    selector: 'app-addteam',
    templateUrl: './addteam.component.html',
    styleUrls: ['./addteam.component.css']
})
export class AddteamComponent implements OnInit {
    teamName: String;
    // sprint: { sprintNumber: Number, spEstimated: Number, spAchieved: Number }[];
    sprintNumber: Number; 
    spEstimated: Number; 
    spAchieved: Number;
    completedAt: Number;
    completed: Boolean;
    // _creator: Object;

    constructor(
        private validateService: ValidateService,
        private flashMessage: FlashMessagesService,
        private authService: AuthService,
        private router: Router
    ) { }

    ngOnInit() {
    }

    onCreatingSubmit() {
        const team = {
            teamName: this.teamName,
            completedAt: this.completedAt,
            completed: this.completed,
            sprintNumber: this.sprintNumber,
            spEstimated: this.spEstimated,
            spAchieved: this.spAchieved
        }

        // Required Fields
        if (!this.validateService.validateNewTeam(team)) {
            this.flashMessage.show('Please fill in all fields', { cssClass: 'alert-danger', timeout: 3000 });
            return false;
        }

        // Register team
        this.authService.addTeam(team).subscribe(data => {
            if (data.success) {
                this.flashMessage.show('You add new team', { cssClass: 'alert-success', timeout: 3000 });
                this.router.navigate(['/dashboard']);
            } else {
                this.flashMessage.show('Something went wrong', { cssClass: 'alert-danger', timeout: 3000 });
                this.router.navigate(['/addteam']);
            }
        })
    }

}
