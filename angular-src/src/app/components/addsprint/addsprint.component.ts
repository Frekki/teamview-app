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
      sprintNumber: this.sprintNumber,
      spAchieved: this.spAchieved,
      spEstimated: this.spEstimated
    }

    // Required Fields
    if (!this.validateService.validateNewSprint(team)) {
      this.flashMessage.show('Please fill in all fields', { cssClass: 'alert-danger', timeout: 3000 });
      return false
    }

    // Register sprint
    this.authService.addSprint(team).subscribe(data => {
      if (data.success) {
        this.flashMessage.show('You add new team', { cssClass: 'alert-success', timeout: 3000 });
        this.router.navigate(['/dashboard']);
      } else {
        this.flashMessage.show('Something went wrong', { cssClass: 'alert-danger', timeout: 3000 });
        this.router.navigate(['/addsprint']);
      }
    })
  }

}
