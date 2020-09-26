import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Marca } from '../_models/marca';

@Injectable({
    providedIn: 'root'
})
export class MarcaService {   
    
    // baseUrl = config.baseUrl;
    constructor(private http: HttpClient){}

    create(url: string , marca: Marca):Observable<any>{       
       return this.http.post(url, marca)       
    }
    update(url: string , marca: Marca):Observable<any>{            
        return this.http.put(url, marca)        
    }
    delete(url: string, id: string):Observable<any>{
        let httpOptions = {headers: {'Content-Type':'application/json'}, body:{id:id}}        
        return this.http.delete(url, httpOptions)       
    }
    getById(url: string,id:string): Observable<any> {           
         let params = new HttpParams();
         params = params.append('id' ,id);           
        return this.http.get<any>(url,{ params })        
    }
    getTodos(url: string): Observable<any> {                     
       return this.http.get<any>(url)        
   }
}