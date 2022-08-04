import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class TokenManagerService {
  public store(content: Object) {
    if (content == null) {
      localStorage.setItem('currentUser', JSON.stringify(null));
    } else {
      localStorage.setItem('currentUser', JSON.stringify(content));
    }
  }
  public remove(){
    localStorage.removeItem('currentUser');
  }
  public retrieveToken(): string {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser == null) return 'empty';
    var token = currentUser.token;
    return token.toString();
  }
  public isAdmin(): boolean {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser == null) return false;
    var role = currentUser.userRole;
    if (role == 'Administrator') {
      return true;
    }
    return false;
  }

  public retrieveUserId(): number {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser == null) return 0;
    var id = currentUser.id;
    return id;
  }
  public retrieveUserName(): string {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser == null) return 'empty';
    var userName = currentUser.firstname + ' ' + currentUser.lastname;
    return userName.toString();
  }
  public retrieveUserRoleName(): string {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser == null) return '';
    var role = currentUser.userRole;
    return role;
  }

  isLogin: boolean =
    JSON.parse(localStorage.getItem('currentUser')) == null ? false : true;
}
