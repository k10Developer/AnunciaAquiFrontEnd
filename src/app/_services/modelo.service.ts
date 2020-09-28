import { HttpClient, HttpParams } from '@angular/common/http';
import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Modelo } from '../_models/modelo';

@Injectable({
    providedIn: 'root'
})
export class ModeloService {   
    
    // baseUrl = config.baseUrl;
    constructor(private http: HttpClient){}

    create(url: string , modelo: Modelo):Observable<any>{       
       return this.http.post(url, modelo)       
    }
    update(url: string , modelo: Modelo):Observable<any>{            
        return this.http.put(url, modelo)        
    }
    delete(url: string, id: string):Observable<any>{
        const newUrl = `${url}/${id}`;      
        return this.http.delete(newUrl);    
    }
    getById(url: string,id:string): Observable<any> {           
        const newUrl = `${url}/${id}`;        
        return this.http.get<any>(newUrl);      
    }
    getTodos(url: string): Observable<any> {                     
       return this.http.get<any>(url)        
   }
   getByMarcaId(url: string,id:string): Observable<any> {          
     const newUrl = `${url}/${id}`;
    return this.http.get<any>(newUrl);    
    }
}