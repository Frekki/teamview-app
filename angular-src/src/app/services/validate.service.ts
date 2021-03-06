import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }

  validateRegister(user){
    if(user.name == undefined || user.email == undefined || user.username == undefined || user.password == undefined){
      return false;
    } else {
      return true;
    }
  }

  validateNewTeam(team){
    if(team.teamName == undefined ||  team.completedAt == undefined || team.completed == undefined || team.spAchieved == undefined || team.spEstimated == undefined){
      return false;
    } else {
      return true;
    }
  }

  validateNewSprint(sprint){
    if(sprint.spAchieved == undefined || sprint.spEstimated == undefined || sprint.sprintNumber == undefined || sprint.spAchieved > sprint.spEstimated){
      return false;
    } else {
      return true;
    }
  }

  validateEmail(email){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
}
