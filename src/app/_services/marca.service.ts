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
        const newUrl = `${url}/${id}`;         
        return this.http.delete(newUrl);       
    }
    getById(url: string,id:number): Observable<any> {           
        const newUrl = `${url}/${id}`;         
        return this.http.get<any>(newUrl);    
    }
    getTodos(url: string): Observable<any> {                     
       return this.http.get<any>(url)        
   }
}