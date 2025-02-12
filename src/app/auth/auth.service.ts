import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthResponse, LoginRequest, RegisterRequest } from '../models/auth.models';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
   private apiurl='http://localhost:8080/api/auth'; 
   private currentUserSubject:BehaviorSubject<AuthResponse|null>;

  constructor(private http:HttpClient) {
      this.currentUserSubject = new BehaviorSubject<AuthResponse | null>(
      this.getUserFromStorage()
    );
  }

  private getUserFromStorage(): AuthResponse | null {
    const token = localStorage.getItem('user');
    return token ? JSON.parse(token) : null;
  }
  
  public get currentUser():AuthResponse|null{
    return this.currentUserSubject.value;
  }
  
  public get isloggedin():boolean{
        return !!this.currentUser;
  }

  public gettoken():string|null{
     return this.currentUser?this.currentUser.token:null;
  }
  login(credentials:LoginRequest):Observable<AuthResponse>{
    return this.http.post<AuthResponse>(`${this.apiurl}/signin`,credentials)
    .pipe(map(response=>{
      localStorage.setItem('user',JSON.stringify(response));
      this.currentUserSubject.next(response);
      return response;
    }));
  }

  register(user:RegisterRequest):Observable<any>{
   return this.http.post(`${this.apiurl}/signup`,user);
  }

  logout():void{
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
  }
  
}
