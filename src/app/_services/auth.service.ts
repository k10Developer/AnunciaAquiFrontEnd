import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../_models/user';
import { Global } from '../Shared/Global';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) { 
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.currentUser = this.currentUserSubject.asObservable();
  } 

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
}

  login(model: any) {
    return this.http.post(Global.BASE_USER_ENDPOINT + "account/login", model)
      .pipe(
        map((response: any) => {
          const user = response;
          if (user) {
            localStorage.setItem('user',  JSON.stringify(user));      
            this.currentUserSubject.next(user);   
          }
        }
        )
      )
  }

  logedIn()
  {
    const user = localStorage.getItem('user');
    return !!user;
  }

  logout(){
    localStorage.removeItem('user');    
    this.currentUserSubject.next(null);
  }
  
}
