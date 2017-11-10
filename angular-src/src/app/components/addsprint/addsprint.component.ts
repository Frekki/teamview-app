import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service'
import { AuthService } from '../../services/auth.service'
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addsprint',
  templateUrl: './addsprint.component.html',
  styleUrls: ['./addsprint.component.css']
})
export class AddsprintComponent implements OnInit {
  teamName: String;
  sprint: any;
  sprintNumber: Number;
  spAchieved: Number;
  spEstimated: Number;

  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onAddingSubmit() {
    const team = {
      teamName: this.teamName,
      spAchieved: this.spAchieved,
      spEstimated: this.spEstimated
    }

    // Required Fields
    if (!this.validateService.validateNewSprint(team)) {
      this.flashMessage.show('Please fill in all fields', { cssClass: 'alert-danger', timeout: 3000 });
      return false
    }
  }

}
