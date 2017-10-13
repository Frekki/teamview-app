import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from "angular2-jwt";

@Injectable()
export class AuthService {
  authToken: any;
  teamId: any;
  user: any;
  team: any;
  sprint: any;

  constructor(private http: Http) { }

  // User
  registerUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/register' || 'users/register', user, { headers: headers })
      .map(res => res.json());
  }

  authenticateUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/authenticate' || 'users/authenticate', user, { headers: headers })
      .map(res => res.json());
  }

  getProfile() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/users/profile' || 'users/profile', { headers: headers })
      .map(res => res.json());
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn() {
    return tokenNotExpired('id_token');
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  // Teams
  addTeam(team) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/teams/addteam' || 'teams/addteam', team, { headers: headers })
      .map(res => res.json());
  }

  loadTeam() {
    const teams = localStorage.getItem('team');
    this.team = teams;
  }

  getAllTeams() {
    let headers = new Headers();
    this.loadToken();
    this.loadTeam();
    headers.append('Authorization', this.authToken);
    headers.append('Teams', this.team);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/teams/dashboard' || 'teams/dashboard', { headers: headers })
      .map((res) => res.json());
  }

  //Sprints
  getId() {
    const id = localStorage.setItem('teamId', this.teamId);
    this.teamId = id;
  }

  addSprint(sprint) {
    let headers = new Headers();
    // headers.append('id', this.teamId);
    // headers.append('Content-Type', 'application/json');
    return this.http.put('http://localhost:3000/teams/dashboard/:id' || 'teams/dashboard/:id', sprint, { headers: headers })
      .map((res) => res.json());
  }
}
