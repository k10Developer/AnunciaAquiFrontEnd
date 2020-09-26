import { config } from './../_config/config';
import { User } from './../_models/user';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Global } from '../Shared/Global';
import { Observable, throwError } from 'rxjs';
import { CompanySummaryInformation } from '../_models/companySummaryInformation';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UserService {   
    
    // baseUrl = config.baseUrl;
    constructor(private http: HttpClient){}

    createUser(url: string , user: User):Observable<any>{       
       return this.http.post(url, user)       
    }
    updateUser(url: string , user: User):Observable<any>{            
        return this.http.put(url, user)        
    }
    deleteUser(url: string, id: string):Observable<any>{
        let httpOptions = {headers: {'Content-Type':'application/json'}, body:{id:id}}        
        return this.http.delete(url, httpOptions)       
    }
    getUser(url: string): Observable<any> {           
         var userLogado:any = Global.GetCurrentUser();   
         let params = new HttpParams();
         params = params.append('id' ,userLogado.user.id);           
        return this.http.get<any>(url,{ params })        
    }
    getCompanyByUserId(url: string, id: string): Observable<CompanySummaryInformation[]>{
        let params = new HttpParams();
        params = params.append('id' ,id);
        return this.http.get<CompanySummaryInformation[]>(url,{ params })        
    }    
    
}